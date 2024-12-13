const Review = require('../models/review');
const Book = require('../models/book');

// Add a new review or update an existing one
const addOrUpdateReview = async (req, res) => {
    try {
        const { bookId, userId, rating, review } = req.body;

        const book = await Book.findOne({ image: { $regex: bookId } });

        let existingReview = await Review.findOne({ bookId, userId });

        if (existingReview) {
            existingReview.rating = rating;
            existingReview.review = review;
            await existingReview.save();
        } else {
            const newReview = new Review({ bookId, userId, rating, review });
            await newReview.save();
        }

        const reviews = await Review.find({ bookId });
        const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        
        res.status(200).json({ message: 'Review added/updated successfully', bookId, rating, review, averageRating });
    } catch(error) {
        console.error('Error adding/updating review:', error);
        res.status(500).json({ error: 'Failed to add or update review' });
    }
};

// Get all reviews for a book
const getReviewsForBook = async (req, res) => {
    try {
        const { bookId } = req.query;

        if (!bookId) {
            return res.status(400).json({ error: 'Book ID is required' });
        }

        const reviews = await Review.find({ bookId });

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this book' });
        }

        res.status(200).json({ reviews });
    } catch (error) {
        console.error('Error fetch reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};

// Delete a review by the user
const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const deletedReview = await Review.findByIdAndDelete(reviewId);

        if(!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        const { bookId } = deletedReview;

        const book = await Book.findOne({ image: { $regex: bookId } });

        const reviews = await Review.find({ bookId });

        const averageRating = reviews.length === 0
            ? 0
            : reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

        res.status(200).json({ message: 'Review deleted successfully', averageRating });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ error: 'Failed to delete review' });
        }
};

module.exports = {
    addOrUpdateReview,
    getReviewsForBook,
    deleteReview,
};

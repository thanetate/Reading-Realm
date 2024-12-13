const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    bookId: { type: String, required: true }, // Google Books API Book ID
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who posted the review
    rating: { type: Number, required: true, min: 1, max: 5 }, // Rating (1-5)
    review: { type: String, required: true }, // Review comment
});

module.exports = mongoose.model('review', reviewSchema); // Export as lowercase 'review'
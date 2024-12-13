const express = require('express');
const router = express.Router();
const cors = require('cors');

// Import from controller
const {
    addOrUpdateReview,
    getReviewsForBook,
    deleteReview,
} = require('../controllers/reviewController');

// Middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    })
);

// Routes for reviews
router.post('/add-or-update', addOrUpdateReview); // Add or update a review
router.get('/get-reviews', getReviewsForBook); // Get reviews for a book
router.delete('/delete/:reviewId', deleteReview); // Delete a review

module.exports = router;
const express = require('express');
const router = express.Router();
const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

// Route to create a new review
router.post('/reviews', createReview);

// Route to get all reviews
router.get('/reviews', getAllReviews);

// Route to get a single review by ID
router.get('/reviews/:id', getReviewById);

// Route to update a review by ID
router.put('/reviews/:id', updateReview);

// Route to delete a review by ID
router.delete('/reviews/:id', deleteReview);

module.exports = router;

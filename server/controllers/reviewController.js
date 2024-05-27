const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new review
const createReview = async (req, res) => {
  const { moderatorId, participationId, status, comment } = req.body;
  try {
    const review = await prisma.review.create({
      data: {
        moderator: { connect: { id: parseInt(moderatorId, 10) } },
        participation: { connect: { id: parseInt(participationId, 10) } },
        status,
        comment,
      },
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review' });
  }
};

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

// Get a single review by ID
const getReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await prisma.review.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch review' });
  }
};

// Update a review by ID
const updateReview = async (req, res) => {
  const { id } = req.params;
  const { status, comment } = req.body;
  try {
    const review = await prisma.review.update({
      where: { id: parseInt(id, 10) },
      data: {
        status,
        comment,
      },
    });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update review' });
  }
};

// Delete a review by ID
const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.review.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};

const express = require('express');
const router = express.Router();
const {
  createParticipation,
  getAllParticipations,
  getParticipationById,
  updateParticipation,
  deleteParticipation,
} = require('../controllers/participationController');

// Route to create a new participation
router.post('/participations', createParticipation);

// Route to get all participations
router.get('/participations', getAllParticipations);

// Route to get a single participation by ID
router.get('/participations/:id', getParticipationById);

// Route to update a participation by ID
router.put('/participations/:id', updateParticipation);

// Route to delete a participation by ID
router.delete('/participations/:id', deleteParticipation);

module.exports = router;

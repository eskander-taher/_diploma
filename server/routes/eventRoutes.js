const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Create a new event
router.post('/events', eventController.createEvent);

// Get all events
router.get('/events', eventController.getAllEvents);

// // Get a single event by id
// router.get('/events/:id', eventController.getEventById);

// // Update an event by id
// router.put('/events/:id', eventController.updateEventById);

// // Delete an event by id
// router.delete('/events/:id', eventController.deleteEventById);

module.exports = router;

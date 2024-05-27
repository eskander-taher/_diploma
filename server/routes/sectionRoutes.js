const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');

// Create a new section
router.post('/sections', sectionController.createSection);

// Get all sections
router.get('/sections', sectionController.getAllSections);

// Get a single section by id
router.get('/sections/:id', sectionController.getSectionById);

// Update a section by id
router.put('/sections/:id', sectionController.updateSection);

// Delete a section by id
router.delete('/sections/:id', sectionController.deleteSection);

module.exports = router;

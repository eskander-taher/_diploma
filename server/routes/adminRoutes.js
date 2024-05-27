const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Create a new admin
router.post('/admins', adminController.createAdmin);

// Get all admins
router.get('/admins', adminController.getAllAdmins);

// Get a single admin by id
router.get('/admins/:id', adminController.getAdminById);

// Update an admin by id
router.put('/admins/:id', adminController.updateAdmin);

// Delete an admin by id
router.delete('/admins/:id', adminController.deleteAdmin);

module.exports = router;

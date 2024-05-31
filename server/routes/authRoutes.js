const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // Adjust the path as necessary

// User login route
router.post("/login", authController.loginUser);

// User registration route
router.post("/register", authController.registerUser);

// Author registration route
router.post("/register/author", authController.registerAuthor);

// Mod registration route
router.post("/register/mod", authController.registerMod);

// Mod registration route
router.put("/verify-mod/:id", authController.verifyByAdmin);

// Email verification route
router.get("/verify-email", authController.verifyByEmail);

// Change user role route
router.put("/change-role/:userId", authController.changeUserRole);

// Get all users route
router.get("/users", authController.getAllUsers);

// Delete all users route
router.delete("/users", authController.deleteAllUsers);

module.exports = router;

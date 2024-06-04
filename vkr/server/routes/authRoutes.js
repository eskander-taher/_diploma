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
router.put("/verify-mod/:userId", authController.verifyMod);

// Change user role route
router.put("/change-role/:userId", authController.changeUserRole);

// Delete user
router.delete("/users/:userId", authController.deleteUser);

// Get all users route
router.get("/users", authController.getAllUsers);
router.get("/users/mods", authController.getAllMods);
router.get("/users/authors", authController.getAllMods);

// Delete all users route
router.delete("/users", authController.deleteAllUsers);

module.exports = router;

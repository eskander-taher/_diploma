const { Router } = require("express");
const router = Router();

const userController = require("../controllers/userController");

const authenticateToken = require("../middleware/auth");

router.post("/users/", userController.registerUser);
router.get("/users/verify-email", userController.verifyEmail);
router.post("/users/login", userController.loginUser);
router.patch("/users/admin/change-role/:userId",authenticateToken("admin"), userController.changeUserRole);
router.get("/users/admin-profile", authenticateToken("admin"), userController.getAdminData);
router.get("/users/moderator-profile", authenticateToken("moderator"), userController.getModeratorData);
router.get("/users/", userController.getAllUsers);
router.delete("/users", userController.deleteAllUsers);

module.exports = router;

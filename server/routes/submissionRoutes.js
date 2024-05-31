const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submissionController");

const fileUpload = require("express-fileupload");
const filesPayloadExists = require("../middleware/filesPayloadExists");
const fileExtensionLimiter = require("../middleware/fileExtensionLimiter");
const fileSizeLimiter = require("../middleware/fileSizeLimiter");

// Create a new submission
router.post(
	"/submissions",
	fileUpload({ createParentPath: true }),
	filesPayloadExists,
	fileExtensionLimiter([".doc", ".docx"]),
	fileSizeLimiter,
	submissionController.createSubmission
);

// Update an existing submission by ID
router.put("/submissions/:id", submissionController.updateSubmissionById);

// Get all submissions
router.get("/submissions", submissionController.getAllSubmissions);

// Get a specific submission by ID
router.get("/submissions/:id", submissionController.getSubmissionById);

// Delete a submission by ID
router.delete("/submissions/:id", submissionController.deleteSubmissionById);

module.exports = router;

const mongoose = require("mongoose");
const Submission = require("../models/submissionModel");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { z } = require("zod");

const coauthorSchema = z.object({
	fullName: z.string().min(1),
	university: z.string().min(1),
});

const commentSchema = z.object({
	moderator: z.string(),
	comment: z.string().min(1),
});

const submissionSchema = z.object({
	workName: z.string().min(1),
	withPublication: z.boolean().optional(),
	supervisorName: z.string().min(1),
	supervisorAcademicDegree: z.string().min(1),
	author: z.string(),
	coauthors: z.array(coauthorSchema).optional(),
	event: z.string(),
	section: z.string(),
	comments: z.array(commentSchema).optional(),
	file: z.string().min(1).optional(),
	status: z.enum(["pendding", "accepted", "rejected"]).optional(),
	grade: z.number().min(0).max(10).optional(),
	grader: z.string(),
});

exports.createSubmission = async (req, res) => {
	const data = req.body;

	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		// Check for file upload
		let uniqueFilename = "";
		if (req.files && req.files.file) {
			const file = req.files.file;
			uniqueFilename = `${uuidv4()}-${file.name}`;
			const filepath = path.join(__dirname, "..", "uploads", uniqueFilename);

			await file.mv(filepath, (err) => {
				if (err) {
					throw new Error("File upload failed");
				}
			});
		}

		const submission = new Submission({
			workName: data.workName,
			withPublication: data.withPublication,
			supervisorName: data.supervisorName,
			supervisorAcademicDegree: data.supervisorAcademicDegree,
			author: data.author,
			coauthors: data.coauthors || [],
			event: data.event,
			section: data.section,
			comments: data.comments || [],
			file: uniqueFilename,
			status: data.status || "pendding",
			grade: data.grade,
			grader: data.grader,
		});

		const savedSubmission = await submission.save({ session });

		await session.commitTransaction();
		res.json(savedSubmission);
	} catch (error) {
		await session.abortTransaction();
		res.status(500).json({
			error: "An error occurred while creating the submission.",
			details: error.message,
		});
	} finally {
		session.endSession();
	}
};

exports.updateSubmissionById = async (req, res) => {
	const submissionId = req.params.id;
	const data = req.body;

	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const submission = await Submission.findById(submissionId).session(session);

		if (!submission) {
			await session.abortTransaction();
			return res.status(404).json({ error: "Submission not found." });
		}

		// Check for file upload
		if (req.files && req.files.file) {
			const file = req.files.file;
			const uniqueFilename = `${uuidv4()}-${file.name}`;
			const filepath = path.join(__dirname, "..", "uploads", uniqueFilename);

			await file.mv(filepath, (err) => {
				if (err) {
					throw new Error("File upload failed");
				}
			});

			// Update file path in submission
			submission.file = uniqueFilename;
		}

		submission.workName = data.workName || submission.workName;
		submission.withPublication =
			data.withPublication !== undefined ? data.withPublication : submission.withPublication;
		submission.supervisorName = data.supervisorName || submission.supervisorName;
		submission.supervisorAcademicDegree =
			data.supervisorAcademicDegree || submission.supervisorAcademicDegree;
		submission.author = data.author || submission.author;
		submission.coauthors = data.coauthors || submission.coauthors;
		submission.event = data.event || submission.event;
		submission.section = data.section || submission.section;
		submission.comments = data.comments || submission.comments;
		submission.status = data.status || submission.status;
		submission.grade = data.grade !== undefined ? data.grade : submission.grade;
		submission.grader = data.grader || submission.grader;

		const savedSubmission = await submission.save({ session });

		await session.commitTransaction();
		res.json(savedSubmission);
	} catch (error) {
		await session.abortTransaction();
		res.status(500).json({
			error: "An error occurred while updating the submission.",
			details: error.message,
		});
	} finally {
		session.endSession();
	}
};

exports.getAllSubmissions = async (req, res) => {
	try {
		const submissions = await Submission.find()
			.populate("author")
			.populate("event")
			.populate("section")
			.populate({
				path: "comments",
				populate: { path: "moderator" },
			})
			.populate("grader")
			.exec();
		res.status(200).json(submissions);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getSubmissionById = async (req, res) => {
	try {
		const submission = await Submission.findById(req.params.id)
			.populate("author")
			.populate("event")
			.populate("section")
			.populate({
				path: "comments",
				populate: { path: "moderator" },
			})
			.populate("grader")
			.exec();
		if (!submission) {
			return res.status(404).json({ error: "Submission not found" });
		}
		res.status(200).json(submission);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.deleteSubmissionById = async (req, res) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const submission = await Submission.findById(req.params.id).exec();
		if (!submission) {
			await session.abortTransaction();
			session.endSession();
			return res.status(404).json({ error: "Submission not found" });
		}

		await submission.remove({ session });

		await session.commitTransaction();
		session.endSession();

		res.status(200).json({ message: "Submission deleted" });
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		res.status(500).json({ error: error.message });
	}
};

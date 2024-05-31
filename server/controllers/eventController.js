const mongoose = require("mongoose");
const Event = require("../models/eventModel");
const Section = require("../models/sectionModel");
const { z } = require("zod");

const eventSchema = z.object({
	name: z.string().min(1),
	description: z.string().optional(),
	status: z.enum(["draft", "upcoming", "going", "finished"]).optional(),
	createdBy: z.string(),
});

exports.createEvent = async (req, res) => {
	const data = req.body;

	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const event = new Event({
			name: data.name,
			description: data.description,
			status: data.status || "draft",
			createdBy: data.createdBy,
		});

		const savedEvent = await event.save({ session });

		// Array to hold the created sections
		const savedSections = [];

		// Create each section
		for (const sectionData of data.sections) {
			const section = new Section({
				name: sectionData.name,
				order: sectionData.order,
				mod: sectionData.mod,
				event: savedEvent._id,
			});

			const savedSection = await section.save({ session });
			savedSections.push(savedSection._id);
		}

		// Update the event with all section references
		savedEvent.sections = savedSections;
		await savedEvent.save({ session });

		await session.commitTransaction();
		res.json(savedEvent);
	} catch (error) {
		await session.abortTransaction();
		res.status(500).json({
			error: "An error occurred while creating the event.",
			details: error.message,
		});
	} finally {
		session.endSession();
	}
};

exports.getAllEvents = async (req, res) => {
	try {
		const events = await Event.find()
			.populate({
				path: "sections",
				populate: { path: "mod" }, // Populate the mods within each section
			})
			.populate("createdBy") // Populate the createdBy field
			.exec();
		res.status(200).json(events);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getEventById = async (req, res) => {
	try {
		const event = await Event.findById(req.params.id).populate("sections").exec();
		if (!event) {
			return res.status(404).json({ error: "Event not found" });
		}
		res.status(200).json(event);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.updateEventById = async (req, res) => {
	const validation = eventSchema.partial().safeParse(req.body);

	if (!validation.success) {
		return res.status(400).json({ error: validation.error.errors });
	}

	try {
		const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		}).exec();

		if (!event) {
			return res.status(404).json({ error: "Event not found" });
		}

		res.status(200).json(event);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.deleteEventById = async (req, res) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const event = await Event.findById(req.params.id).exec();
		if (!event) {
			await session.abortTransaction();
			session.endSession();
			return res.status(404).json({ error: "Event not found" });
		}

		await Section.deleteMany({ event: event._id }, { session });
		await event.remove({ session });

		await session.commitTransaction();
		session.endSession();

		res.status(200).json({ message: "Event and associated sections deleted" });
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		res.status(500).json({ error: error.message });
	}
};

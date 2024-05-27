const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { exclude } = require("../utils/exclude");

// Create a new event with sections
exports.createEvent = async (req, res) => {
	const { name, description, adminId, sections } = req.body;
	console.log(req.body);

	try {
		const newEvent = await prisma.event.create({
			data: {
				name,
				description,
				adminId: parseInt(adminId), // Ensure adminId is stored as a number
				sections: {
					create: sections.map((section) => ({
						order: parseFloat(section.sectionOrder), // Ensure sectionOrder is stored as a float
						name: section.sectionName,
					})),
				},
			},
			include: {
				sections: true, // Include sections in the response
			},
		});
		res.status(201).json(newEvent);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get all events
exports.getAllEvents = async (req, res) => {
	try {
		const events = await prisma.event.findMany({
			include: {
				sections: true,
			},
		});
		res.status(200).json(events);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get a single event by id
exports.getEventById = async (req, res) => {
	const { id } = req.params;
	try {
		const event = await prisma.event.findUnique({
			where: { id: parseInt(id) }, // Ensure id is parsed as an integer
			include: {
				sections: true,
				admin: true,
			},
		});
		if (!event) {
			return res.status(404).json({ error: "Event not found" });
		}
		res.status(200).json(event);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Update an event by id
exports.updateEvent = async (req, res) => {
	const { id } = req.params;
	const { name, description, adminId } = req.body;
	try {
		const updatedEvent = await prisma.event.update({
			where: { id: parseInt(id) }, // Ensure id is parsed as an integer
			data: {
				name,
				description,
				adminId: parseInt(adminId), // Ensure adminId is stored as a number
			},
		});
		res.status(200).json(updatedEvent);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Delete an event by id
exports.deleteEvent = async (req, res) => {
	const { id } = req.params;
	try {
		await prisma.event.delete({
			where: { id: parseInt(id) }, // Ensure id is parsed as an integer
		});
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

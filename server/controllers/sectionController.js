const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new section
exports.createSection = async (req, res) => {
    const { name, eventId } = req.body;
    try {
        const newSection = await prisma.section.create({
            data: {
                name,
                eventId: parseInt(eventId) // Ensure eventId is stored as a number
            }
        });
        res.status(201).json(newSection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all sections
exports.getAllSections = async (req, res) => {
    try {
        const sections = await prisma.section.findMany({
            include: {
                event: true
            }
        });
        res.status(200).json(sections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single section by id
exports.getSectionById = async (req, res) => {
    const { id } = req.params;
    try {
        const section = await prisma.section.findUnique({
            where: { id: parseInt(id) }, // Ensure id is parsed as an integer
            include: {
                event: true
            }
        });
        if (!section) {
            return res.status(404).json({ error: 'Section not found' });
        }
        res.status(200).json(section);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a section by id
exports.updateSection = async (req, res) => {
    const { id } = req.params;
    const { name, eventId } = req.body;
    try {
        const updatedSection = await prisma.section.update({
            where: { id: parseInt(id) }, // Ensure id is parsed as an integer
            data: {
                name,
                eventId: parseInt(eventId) // Ensure eventId is stored as a number
            }
        });
        res.status(200).json(updatedSection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a section by id
exports.deleteSection = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.section.delete({
            where: { id: parseInt(id) } // Ensure id is parsed as an integer
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new participation
const createParticipation = async (req, res) => {
  const { authorId, sectionId, fileId } = req.body;
  try {
    const participation = await prisma.participation.create({
      data: {
        author: { connect: { id: parseInt(authorId, 10) } },
        section: { connect: { id: parseInt(sectionId, 10) } },
        file: { connect: { id: parseInt(fileId, 10) } },
      },
    });
    res.status(201).json(participation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create participation' });
  }
};

// Get all participations
const getAllParticipations = async (req, res) => {
  try {
    const participations = await prisma.participation.findMany();
    res.status(200).json(participations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch participations' });
  }
};

// Get a single participation by ID
const getParticipationById = async (req, res) => {
  const { id } = req.params;
  try {
    const participation = await prisma.participation.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (participation) {
      res.status(200).json(participation);
    } else {
      res.status(404).json({ error: 'Participation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch participation' });
  }
};

// Update a participation by ID
const updateParticipation = async (req, res) => {
  const { id } = req.params;
  const { authorId, sectionId, fileId } = req.body;
  try {
    const participation = await prisma.participation.update({
      where: { id: parseInt(id, 10) },
      data: {
        author: { connect: { id: parseInt(authorId, 10) } },
        section: { connect: { id: parseInt(sectionId, 10) } },
        file: { connect: { id: parseInt(fileId, 10) } },
      },
    });
    res.status(200).json(participation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update participation' });
  }
};

// Delete a participation by ID
const deleteParticipation = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.participation.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete participation' });
  }
};

module.exports = {
  createParticipation,
  getAllParticipations,
  getParticipationById,
  updateParticipation,
  deleteParticipation,
};

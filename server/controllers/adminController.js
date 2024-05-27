const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new admin
exports.createAdmin = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const newAdmin = await prisma.admin.create({
            data: {
                username,
                email,
                password,
                role
            }
        });
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all admins
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await prisma.admin.findMany();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single admin by id
exports.getAdminById = async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await prisma.admin.findUnique({
            where: { id: parseInt(id) }
        });
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an admin by id
exports.updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { username, email, password, role } = req.body;
    try {
        const updatedAdmin = await prisma.admin.update({
            where: { id: parseInt(id) },
            data: {
                username,
                email,
                password,
                role
            }
        });
        res.status(200).json(updatedAdmin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an admin by id
exports.deleteAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.admin.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

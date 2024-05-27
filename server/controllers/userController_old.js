const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const sendVerificationEmail = require("../utils/sendVerificationEmail");

const SALT_ROUNDS = 10;

const userRegistrationSchema = z.object({
	username: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(3),
});

exports.registerUser = async (req, res) => {
	try {
		// Validating user input
		console.log(req.body);
		const user = userRegistrationSchema.parse(req.body);

		// Storing user input in db
		const salt = await bcrypt.genSalt(SALT_ROUNDS);
		const hashedPassword = await bcrypt.hash(user.password, salt);

		const createdUser = await prisma.user.create({
			data: {
				...user,
				password: hashedPassword,
			},
		});

		try {
			const { id, email } = createdUser;
			await sendVerificationEmail(id, email);
			res.json({
				success: true,
				message: `verification message was sent to email: ${email}`,
			});
		} catch (err) {
			console.error("Error sending email:", err);
			res.status(500).json({
				success: false,
				error: "Failed to send verification email.",
			});
		}
	} catch (error) {
		console.error("User registration error:", error);
		res.json({ success: false, error });
	}
};

exports.verifyEmail = async (req, res) => {
	try {
		const verificationToken = req.query.token;
		const user = jwt.verify(verificationToken, process.env.SECRET);

		const verifiedUser = await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				verified: true,
			},
		});
		res.render("emailVerified", { name: verifiedUser.username, email: verifiedUser.email });
	} catch (error) {
		console.log(error);
		res.json({
			success: false,
			error,
		});
	}
};

exports.changeUserRole = async (req, res) => {
	try {
		const { userId } = req.params;
		const { role } = req.body;

		// Update the user's role in the database
		const updatedUser = await prisma.user.update({
			where: {
				id: parseInt(userId, 10),
			},
			data: {
				role: role,
			},
		});

		res.json({
			success: true,
			data: updatedUser,
		});
	} catch (error) {
		console.error("Error changing user role:", error);
		res.status(500).json({
			success: false,
			error: "Internal server error.",
		});
	}
};

exports.loginUser = async (req, res) => {
	try {
		// Validating user input
		const { email, password } = req.body;

		const userLoginSchema = z.object({
			email: z.string().email(),
			password: z.string().min(3, "Password must contain at least 3 characters"),
		});

		const userInput = userLoginSchema.parse({
			email,
			password,
		});

		// Check if the user exists in the database
		const existingUser = await prisma.user.findUnique({
			where: {
				email: userInput.email,
			},
		});

		if (!existingUser) {
			return res.status(404).json({
				success: false,
				error: "User not found. Please register first.",
			});
		}

		// Compare the provided password with the hashed password stored in the database
		const passwordMatch = await bcrypt.compare(userInput.password, existingUser.password);

		if (!passwordMatch) {
			return res.status(401).json({
				success: false,
				error: "Invalid password.",
			});
		}

		// Generate JWT token
		const token = jwt.sign({ userId: existingUser.id }, process.env.SECRET, {
			expiresIn: "1d",
		});

		res.json({
			success: true,
			token,
			role: existingUser.role,
		});
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({
			success: false,
			error: "Internal server error.",
		});
	}
};

exports.getAdminData = (req, res) => {
	res.json({ success: true, message: "admin data" });
};

exports.getModeratorData = (req, res) => {
	res.json({ success: true, message: "moderator data" });
};

exports.getAllUsers = async (req, res) => {
	try {
		const users = await prisma.user.findMany({});

		res.json({
			success: true,
			data: users,
		});
	} catch (error) {
		res.json({ success: false, error });
	}
};

exports.deleteAllUsers = async (req, res) => {
	try {
		const users = await prisma.user.deleteMany({});

		res.json({
			success: true,
			data: users,
		});
	} catch (error) {
		res.json({ success: false, error });
	}
};

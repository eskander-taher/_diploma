const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Adjust the path as necessary
const Author = require("../models/authorModel"); // Adjust the path as necessary
const Mod = require("../models/modModel"); // Adjust the path as necessary
const sendVerificationEmail = require("../utils/sendVerificationEmail");

const SALT_ROUNDS = 10;

const userRegistrationSchema = z.object({
	email: z.string().email(),
	password: z.string().min(3),
	firstName: z.string().min(1),
	lastName: z.string().min(1),
});

const authorRegistrationSchema = userRegistrationSchema.extend({
	participantStatus: z.enum([
		"young scientist",
		"specialist",
		"undergraduate",
		"masters",
		"graduate",
	]),
	region: z.string().min(1),
	city: z.string().min(1),
	university: z.string().min(1),
	faculty: z.string().min(1),
	department: z.string().min(1),
	course: z.number().int().min(1),
	groupNumber: z.string().min(1),
});

const modRegistrationSchema = userRegistrationSchema.extend({
	faculty: z.string().min(1),
	department: z.string().min(1),
	jobTitle: z.string().min(1),
});

exports.registerUser = async (req, res) => {
	try {
		// Validating user input
		const user = null;
		try {
			user = userRegistrationSchema.parse(req.body);
		} catch (error) {
			return res.status(401).json({ success: false, error, message: "Bad request" });
		}

		// Storing user input in db
		const createdUser = null;
		try {
			const salt = await bcrypt.genSalt(SALT_ROUNDS);
			const hashedPassword = await bcrypt.hash(user.password, salt);

			createdUser = new User({
				...user,
				password: hashedPassword,
			});

			await createdUser.save();
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, error, message: "Could not store data in db" });
		}

		try {
			const { id, email } = createdUser;
			await sendVerificationEmail(id, email);
			res.json({
				success: true,
				message: `Verification message was sent to email: ${email}`,
			});
		} catch (err) {
			console.error("Error sending email:", err);
			return res.status(500).json({
				success: false,
				error: "Failed to send verification email.",
			});
		}
	} catch (error) {
		console.error("User registration error:", error);
		return res.status(500).json({ success: false, error });
	}
};

exports.registerAuthor = async (req, res) => {
	try {
		// Validating author input
		let author = null;

		try {
			author = authorRegistrationSchema.parse({
				...req.body,
				course: parseInt(req.body.course),
			});
		} catch (error) {
			console.log(error)
			return res.status(401).json({ success: false, error, message: "Bad request" });
		}

		// Storing author input in db
		let createdAuthor = null;
		try {
			const salt = await bcrypt.genSalt(SALT_ROUNDS);
			const hashedPassword = await bcrypt.hash(author.password, salt);

			createdAuthor = new Author({
				...author,
				password: hashedPassword,
			});
			await createdAuthor.save();
		} catch (error) {
			return res.status(500).json({
				success: false,
				error,
				message: "Could not store the data in db",
			});
		}

		try {
			const { id, email } = createdAuthor;
			await sendVerificationEmail(id, email);
			res.json({
				success: true,
				message: `Verification message was sent to email: ${email}`,
			});
		} catch (err) {
			console.error("Error sending email:", err);
			return res.status(500).json({
				success: false,
				error: "Failed to send verification email.",
			});
		}
	} catch (error) {
		console.error("Author registration error:", error);
		return res.status(500).json({ success: false, error });
	}
};

exports.registerMod = async (req, res) => {
	try {
		// Validating mod input
		let mod = null;
		try {
			mod = modRegistrationSchema.parse(req.body);
		} catch (error) {
			return res.status(401).json({ success: false, error, message: "Bad request" });
		}

		// Storing mod input in db
		let createdMod = null;
		try {
			const salt = await bcrypt.genSalt(SALT_ROUNDS);
			const hashedPassword = await bcrypt.hash(mod.password, salt);

			createdMod = new Mod({
				...mod,
				password: hashedPassword,
				role: "mod",
			});

			await createdMod.save();
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, error, message: "Could not store data in db" });
		}

		try {
			const { id, email } = createdMod;
			await sendVerificationEmail(id, email);
			res.json({
				success: true,
				message: `Verification message was sent to email: ${email}`,
			});
		} catch (err) {
			return res.status(500).json({
				success: false,
				error: "Failed to send verification email.",
			});
		}
	} catch (error) {
		console.error("Mod registration error:", error);
		return res.status(500).json({ success: false, error });
	}
};

exports.verifyByEmail = async (req, res) => {
	try {
		const verificationToken = req.query.token;
		const user = jwt.verify(verificationToken, process.env.SECRET);

		const verifiedUser = await User.findByIdAndUpdate(
			user.id,
			{ verifiedByEmail: true },
			{ new: true }
		);
		res.render("emailVerified", { name: verifiedUser.username, email: verifiedUser.email });
	} catch (error) {
		console.log(error);
		res.json({
			success: false,
			error,
		});
	}
};

exports.verifyByAdmin = async (req, res) => {
	try {
		const id = req.params.id;

		const verifiedMod = await Mod.findByIdAndUpdate(
			id,
			{ verifiedByAdmin: true },
			{ new: true }
		);
		res.json({
			success: true,
			message: `mod is verfied by admin successfully`,
			data: verifiedMod,
		});
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
		const updatedUser = await User.findByIdAndUpdate(userId, { role }, { new: true });

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
		const existingUser = await User.findOne({ email: userInput.email });

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
		const token = jwt.sign(
			{
				userId: existingUser._id,
				role: existingUser.role,
				firstName: existingUser.firstName,
				lastName: existingUser.lastName,
			},
			process.env.SECRET,
			{
				expiresIn: "1d",
			}
		);

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

exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find();

		res.json({
			success: true,
			data: users,
		});
	} catch (error) {
		res.json({ success: false, error });
	}
};
exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find();

		res.json({
			success: true,
			data: users,
		});
	} catch (error) {
		res.json({ success: false, error });
	}
};

exports.getAllMods = async (req, res) => {
	try {
		const users = await User.find({ role: "mod" });

		res.json({
			success: true,
			data: users,
		});
	} catch (error) {
		res.json({ success: false, error });
	}
};

exports.getAllAuthors = async (req, res) => {
	try {
		const users = await User.find({ role: "author" });

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
		const result = await User.deleteMany();

		res.json({
			success: true,
			data: result,
		});
	} catch (error) {
		res.json({ success: false, error });
	}
};

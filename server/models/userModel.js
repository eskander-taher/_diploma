const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			match: [/.+@.+\..+/, "Please enter a valid email address"],
		},
		phoneNumber: {
			type: String,
			trim: true,
		},
		verifiedByEmail: {
			type: Boolean,
			default: false,
		},
		role: {
			type: String,
			enum: ["author", "admin", "mod"],
			default: "author",
		},
		firstName: {
			type: String,
			trim: true,
			required: true,
		},
		lastName: {
			type: String,
			trim: true,
			required: true,
		},
		middleName: {
			type: String,
			trim: true,
		},
		dateOfBirth: {
			type: Date,
		},
	},
	{
		timestamps: true,
		discriminatorKey: "userType",
		collection: "users",
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;

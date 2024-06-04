const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
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

const modSchema = new Schema({
	faculty: {
		type: String,
		required: true,
		trim: true,
	},
	department: {
		type: String,
		required: true,
		trim: true,
	},
	jobTitle: {
		type: String,
		required: true,
		trim: true,
	},
	verifiedByAdmin: {
		type: Boolean,
		default: false,
	},
});
const Mod = User.discriminator("Mod", modSchema);


const authorSchema = new Schema({
    participantStatus: {
        type: String,
        enum: ["young scientist", "specialist", "undergraduate", "masters", "graduate"],
        trim: true,
        required: true,
    },
    region: {
        type: String,
        trim: true,
        required: true,
    },
    city: {
        type: String,
        trim: true,
        required: true,
    },
    university: {
        type: String,
        trim: true,
        required: true,
    },
    faculty: {
        type: String,
        trim: true,
        required: true,
    },
    department: {
        type: String,
        trim: true,
        required: true,
    },
    course: {
        type: Number,
        trim: true,
        required: true,
    },
    groupNumber:{
        type: String,
        trim: true,
        required: true,
    },
    submissions: [{
        type: Schema.Types.ObjectId,
        ref: 'Submission',
    }],
});
const Author = User.discriminator('Author', authorSchema);

const eventSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
		status: {
			type: String,
			enum: ["draft", "upcoming", "ongoing", "finished"],
			default: "draft",
		},
		sections: [
			{
				type: Schema.Types.ObjectId,
				ref: "Section",
			},
		],
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
		collection: "events",
	}
);
const Event = mongoose.model("Event", eventSchema);

const sectionSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		order: {
			type: Number,
			required: true,
		},
		mod: {
			type: Schema.Types.ObjectId,
			ref: "Mod",
			required: true,
		},
		event: {
			type: Schema.Types.ObjectId,
			ref: "Event",
		},
	},
	{
		timestamps: true,
		collection: "sections",
	}
);
const Section = mongoose.model("Section", sectionSchema);

const coauthorSchema = new Schema({
	fullName: {
		type: String,
		required: true,
		trim: true,
	},
	university: {
		type: String,
		required: true,
		trim: true,
	},
});

const submissionSchema = new Schema(
	{
		workName: {
			type: String,
			required: true,
			trim: true,
		},
		withPublication: {
			type: Boolean,
		},
		supervisorName: {
			type: String,
			required: true,
			trim: true,
		},
		supervisorAcademicDegree: {
			type: String,
			required: true,
			trim: true,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "Author",
			required: true,
		},
		coauthors: [coauthorSchema],
		event: {
			type: Schema.Types.ObjectId,
			ref: "Event",
			required: true,
		},
		section: {
			type: Schema.Types.ObjectId,
			ref: "Section",
			required: true,
		},
		comments: [
			{
				mod: {
					type: Schema.Types.ObjectId,
					ref: "Mod",
					required: true,
				},
				comment: {
					type: String,
					required: true,
					trim: true,
				},
				createdAt: {
					type: Date,
					default: Date.now,
				},
			},
		],
		file: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["pendding", "accepted", "rejected"],
			default: "pendding",
		},
		grade: {
			type: Number,
			min: 0,
			max: 10,
		},
		grader: {
			type: Schema.Types.ObjectId,
			ref: "Mod",
		},
	},
	{
		timestamps: true,
		collection: "submissions",
	}
);
const Submission = mongoose.model("Submission", submissionSchema);

const newsSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
        },
        content: {
            type: String,
            trim: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
        collection: "news",
    }
);

const News = mongoose.model("News", newsSchema);

module.exports = News;

module.exports = Submission;

module.exports = Section;

module.exports = Event;

module.exports = Author;

module.exports = Mod;

module.exports = User;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./userModel');

const authorSchema = new Schema({
    participantStatus: {
        type: String,
        enum: ["young scientist", "specialist", "undergraduate", "masters", "graduate"],
        trim: true,
    },
    region: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    university: {
        type: String,
        trim: true,
    },
    faculty: {
        type: String,
        trim: true,
    },
    department: {
        type: String,
        trim: true,
    },
    course: {
        type: Number,
        trim: true,
    },
    groupNumber:{
        type: String,
        trim: true,
    },
    submissions: [{
        type: Schema.Types.ObjectId,
        ref: 'Submission',
    }],
});

const Author = User.discriminator('Author', authorSchema);

module.exports = Author;

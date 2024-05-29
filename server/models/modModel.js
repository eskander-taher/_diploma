const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./userModel');

const modSchema = new Schema({
    faculty: {
        type: String,
        trim: true,
    },
    department: {
        type: String,
        trim: true,
    },
    jobTitle: {
        type: String,
        trim: true,
    },
    verifiedByAdmin: {
        type: Boolean,
        default: false,
    },
});

const Mod = User.discriminator('Mod', modSchema);

module.exports = Mod;

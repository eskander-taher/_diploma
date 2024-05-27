const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
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
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  verified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['author', 'admin', 'moderator'],
    default: 'author'
  }
}, {
  timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;

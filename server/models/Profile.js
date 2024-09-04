const mongoose = require("mongoose");

// Define the Profile schema
const profileSchema = new mongoose.Schema({
  gender: {
    type: String,
    //enum: ['Male', 'Female', 'Other'], // Optional: add predefined values
  },
  dateOfBirth: {
    type: String,
    // Optionally, add validation for date ranges if needed
  },
  about: {
    type: String,
    trim: true,
    maxlength: 500, // Optional: limit the length of the 'about' field
  },
  contactNumber: {
    type: String,
    trim: true,
    maxlength: 15, // Optional: limit the length of the contact number
  },

}, {
  timestamps: true, // Optional: add createdAt and updatedAt timestamps
});

// Export the Profile model
module.exports = mongoose.model("Profile", profileSchema);

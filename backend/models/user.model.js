// Import Schema from mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create userSchema - we define the schema before compiling it into a model
const userSchema = new Schema(
  {
    // Add the username field to the userSchema document
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

// Create a model called User, compiled using the userSchema - each instance of a Model is a document
const User = mongoose.model("User", userSchema);

module.exports = User;

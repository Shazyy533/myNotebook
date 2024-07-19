const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Make sure the reference model name matches your actual user model
  },
  title: {
    type: String,
    required: true,
    // unique: true, // If you want title to be unique, uncomment this line
  },
  desc: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Note', NotesSchema); // Make sure the model name matches your actual model name

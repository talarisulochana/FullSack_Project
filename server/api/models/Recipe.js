const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
    trim: true,
  },
  category: {
    type: String,
    required: false,
    trim: true,
  },
  ingredients: {
    type: [String],
    required: false,
  },
  cost: {
    type: Number,
    required: false,
    min: 0,
  },
  editorName: {
    type: String,
    required: false,
    trim: true,
  },
  image: {
    type: String, // Stores the public Google Drive URL
    required: false,
  },
  steps: {
    type: String,
    required: false,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('recipe', recipeSchema);

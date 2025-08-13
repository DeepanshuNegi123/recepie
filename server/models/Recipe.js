const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: { type: String, trim: true },
  imageUrl: { type: String },
  ingredients: [{
    name: { type: String, trim: true },
    amount: { type: mongoose.Schema.Types.Mixed, trim: true },
    unit: { type: Number, trim: true }
  }],
  steps: [{
    type: String,
    trim: true
  }],
  preptime: { type: Number, trim: true },
  cooktime: { type: Number, trim: true },
  servings: { type: Number, trim: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  tags: [String],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  favourites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

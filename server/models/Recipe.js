const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  description: { 
    type: String, 
    trim: true 
  },
  
  imageUrl: { 
    type: String 
  },

  ingredients: [{
    name: { 
      type: String, 
      required: true,
      trim: true 
    },
    amount: { 
      type: String,  // Changed from Mixed to String
      trim: true 
    },
    unit: { 
      type: String,  // Changed from Number to String
      trim: true 
    }
  }],

  steps: [{
    type: String,
    required: true,
    trim: true
  }],

  prepTime: {  // Changed from preptime to prepTime
    type: Number, 
    default: 0 
  },
  
  cookTime: {  // Changed from cooktime to cookTime
    type: Number, 
    default: 0 
  },
  
  servings: { 
    type: Number, 
    default: 1 
  },
  
  difficulty: { 
    type: String, 
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Easy'
  },
  
  tags: [String],

  author: {  // Made optional for now
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    // Removed required: true temporarily
  },

  favorites: [{  // Changed from favourites to favorites
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
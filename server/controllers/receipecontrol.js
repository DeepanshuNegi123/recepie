const Recipe = require('../models/Recipe');
const { uploadoncloud } = require('../utils/cloudinary');

const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, steps, prepTime, cookTime, servings, difficulty, tags } = req.body;
    let imageUrl = req.body.imageUrl || '';

    if (req.file) {
      const result = await uploadoncloud(req.file.path);
      imageUrl = result.secure_url;
    }

    const newRecipe = new Recipe({
      title,
      description,
      imageUrl,
      ingredients: JSON.parse(ingredients),
      steps: JSON.parse(steps),
      prepTime,
      cookTime,
      servings,
      difficulty,
      tags: tags.split(',').map(tag => tag.trim())
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRecipes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const recipes = await Recipe.find()
      .skip(skip)
      .limit(limit)
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 });

    const total = await Recipe.countDocuments();
    res.json({
      recipes,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalRecipes: total
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const searchRecipes = async (req, res) => {
  try {
    const { ingredient } = req.query;
    const recipes = await Recipe.find({
      'ingredients.name': { $regex: ingredient, $options: 'i' }
    }).populate('author', 'username avatar');
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('author', 'username avatar')
      .populate('favorites', 'username avatar');
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, steps, prepTime, cookTime, servings, difficulty, tags } = req.body;
    let updateData = {
      title,
      description,
      ingredients: JSON.parse(ingredients),
      steps: JSON.parse(steps),
      prepTime,
      cookTime,
      servings,
      difficulty,
      tags: tags.split(',').map(tag => tag.trim())
    };

    if (req.file) {
      const result = await uploadoncloud(req.file.path);
      updateData.imageUrl = result.secure_url;
    }

    const recipe = await Recipe.findOneAndUpdate(
      { _id: req.params.id },
      updateData,
      { new: true }
    );

    if (!recipe) return res.status(404).json({ error: 'Recipe not found or unauthorized' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({ _id: req.params.id });
    if (!recipe) return res.status(404).json({ error: 'Recipe not found or unauthorized' });
    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const toggleFavorite = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

    const userId = req.user.id;
    const index = recipe.favorites.indexOf(userId);

    if (index === -1) {
      recipe.favorites.push(userId);
    } else {
      recipe.favorites.splice(index, 1);
    }

    await recipe.save();
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createRecipe,
  getRecipes,
  searchRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  toggleFavorite
};

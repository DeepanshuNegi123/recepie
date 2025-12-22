const Recipe = require('../models/Recipe');
const Comment = require('../models/comment');
const { uploadoncloud } = require('../utils/cloudinary');



const addcomment = async (req, res) =>{

try {

console.log("Received body:", req.body);
console.log("User from token:", req.user); // Added for debugging

const {recipeId, comment} = req.body;


if(!recipeId || !comment){
  return res.status(400).json({ error: 'recipeId and comment are required' });

};

const newcomment = new Comment({

  recipeId: recipeId,
  userId: req.user.id, // ✅ ADDED: Link comment to logged-in user
  text: comment,
 
});

await newcomment.save();
console.log("Comment created successfully:", newcomment._id);
res.status(201).json(newcomment);



}
catch (error) {

}




}





const createRecipe = async (req, res) => {
  try {
    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILE:", req.file);
    console.log("REQ.USER:", req.user);

    const {
      title,
      description,
      prepTime,
      cookTime,
      servings,
      difficulty
    } = req.body;

    // Parse JSON strings from FormData
    const ingredients = JSON.parse(req.body.ingredients || "[]");
    const steps = JSON.parse(req.body.steps || "[]");
    const tags = JSON.parse(req.body.tags || "[]");

    // Validation
    if (!title || ingredients.length === 0 || steps.length === 0) {
      return res.status(400).json({
        error: "Title, ingredients, and steps are required"
      });
    }

    const newRecipe = new Recipe({
      title,
      description: description || "",
      imageUrl: req.file ? req.file.path : "", // ✅ Cloudinary URL
      ingredients,
      steps,
      prepTime: Number(prepTime) || 0,
      cookTime: Number(cookTime) || 0,
      servings: Number(servings) || 1,
      difficulty: difficulty || "Easy",
      tags,
      author: req.user.id
    });

    await newRecipe.save();

    res.status(201).json({
      success: true,
      recipe: newRecipe
    });

  } catch (err) {
    console.error("Create recipe error:", err);
    res.status(500).json({ error: err.message });
  }
};



const getRecipes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // ✅ CHANGED: Filter by logged-in user's recipes only
    const recipes = await Recipe.find({ author: req.user.id })
.skip(skip)       
      .limit(limit)
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    const total = await Recipe.countDocuments({ author: req.user.id });
    
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
    
    // ✅ CHANGED: Search only in user's own recipes
    const recipes = await Recipe.find({
      author: req.user.id,
      'ingredients.name': { $regex: ingredient, $options: 'i' }
    }).populate('author', 'username');
    
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRecipe = async (req, res) => {
  try {
    // ✅ CHANGED: Get recipe only if it belongs to the user
    const recipe = await Recipe.findOne({
      _id: req.params.id,
      author: req.user.id
    })
      .populate('author', 'username')
      .populate('favorites', 'username');
      
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, steps, prepTime, cookTime, servings, difficulty, tags, imageUrl } = req.body;
    
    let updateData = {
      title,
      description,
      ingredients: Array.isArray(ingredients) ? ingredients : JSON.parse(ingredients),
      steps: Array.isArray(steps) ? steps : JSON.parse(steps),
      prepTime: Number(prepTime),
      cookTime: Number(cookTime),
      servings: Number(servings),
      difficulty,
      tags: Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : [])
    };

    if (imageUrl) {
      updateData.imageUrl = imageUrl;
    } else if (req.file) {
      const result = await uploadoncloud(req.file.path);
      updateData.imageUrl = result.secure_url;
    }

    // ✅ CHANGED: Update only if recipe belongs to user
    const recipe = await Recipe.findOneAndUpdate(
      { _id: req.params.id, author: req.user.id },
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
    // ✅ CHANGED: Delete only if recipe belongs to user
    const recipe = await Recipe.findOneAndDelete({ 
      _id: req.params.id,
      author: req.user.id 
    });
    
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

const myKitchen = async (req, res) => {
  try {
    // ✅ CHANGED: Get only logged-in user's recipes
    const recipes = await Recipe.find({ author: req.user.id })
      .sort({ createdAt: -1 });
    res.json(recipes);
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
  toggleFavorite,
  myKitchen

};
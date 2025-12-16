const express = require('express');
const {
  createRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  searchRecipes,
  toggleFavorite,
  myKitchen
} = require('../controllers/receipecontrol');

const Upload = require('../middlewares/uploadmiddlewares');
const { authenticateUser } = require('../middlewares/authmiddleware'); // ✅ ADDED

const router = express.Router();

// ✅ ADDED: Protect all routes with authentication
router.use(authenticateUser);

// Main routes
router.route('/')
  .get(getRecipes)
  .post(createRecipe);

// Specific routes
router.route('/search').get(searchRecipes);
router.route('/mykitchen').get(myKitchen);
router.route('/:id/favorite').put(toggleFavorite);

// Recipe by ID
router.route('/:id')
  .get(getRecipe)
  .put(Upload.single('image'), updateRecipe)
  .delete(deleteRecipe);

module.exports = router;
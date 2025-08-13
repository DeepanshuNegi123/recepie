const express = require('express');
const {
  createRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  searchRecipes,
  toggleFavorite
} = require('../controllers/receipecontrol');
const Upload = require('../middlewares/uploadmiddlewares');

const router = express.Router();

router.route('/')
  .get(getRecipes)
  .post(Upload.single('image'), createRecipe);

router.route('/search').get(searchRecipes);
router.route('/:id/favorite').put(toggleFavorite);

router.route('/:id')
  .get(getRecipe)
  .put(Upload.single('image'), updateRecipe)
  .delete(deleteRecipe);

module.exports = router;

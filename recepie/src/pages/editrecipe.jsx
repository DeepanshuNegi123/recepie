import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import IngredientInput from '../components/Recipe/ingredientinput';
import StepInput from '../components/Recipe/setupinput';
import { fetchRecipe, updateRecipe } from '../services/recipeservices';
import { uploadImage } from '../services/imageservice';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    imageUrl: '',
    ingredients: [{ name: '', amount: '', unit: '' }],
    steps: [''],
    prepTime: 0,
    cookTime: 0,
    servings: 1,
    difficulty: 'Easy',
    tags: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const recipe = await fetchRecipe(id);
        setFormData({
          title: recipe.title,
          description: recipe.description || '',
          imageUrl: recipe.imageUrl,
          ingredients: recipe.ingredients,
          steps: recipe.steps,
          prepTime: recipe.prepTime || 0,
          cookTime: recipe.cookTime || 0,
          servings: recipe.servings || 1,
          difficulty: recipe.difficulty || 'Easy',
          tags: recipe.tags?.join(', ') || ''
        });
      } catch (err) {
        console.error('Failed to load recipe:', err);
      }
    };
    loadRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let imageUrl = formData.imageUrl;
      if (formData.image) {
        const imageData = await uploadImage(formData.image);
        imageUrl = imageData.url;
      }

      const recipeData = {
        ...formData,
        imageUrl,
        ingredients: formData.ingredients.filter(ing => ing.name.trim() !== ''),
        steps: formData.steps.filter(step => step.trim() !== '')
      };

      await updateRecipe(id, recipeData);
      navigate(`/recipes/${id}`);
    } catch (err) {
      console.error('Failed to update recipe:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Recipe</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Recipe Title*</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Recipe Image</label>
            {formData.imageUrl && (
              <img 
                src={formData.imageUrl} 
                alt="Current recipe" 
                className="h-24 w-24 object-cover mb-2 rounded"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        
        <IngredientInput 
          ingredients={formData.ingredients} 
          setFormData={setFormData} 
        />
        
        <StepInput 
          steps={formData.steps} 
          setFormData={setFormData} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Prep Time (min)</label>
            <input
              type="number"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Cook Time (min)</label>
            <input
              type="number"
              name="cookTime"
              value={formData.cookTime}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Servings</label>
            <input
              type="number"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Difficulty</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g. vegetarian, italian, quick"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Updating...' : 'Update Recipe'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipe;
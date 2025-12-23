import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IngredientInput from '../components/Recipe/ingredientinput';
import StepInput from '../components/Recipe/setupinput';
import { createRecipe } from '../services/recipeservices';
import { uploadImage } from '../services/imageservice';
import { BackButton } from '../components/UI/back';

const CreateRecipe = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    ingredients: [{ name: '', amount: '', unit: '' }],
    steps: [''],
    prepTime: 0,
    cookTime: 0,
    servings: 1,
    difficulty: 'Easy',
    tags: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  
  const handleImageChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
     console.log(e.target.files[0]);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let imageUrl = '';
    


  const recipeData = new FormData();

    recipeData.append("title", formData.title);
recipeData.append("description", formData.description);

recipeData.append(
  "ingredients",
  JSON.stringify(
    formData.ingredients.filter(ing => ing.name.trim() !== "")
  )
);

recipeData.append(
  "steps",
  JSON.stringify(
    formData.steps.filter(step => step.trim() !== "")
  )
);

recipeData.append("prepTime", Number(formData.prepTime));
recipeData.append("cookTime", Number(formData.cookTime));
recipeData.append("servings", Number(formData.servings));
recipeData.append("difficulty", formData.difficulty);

recipeData.append(
  "tags",
  JSON.stringify(
    formData.tags
      ? formData.tags.split(",").map(tag => tag.trim())
      : []
  )
);


if (formData.image) {
  recipeData.append("image", formData.image);
}

      console.log('Sending recipe data:', recipeData);

      await createRecipe(recipeData);
      await new Promise(resolve => setTimeout(resolve, 300));
      navigate('/mykitchen');
      
    } catch (err) {
      console.error('Error creating recipe:', err);
      alert('Failed to create recipe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <BackButton className='ml-4 mt-4' text='Back'/>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2">
            Create New Recipe
          </h1>
          <p className="text-gray-600">Share your culinary masterpiece with the world</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title and Image Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <span className="text-orange-500">📝</span> Recipe Title*
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200 hover:border-orange-300"
                  required
                  placeholder="Enter a delicious title..."
                />
              </div>
              
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <span className="text-orange-500">📷</span> Recipe Image*
                </label>
                <input 
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 hover:border-orange-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-100 file:text-orange-700 file:cursor-pointer hover:file:bg-orange-200"
                />
              </div>
            </div>
          </div>
          
          {/* Description Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{animationDelay: '0.1s'}}>
            <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
              <span className="text-orange-500">✍️</span> Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200 hover:border-orange-300 resize-none"
              placeholder="Tell us about your recipe..."
            />
          </div>
          
          {/* Ingredients Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🥗</span>
              <h2 className="text-xl font-semibold text-gray-800">Ingredients</h2>
            </div>
            <IngredientInput 
              ingredients={formData.ingredients} 
              setFormData={setFormData} 
            />
          </div>
          
          {/* Steps Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">👨‍🍳</span>
              <h2 className="text-xl font-semibold text-gray-800">Cooking Steps</h2>
            </div>
            <StepInput 
              steps={formData.steps} 
              setFormData={setFormData} 
            />
          </div>
          
          {/* Time and Details Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">⏱️</span>
              <h2 className="text-xl font-semibold text-gray-800">Recipe Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="group">
                <label className="block text-gray-700 font-medium mb-2">Prep Time (min)</label>
                <input
                  type="number"
                  name="prepTime"
                  value={formData.prepTime}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200 hover:border-orange-300"
                />
              </div>
              
              <div className="group">
                <label className="block text-gray-700 font-medium mb-2">Cook Time (min)</label>
                <input
                  type="number"
                  name="cookTime"
                  value={formData.cookTime}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200 hover:border-orange-300"
                />
              </div>
              
              <div className="group">
                <label className="block text-gray-700 font-medium mb-2">Servings</label>
                <input
                  type="number"
                  name="servings"
                  value={formData.servings}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200 hover:border-orange-300"
                />
              </div>
              
              <div className="group">
                <label className="block text-gray-700 font-medium mb-2">Difficulty</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200 hover:border-orange-300 bg-white cursor-pointer"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Tags Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{animationDelay: '0.5s'}}>
            <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
              <span className="text-orange-500">🏷️</span> Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. vegetarian, italian, quick"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200 hover:border-orange-300"
            />
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end animate-slide-up" style={{animationDelay: '0.6s'}}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-yellow-600 focus:outline-none focus:ring-4 focus:ring-orange-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Creating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>Create Recipe</span>
                  <span>🚀</span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out backwards;
        }
      `}</style>
    </div>
  );
};

export default CreateRecipe;
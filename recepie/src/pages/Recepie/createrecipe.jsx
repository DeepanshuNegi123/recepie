import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IngredientInput from '../../components/Recipe/ingredientinput';
import StepInput from '../../components/Recipe/setupinput';
import { createRecipe } from '../../services/recipeservices';
import { BackButton } from '../../components/UI/back';

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
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
    <div className="w-full pb-24 pt-24 bg-brand-50 min-h-screen">
      <div className='max-w-4xl mx-auto px-4'>
          <BackButton className='' text='Back'/>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 mt-12">
        <div className="mb-16 animate-fade-in text-center border-b border-brand-200 pb-10">
          <h1 className="text-5xl font-display italic text-brand-900 mb-4">
            Curate a Recipe
          </h1>
          <p className="text-brand-600 font-light tracking-wide uppercase text-sm">Share your culinary heritage.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Title and Image Section */}
          <div className="bg-white border border-brand-200 p-10 shadow-sm animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="group">
                <label className="block font-display text-brand-900 italic font-bold mb-3 text-2xl">
                  Subject*
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input-field text-lg font-light border-b-2 border-brand-200 focus:border-primary border-t-0 border-l-0 border-r-0 bg-transparent px-0"
                  required
                  placeholder="e.g., Rustic Tuscan Soup"
                />
              </div>
              
              <div className="group">
                <label className="block font-display text-brand-900 italic font-bold mb-3 text-2xl">
                   Photography*
                </label>
                <input 
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-0 py-3 bg-transparent text-brand-600 transition-all duration-300 focus:outline-none file:mr-4 file:py-2.5 file:px-6 file:rounded-none file:border file:border-brand-300 file:bg-brand-50 file:font-semibold file:uppercase file:text-xs file:tracking-widest file:text-brand-800 file:cursor-pointer hover:file:bg-brand-100"
                />
              </div>
            </div>
          </div>
          
          {/* Description Section */}
          <div className="bg-white border border-brand-200 p-10 shadow-sm animate-slide-up" style={{animationDelay: '0.1s'}}>
            <label className="block font-display text-brand-900 italic font-bold mb-3 text-2xl">
              The Story
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="input-field border border-brand-200 p-4 font-light text-lg resize-none"
              placeholder="What makes this dish special? Where does it come from?"
            />
          </div>
          
          {/* Ingredients Section */}
          <div className="bg-white border border-brand-200 p-10 shadow-sm animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="mb-8 border-b border-brand-200 pb-4">
              <h2 className="text-3xl font-display italic text-brand-900">Ingredients</h2>
              <p className="text-brand-500 font-light mt-2 uppercase tracking-widest text-xs">A list of fresh provisions.</p>
            </div>
            <IngredientInput 
              ingredients={formData.ingredients} 
              setFormData={setFormData} 
            />
          </div>
          
          {/* Steps Section */}
          <div className="bg-white border border-brand-200 p-10 shadow-sm animate-slide-up" style={{animationDelay: '0.3s'}}>
            <div className="mb-8 border-b border-brand-200 pb-4">
              <h2 className="text-3xl font-display italic text-brand-900">Method</h2>
              <p className="text-brand-500 font-light mt-2 uppercase tracking-widest text-xs">Step-by-step instructions.</p>
            </div>
            <StepInput 
              steps={formData.steps} 
              setFormData={setFormData} 
            />
          </div>
          
          {/* Time and Details Section */}
          <div className="bg-white border border-brand-200 p-10 shadow-sm animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="mb-8 border-b border-brand-200 pb-4">
              <h2 className="text-3xl font-display italic text-brand-900">Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="group">
                <label className="block text-brand-800 font-bold mb-3 uppercase tracking-widest text-xs">Prep (min)</label>
                <input
                  type="number"
                  name="prepTime"
                  value={formData.prepTime}
                  onChange={handleChange}
                  min="0"
                  className="input-field border-b-2 border-brand-200 border-t-0 border-l-0 border-r-0 bg-transparent px-0 font-light"
                />
              </div>
              
              <div className="group">
                <label className="block text-brand-800 font-bold mb-3 uppercase tracking-widest text-xs">Cook (min)</label>
                <input
                  type="number"
                  name="cookTime"
                  value={formData.cookTime}
                  onChange={handleChange}
                  min="0"
                  className="input-field border-b-2 border-brand-200 border-t-0 border-l-0 border-r-0 bg-transparent px-0 font-light"
                />
              </div>
              
              <div className="group">
                <label className="block text-brand-800 font-bold mb-3 uppercase tracking-widest text-xs">Yield</label>
                <input
                  type="number"
                  name="servings"
                  value={formData.servings}
                  onChange={handleChange}
                  min="1"
                  className="input-field border-b-2 border-brand-200 border-t-0 border-l-0 border-r-0 bg-transparent px-0 font-light"
                />
              </div>
              
              <div className="group">
                <label className="block text-brand-800 font-bold mb-3 uppercase tracking-widest text-xs">Level</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="input-field border-b-2 border-brand-200 border-t-0 border-l-0 border-r-0 bg-transparent px-0 font-light cursor-pointer"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Tags Section */}
          <div className="bg-white border border-brand-200 p-10 shadow-sm animate-slide-up" style={{animationDelay: '0.5s'}}>
            <label className="block text-brand-900 font-display italic font-bold mb-4 text-2xl">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. vegan, rustic, dinner (comma separated)"
              className="input-field border-b-2 border-brand-200 border-t-0 border-l-0 border-r-0 bg-transparent px-0 font-light text-lg"
            />
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end pt-8 animate-slide-up" style={{animationDelay: '0.6s'}}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Publishing
                </span>
              ) : (
                "Publish to Kitchen"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
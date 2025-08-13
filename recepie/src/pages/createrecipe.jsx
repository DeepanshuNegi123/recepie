import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IngredientInput from '../components/Recipe/ingredientinput';
import StepInput from '../components/Recipe/setupinput';
import { createRecipe } from '../services/recipeservices';
import { uploadImage } from '../services/imageservice';
import { BackButton } from '../components/UI/back';

const CreateRecipe = () => {  // functional component



  const navigate = useNavigate(); // navigate after sucess


  // under we have state management 

  // under we have a usestate hook that return two array having current and update state 
  // setFormData is used to update the state
  // formadata is the current state
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



// another usestate hook to track form submission

  const [isSubmitting, setIsSubmitting] = useState(false);


// under we have a function for handle change 

  const handleChange = (e) => {  // e event object  


    const { name, value } = e.target; // destructuring the eventto get  the chnage in user name and value 
   
    
    // under we have a function setform data to change the sate of form data but while keeping the previous data
    // prev previous form data state
    // ...prev spread operator to copy existing data 
    // [name]: value here name is the key and value is the value
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  // under we have a function to handle image change  

  // e.target.files[0] to get the first file
  // updates image property

  const handleImageChange = (e) => {

    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  // under we have a function to handle submit

  const handleSubmit = async (e) => {
    
    e.preventDefault(); // prevent page refresh 
    
    
    setIsSubmitting(true); // loading state is set to true
    
    try {
      let imageUrl = '';
      if (formData.image) { // check if user has uploaded an image
        const imageData = await uploadImage(formData.image); // upload image to server 
        imageUrl = imageData.url; // extract image url from response
      }



      // under we have a recipe data object

      const recipeData = {
        ...formData,
        imageUrl,
        ingredients: formData.ingredients.filter(ing => ing.name.trim() !== ''),
        steps: formData.steps.filter(step => step.trim() !== '')
      };

      console.log(recipeData);


      // here we are sending the recipe data to server 
      await createRecipe(recipeData);
        await new Promise(resolve => setTimeout(resolve, 300)); // 300ms delay
        navigate('/mykitchen');
      
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <>
    <BackButton  className='' text='Back'/>
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Recipe</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6" encType='multipart/form-data'>
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
            <label className="block text-gray-700 mb-2">Recipe Image*</label>
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
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Recipe'}
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default CreateRecipe;
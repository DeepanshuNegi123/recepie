import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipe } from '../services/recipeservices';
import { BackButton } from '../components/UI/back';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const data = await fetchRecipe(id);
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadRecipe();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <>
    <div className=''>
      <BackButton  className='' text='Back'/>
      </div>

    <div className="max-w-4xl mx-auto py-8 px-4">
    
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
      
      <div className="mb-6">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title} 
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    {ingredient.amount && `${ingredient.amount} `}
                    {ingredient.unit && `${ingredient.unit} `}
                    {ingredient.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Instructions</h2>
            <ol className="space-y-4">
              {recipe.steps.map((step, index) => (
                <li key={index} className="flex">
                  <span className="mr-3 font-bold">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-4">Recipe Details</h3>
            <div className="space-y-3">
              <p><span className="font-medium">Prep Time:</span> {recipe.prepTime} minutes</p>
              <p><span className="font-medium">Cook Time:</span> {recipe.cookTime} minutes</p>
              <p><span className="font-medium">Servings:</span> {recipe.servings}</p>
              <p><span className="font-medium">Difficulty:</span> {recipe.difficulty}</p>
              {recipe.tags && recipe.tags.length > 0 && (
                <div>
                  <span className="font-medium">Tags:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {recipe.tags.map((tag, index) => (
                      <span key={index} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default RecipePage;
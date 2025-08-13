import { Link } from 'react-router-dom';
import { HeartIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/recipes/${recipe._id}`}>
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title} 
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/recipes/${recipe._id}`}>
          <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-yellow-600">
            {recipe.title}
          </h3>
        </Link>
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <ClockIcon className="h-4 w-4 mr-1" />
          <span className="mr-3">{recipe.prepTime + recipe.cookTime} mins</span>
          <UserGroupIcon className="h-4 w-4 mr-1" />
          <span>{recipe.servings} servings</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src={recipe.author?.avatar || '/default-avatar.png'} 
              alt={recipe.author?.username} 
              className="h-8 w-8 rounded-full mr-2"
            />
            <span className="text-sm text-gray-600">{recipe.author?.username}</span>
          </div>
          <button className="text-gray-400 hover:text-red-500">
            <HeartIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
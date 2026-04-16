import { Link } from 'react-router-dom';
import { HeartIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="group cursor-pointer h-full flex flex-col relative bg-white border border-brand-200 hover:shadow-md transition-shadow duration-300">
      <Link to={`/recipes/${recipe._id}`} className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-brand-900/10 group-hover:bg-brand-900/5 transition-colors z-10"></div>
        <img 
          src={recipe.imageUrl || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&auto=format&fit=crop'} 
          alt={recipe.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 z-20">
          <button className="p-2 rounded-full bg-white text-brand-400 hover:text-primary hover:bg-brand-50 transition-all shadow-sm group/btn">
            <HeartIcon className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex-1">
          <Link to={`/recipes/${recipe._id}`}>
            <h3 className="font-display italic text-2xl text-brand-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
              {recipe.title}
            </h3>
          </Link>
          
          <div className="flex items-center gap-6 font-medium text-brand-500 mb-6 uppercase tracking-wider text-xs">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-brand-400" />
              <span>{recipe.prepTime + recipe.cookTime} mins</span>
            </div>
            <div className="flex items-center gap-2">
              <UserGroupIcon className="h-4 w-4 text-brand-400" />
              <span>{recipe.servings} serv</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-5 border-t border-brand-200">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center mr-3 overflow-hidden">
              <img 
                src={recipe.author?.avatar || `https://ui-avatars.com/api/?name=${recipe.author?.username || 'Chef'}&background=c5b497&color=fff`} 
                alt={recipe.author?.username} 
                className="h-full w-full object-cover grayscale-[30%]"
              />
            </div>
            <span className="text-sm font-medium text-brand-600 uppercase tracking-widest text-[10px]">{recipe.author?.username || 'Artisan Chef'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
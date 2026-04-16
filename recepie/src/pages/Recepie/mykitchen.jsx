import React, { useEffect, useState } from "react";
import { BackButton } from "../../components/UI/back";
import { fetchMyKitchen } from "../../services/recipeservices";
import { Link } from "react-router-dom";
import RecipeCard from "../../components/Recipe/Recipecard";


const MyKitchen = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchMyKitchen();
        setRecipes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-50">
        <div className="text-center animate-pulse">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-brand-800 border-t-transparent"></div>
          <p className="mt-6 font-medium text-brand-600 tracking-widest uppercase text-xs">Opening kitchen...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-brand-50">
        <div className="text-center bg-white border border-brand-200 p-12 max-w-lg w-full">
          <h2 className="text-2xl font-bold font-display text-brand-900 mb-2 italic">Something Went Wrong</h2>
          <p className="text-primary-dark font-medium text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-24 pt-24 bg-brand-50 min-h-screen">
      <div className='max-w-6xl mx-auto px-4'>
          <BackButton className='' text="Back"/>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 mt-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 animate-fade-in gap-6 border-b border-brand-200 pb-8">
          <div>
            <h1 className="text-5xl font-display italic text-brand-900 mb-4">
              My Kitchen
            </h1>
            <p className="text-brand-600 uppercase tracking-widest text-sm font-semibold">Your personal collection of culinary work.</p>
          </div>
          <div className="shrink-0 mb-2">
             <Link to="/create" className="btn-primary">
                Curate Recipe
             </Link>
          </div>
        </div>

        {recipes.length === 0 ? (
          <div className="bg-white border border-brand-200 shadow-sm p-16 text-center animate-slide-up mt-10">
            <h2 className="text-3xl font-display italic text-brand-900 mb-4">No recipes yet</h2>
            <p className="text-brand-600 text-lg mb-8 max-w-md mx-auto font-light">Start building your culinary collection. Your followers are waiting.</p>
            <Link to="/create" className="btn-secondary">
              Curate Your First Recipe
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {recipes.map((recipe, index) => (
              <div
                key={recipe._id}
                className="animate-slide-up h-full"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                 <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        {/* <EditRecipe/> */}
      </div>
    </div>
  );
};

export default MyKitchen;
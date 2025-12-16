import React, { useEffect, useState } from "react";
import { BackButton } from "../components/UI/back";
import { fetchMyKitchen } from "../services/recipeservices";
import { Link } from "react-router-dom";

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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your kitchen...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-lg p-8">
          <span className="text-6xl">😢</span>
          <p className="mt-4 text-red-500 font-semibold text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <BackButton className='ml-4 mt-4' text="Back"/>
      
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent flex items-center gap-3">
            <span className="text-4xl">🍳</span>
            My Kitchen
          </h1>
          <p className="text-gray-600 mt-2">Your personal recipe collection</p>
        </div>

        {recipes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center animate-slide-up">
            <span className="text-6xl block mb-4">👨‍🍳</span>
            <p className="text-gray-500 text-lg">No recipes found. Create your first recipe!</p>
            <p className="text-gray-400 mt-2">Start building your culinary masterpiece collection</p>
            <Link  to="/create"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full mt-4 inline-block" >Create Recipe</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe, index) => (
              <div
                key={recipe._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 animate-slide-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={recipe.imageUrl || "https://via.placeholder.com/300"}
                    alt={recipe.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-orange-600">
                    {recipe.difficulty}
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
                    {recipe.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-2 text-sm mb-3">
                    {recipe.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-gray-700 text-sm">
                      <span>⏱</span>
                      <span className="font-medium">{recipe.prepTime + recipe.cookTime} min</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-700 text-sm">
                      <span>🍽</span>
                      <span className="font-medium">{recipe.servings} servings</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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

export default MyKitchen;
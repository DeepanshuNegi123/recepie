import { useState, useEffect } from "react";
import RecipeCard from "../components/Recipe/Recipecard.jsx";
import SearchBar from "../components/UI/searchbar.jsx";
import { fetchRecipes } from "../services/recipeservices.jsx";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      const data = await fetchRecipes(page, searchTerm);
      
      if (!data || !data.recipes || !Array.isArray(data.recipes)) {
        throw new Error("Invalid data format received from API");
      }

      setRecipes(prev => [...prev, ...data.recipes]);
      setPage(prev => prev + 1);
      setHasMore(data.currentPage < data.totalPages);
    } catch (err) {
      setError(err.message);
      console.error("Failed to load recipes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    setPage(1);
    setRecipes([]);
    await loadRecipes();
  };

  if (loading && page === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading delicious recipes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex justify-center items-center p-4">
        <div className="bg-white border-2 border-red-200 rounded-2xl shadow-lg px-6 py-8 w-full max-w-md animate-slide-up">
          <div className="text-center">
            <span className="text-5xl block mb-4">⚠️</span>
            <h3 className="text-xl font-semibold text-red-600 mb-2">Oops! Something went wrong</h3>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 animate-fade-in text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-3">
            Discover Amazing Recipes
          </h1>
          <p className="text-gray-600 text-lg">Explore thousands of culinary delights from around the world</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <SearchBar onSearch={handleSearch} />
        </div>
        
        {/* Recipes Grid */}
        <InfiniteScroll
          dataLength={recipes.length}
          next={loadRecipes}
          hasMore={hasMore}
          loader={
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
              <p className="mt-3 text-gray-600 font-medium">Loading more recipes...</p>
            </div>
          }
          endMessage={
            <div className="text-center py-12 animate-fade-in">
              <span className="text-5xl block mb-3"></span>
              <p className="text-gray-600 text-lg font-medium">
                You've seen all recipes!
              </p>
              <p className="text-gray-500 mt-2">Check back later for more delicious content</p>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe, index) => (
              <div 
                key={`${recipe._id}-${index}`}
                className="animate-slide-up"
                style={{ animationDelay: `${(index % 9) * 0.05}s` }}
              >
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        </InfiniteScroll>

        {/* Empty State */}
        {!loading && recipes.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <span className="text-7xl block mb-4">🔍</span>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No recipes found</h3>
            <p className="text-gray-500">Try adjusting your search or explore different categories</p>
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

export default Home;
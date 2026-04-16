import { useState, useEffect } from "react";
import RecipeCard from "../../components/Recipe/Recipecard.jsx";
import SearchBar from "../../components/UI/searchbar.jsx";
import { fetchRecipes } from "../../services/recipeservices.jsx";
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
      <div className="min-h-screen flex items-center justify-center bg-brand-50">
        <div className="text-center animate-pulse">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-brand-900 border-t-transparent"></div>
          <p className="mt-6 font-medium text-brand-600 tracking-widest uppercase text-sm">Preparing the table...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center p-4 bg-brand-50">
        <div className="bg-white border border-red-900/20 shadow-sm px-8 py-10 w-full max-w-md animate-slide-up text-center">
          <h3 className="text-2xl italic font-display text-brand-900 mb-3">Something went wrong</h3>
          <p className="text-primary-dark font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-brand-50 min-h-screen pt-24">
      <div className="max-w-7xl mx-auto py-12 md:py-20 px-4">
        
        {/* Hero Section */}
        <div className="mb-20 animate-fade-in text-center max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 border border-brand-300 text-brand-700 font-medium text-xs tracking-widest uppercase mb-8">
            Seasonal Favorites
          </div>
          <h1 className="text-5xl md:text-6xl italic font-display mb-8 leading-tight text-brand-900">
            Inspire Your Inner Chef
          </h1>
          <p className="text-brand-700 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Explore a world of authentic culinary traditions created by a community passionate about good, clean, and fair food.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-20 animate-slide-up max-w-2xl mx-auto shadow-sm">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        {/* Recipes Grid */}
        <InfiniteScroll
          dataLength={recipes.length}
          next={loadRecipes}
          hasMore={hasMore}
          style={{ overflow: 'visible' }}
          loader={
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-brand-800 border-t-transparent"></div>
            </div>
          }
          endMessage={
            <div className="text-center py-20 animate-fade-in border-t border-brand-200 mt-16">
              <h3 className="font-display italic text-2xl text-brand-900 mb-2">
                That's everything for now.
              </h3>
              <p className="text-brand-600 font-light text-lg">Thank you for exploring with us.</p>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {recipes.map((recipe, index) => (
              <div 
                key={`${recipe._id}-${index}`}
                className="animate-slide-up h-full"
                style={{ animationDelay: `${(index % 9) * 0.05}s` }}
              >
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        </InfiniteScroll>

        {/* Empty State */}
        {!loading && recipes.length === 0 && (
          <div className="text-center py-32 animate-fade-in bg-white border border-brand-200 shadow-sm mt-12">
            <h3 className="text-3xl italic font-display text-brand-900 mb-4">No recipes found</h3>
            <p className="text-brand-600 text-lg font-light max-w-md mx-auto">Try a different ingredient or explore our other collections.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
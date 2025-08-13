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
      
      // Add this safety check
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

  if (loading && page === 1) return <div>Loading recipes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      
      <InfiniteScroll
        dataLength={recipes.length}
        next={loadRecipes}
        hasMore={hasMore}
        loader={<div className="text-center py-4">Loading more recipes...</div>}
        endMessage={
          <p className="text-center py-4 text-gray-500">
            You've seen all recipes!
          </p>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {recipes.map(recipe => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Home;
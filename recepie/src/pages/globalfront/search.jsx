import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUtensils, FaShoppingBasket, FaUserFriends, FaArrowLeft } from 'react-icons/fa';

/* 
 * ============================================================================
 * 🔍 GLOBAL SEARCH ENGINE - BACKEND ARCHITECTURE & INTEGRATION GUIDE
 * ============================================================================
 * 
 * How to connect this frontend to your Global Search backend:
 * 
 * 1. THE DATABASE STRATEGY:
 *    Since this search engine queries "everything" on the site (Recipes, Shop Items, Users),
 *    you will need a fast aggregation endpoint.
 *    - Option A (Simple): Create `GET /api/search?q=xyz`. In your `searchController.js`, 
 *      run `Promise.all([Recipe.find(...), Product.find(...), User.find(...)])` to fetch all matches.
 *    - Option B (Advanced/Scalable): Implement MongoDB Atlas Search (Text Indexing) or Elasticsearch.
 *      This allows fuzzy matching, boosting, and lightning-fast full-text searches.
 * 
 * 2. FRONTEND INTEGRATION:
 *    Uncomment the `fetchSearchResults` function below when your backend is ready.
 *    It will hit your endpoint, handle loading states, and distribute the JSON payload
 *    (e.g., `{ recipes: [...], products: [...], users: [...] }`) into the separate result buckets.
 * 
 * 3. REAL-TIME FILTERING:
 *    The `activeTab` state manages the frontend view without needing to re-fetch data,
 *    providing a smooth "Google-like" immediate tab switching experience.
 * ============================================================================
 */

const SearchEngine = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Dummy state to represent fetched data from the backend
  const [results, setResults] = useState({
    recipes: [],
    products: [],
    users: []
  });

  // Example backend fetch function (To be connected by you)
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    setHasSearched(true);

    // MOCK DELAY - Remove this and replace with actual fetch call below
    setTimeout(() => {
      setResults({
        recipes: [
          { id: 1, title: 'Organic Mediterranean Pasta', author: 'Chef Maria', time: '40m' },
          { id: 2, title: 'Slow Roasted Tomato Soup', author: 'John Doe', time: '1h' }
        ],
        products: [
          { id: 1, name: 'Artisan Olive Oil', price: '$24.00', vendor: 'Organicwill Farm' }
        ],
        users: [
          { id: 1, name: 'Chef Maria', handle: '@chefmaria' }
        ]
      });
      setIsSearching(false);
    }, 1000);

    /* 
    * ACTUAL BACKEND FETCH CODE (Uncomment when API is ready)
    *
    * fetch(`/api/search?query=${encodeURIComponent(query)}`)
    *   .then(res => res.json())
    *   .then(data => {
    *     setResults({
    *       recipes: data.recipes || [],
    *       products: data.products || [],
    *       users: data.users || []
    *     });
    *     setIsSearching(false);
    *   })
    *   .catch(err => {
    *     console.error(err);
    *     setIsSearching(false);
    *   });
    */
  };

  const tabs = [
    { id: 'all', label: 'All Results' },
    { id: 'recipes', label: 'Recipes', icon: <FaUtensils className="inline mr-2" /> },
    { id: 'products', label: 'Products', icon: <FaShoppingBasket className="inline mr-2" /> },
    { id: 'users', label: 'Members', icon: <FaUserFriends className="inline mr-2" /> },
  ];

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* Top Search Bar Header */}
      <div className="border-b border-brand-200 bg-brand-50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-brand-900 hover:text-primary transition shrink-0">
              <FaArrowLeft className="text-xl" />
            </Link>
            
            <form onSubmit={handleSearch} className="flex-1 max-w-3xl relative">
              <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-brand-400 text-lg" />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search recipes, ingredients, artisan vendors, or members..." 
                className="w-full bg-white border border-brand-200 rounded-full py-4 pl-16 pr-8 text-lg font-light outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 shadow-sm transition"
                autoFocus
              />
              <button type="submit" className="hidden">Submit</button>
            </form>
          </div>

          {hasSearched && (
            <div className="flex gap-8 mt-8 border-b border-transparent overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 text-sm uppercase tracking-widest font-semibold whitespace-nowrap transition relative ${
                    activeTab === tab.id ? 'text-primary' : 'text-brand-600 hover:text-brand-900'
                  }`}
                >
                  {tab.icon} {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Search Area */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-12">
        {!hasSearched ? (
          <div className="h-full flex flex-col items-center justify-center text-center mt-20">
            <FaSearch className="text-6xl text-brand-200 mb-6" />
            <h1 className="text-4xl font-display italic text-brand-900 mb-4">Discover Anything</h1>
            <p className="text-brand-600 font-light max-w-md">
              Type a keyword above to instantly search across our entire database of thousands of artisan recipes and local vendors.
            </p>
          </div>
        ) : isSearching ? (
          <div className="flex flex-col items-center justify-center py-20 text-brand-400">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
            <p className="uppercase tracking-widest text-xs font-semibold">Searching Database...</p>
          </div>
        ) : (
          <div className="space-y-16">
            
            {/* Recipes Results */}
            {(activeTab === 'all' || activeTab === 'recipes') && (
              <div>
                <h2 className="text-2xl font-display italic text-brand-900 mb-6 border-b border-brand-100 pb-2">Recipes</h2>
                {results.recipes.length > 0 ? (
                  <div className="flex flex-col gap-6">
                    {results.recipes.map(recipe => (
                      <Link to={`/recipes/${recipe.id}`} key={recipe.id} className="group block bg-brand-50 border border-brand-200 p-6 hover:shadow-md transition cursor-pointer">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-brand-900 group-hover:text-primary transition mb-1">{recipe.title}</h3>
                            <p className="text-brand-600 text-sm">By {recipe.author}</p>
                          </div>
                          <span className="text-xs uppercase tracking-widest text-brand-500 font-semibold">{recipe.time}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-brand-500 font-light italic">No recipes match your query.</p>
                )}
              </div>
            )}

            {/* Products Results */}
            {(activeTab === 'all' || activeTab === 'products') && (
              <div>
                <h2 className="text-2xl font-display italic text-brand-900 mb-6 border-b border-brand-100 pb-2">Shop Organicwill</h2>
                {results.products.length > 0 ? (
                  <div className="flex flex-col gap-6">
                    {results.products.map(product => (
                      <Link to="/organicwill" key={product.id} className="group flex justify-between items-center bg-white border border-brand-200 p-6 hover:shadow-md transition cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center">
                            <FaShoppingBasket className="text-brand-400 text-xl" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-brand-900 group-hover:text-primary transition">{product.name}</h3>
                            <p className="text-brand-600 text-sm">Seller: {product.vendor}</p>
                          </div>
                        </div>
                        <span className="text-lg font-display font-bold text-primary">{product.price}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-brand-500 font-light italic">No products match your query.</p>
                )}
              </div>
            )}

            {/* Users Results */}
            {(activeTab === 'all' || activeTab === 'users') && (
              <div>
                <h2 className="text-2xl font-display italic text-brand-900 mb-6 border-b border-brand-100 pb-2">Members & Chefs</h2>
                {results.users.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {results.users.map(user => (
                      <div key={user.id} className="flex items-center gap-4 border border-brand-200 p-4 hover:border-brand-400 transition cursor-pointer">
                        <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                           <div className="w-full h-full bg-brand-300 flex items-center justify-center text-white font-bold text-xl">
                             {user.name.charAt(0)}
                           </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-brand-900">{user.name}</h3>
                          <p className="text-brand-500 text-sm">{user.handle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-brand-500 font-light italic">No members found.</p>
                )}
              </div>
            )}
            
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchEngine;

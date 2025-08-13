// Mock database with unique IDs
let mockRecipes = [
  {
    _id: 'recipe-1a2b3c',
    title: 'Spaghetti Carbonara',
    imageUrl: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb',
    ingredients: [
      { name: 'Spaghetti', amount: '400', unit: 'g' },
      { name: 'Eggs', amount: '4', unit: '' },
      { name: 'Pancetta', amount: '150', unit: 'g' }
    ],
    steps: [
      'Cook spaghetti according to package instructions',
      'Fry pancetta until crispy',
      'Mix eggs with grated cheese',
      'Combine everything and serve'
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'Medium',
    author: { username: 'ChefJohn', avatar: '' },
    favorites: []
  },
  {
    _id: 'recipe-4d5e6f',
    title: 'Chocolate Chip Cookies',
    imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35',
    ingredients: [
      { name: 'Flour', amount: '2', unit: 'cups' },
      { name: 'Chocolate chips', amount: '1', unit: 'cup' }
    ],
    steps: [
      'Mix all ingredients',
      'Bake at 350°F for 10-12 minutes'
    ],
    prepTime: 15,
    cookTime: 12,
    servings: 24,
    difficulty: 'Easy',
    author: { username: 'BakerMary', avatar: '' },
    favorites: []
  }
];

// Helper function to simulate API delay
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 300));

// Generate a unique ID
const generateId = () => `recipe-${Math.random().toString(36).substr(2, 9)}`;

export const fetchRecipes = async (page = 1, searchTerm = '') => {
  await simulateDelay();
  
  // Filter recipes
  const filteredRecipes = searchTerm
    ? mockRecipes.filter(recipe => 
        recipe.ingredients.some(ing => 
          ing.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) || 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : mockRecipes;

  // Pagination
  const itemsPerPage = 10;
  const startIdx = (page - 1) * itemsPerPage;
  const paginatedRecipes = filteredRecipes.slice(startIdx, startIdx + itemsPerPage);

  return {
    recipes: paginatedRecipes,
    currentPage: page,
    totalPages: Math.ceil(filteredRecipes.length / itemsPerPage),
    totalRecipes: filteredRecipes.length
  };
};

export const fetchRecipe = async (id) => {
  await simulateDelay();
  const recipe = mockRecipes.find(r => r._id === id);
  if (!recipe) throw new Error('Recipe not found');
  return recipe;
};

const host = 'http://localhost:5003';
export const createRecipe = async (recipeData) => {
  await simulateDelay();
  try {
    const backdata  = await fetch(`${host}/recipes`,{
      method:'POST',
      header:'application/json',
      body:JSON.stringify(recipeData)
    })

  }catch(error)
{
 console.log(`error is 
  ${error}`);
  
}  const newRecipe = {
    ...recipeData,
    _id: generateId(), // Use unique ID generator
    favorites: [],
    author: { username: 'CurrentUser', avatar: '' },
    createdAt: new Date().toISOString()
  };
  mockRecipes = [newRecipe, ...mockRecipes];
  return newRecipe;
};

export const updateRecipe = async (id, recipeData) => {
  await simulateDelay();
  mockRecipes = mockRecipes.map(recipe => 
    recipe._id === id ? { ...recipe, ...recipeData, updatedAt: new Date().toISOString() } : recipe
  );
  return mockRecipes.find(recipe => recipe._id === id);
};

export const deleteRecipe = async (id) => {
  await simulateDelay();
  mockRecipes = mockRecipes.filter(recipe => recipe._id !== id);
};

export const toggleFavorite = async (id) => {
  await simulateDelay();
  const userId = 'user123'; // Simulated user ID
  
  
  mockRecipes = mockRecipes.map(recipe => {
    if (recipe._id === id) {
      const isFavorite = recipe.favorites.includes(userId);
      return {
        ...recipe,
        favorites: isFavorite
          ? recipe.favorites.filter(fav => fav !== userId)
          : [...recipe.favorites, userId]
      };
    }
    return recipe;
  });
  
  return mockRecipes.find(recipe => recipe._id === id);
};
const host = 'http://localhost:5003';




export const getAuthHeadersForFormData = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`
});

// ✅ Helper function with debugging
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  
  // 🔍 DEBUG: Log token status
  console.log('🔍 DEBUG - Token from localStorage:', token ? 'EXISTS' : 'MISSING');
  console.log('🔍 DEBUG - Token value:', token);
  
  if (!token) {
    console.error('❌ NO TOKEN FOUND! User needs to login.');
  }
  
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};





// ✅ Fetch recipes with detailed error logging
export const fetchRecipes = async (page = 1, searchTerm = '') => {
  try {

    console.log('📡 Fetching recipes...');
    
    const url = searchTerm 
      ? `${host}/recipes/search?ingredient=${searchTerm}`
      : `${host}/recipes?page=${page}`;
    
    console.log('🔍 Request URL:', url);
    console.log('🔍 Request Headers:', getAuthHeaders());
    
    const response = await fetch(url, {
      headers: getAuthHeaders()
    });

    console.log('🔍 Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Server error response:', errorText);
      // throw new Error(`Failed to fetch recipes: ${response.status} - ${errorText}`);
     // In your API file:
throw new Error(`Failed to fetch recipes: ${response.status} - ${errorText}`);

    }

    const data = await response.json();
    console.log('✅ Recipes fetched successfully:', data);
    
    // Handle both search results (array) and paginated results (object)
    if (Array.isArray(data)) {
      return {
        recipes: data,
        currentPage: 1,
        totalPages: 1,
        totalRecipes: data.length
      };
    }
    
    return data;
  } catch (error) {
    console.error('❌ Error fetching recipes:', error);
    throw error;
  }
};

// ✅ Fetch single recipe

export const fetchRecipe = async (id) => {

  try {

    console.log('📡 Fetching recipe:', id);
    
    const response = await fetch(`${host}/recipes/${id}`, {
      headers: getAuthHeaders()
    });

    console.log('🔍 Response status:', response.status);

    if (!response.ok) {
      throw new Error('Recipe not found');
    }

    const data = await response.json();
    console.log('✅ Recipe fetched:', data);
    return data;
    
  } catch (error) {
    console.error('❌ Error fetching recipe:', error);
    throw error;
  }
};




// Create recipe
export const createRecipe = async (recipeData) => {
  try {
    console.log(' Creating recipe...', recipeData);

    const response = await fetch(`${host}/recipes`, {
      method: 'POST',
      headers: getAuthHeadersForFormData(), 
      body: recipeData                    
    });

    console.log('🔍 Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error(' Server error:', errorData);
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const data = await response.json();
    console.log(' Recipe created successfully:', data);
    return data;

  } catch (error) {
    console.error(' Error creating recipe:', error);
    throw error;
  }
};




// ✅ Update recipe
export const updateRecipe = async (id, recipeData) => {
  try {
    console.log('📡 Updating recipe:', id);
    
    const response = await fetch(`${host}/recipes/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(recipeData)
    });

    console.log('🔍 Response status:', response.status);

    if (!response.ok) {
      throw new Error('Failed to update recipe');
    }

    const data = await response.json();
    console.log('✅ Recipe updated:', data);
    return data;
    
  } catch (error) {
    console.error('❌ Error updating recipe:', error);
    throw error;
  }
};


// ✅ Delete recipe
export const deleteRecipe = async (id) => {
  try {
    console.log('📡 Deleting recipe:', id);
    
    const response = await fetch(`${host}/recipes/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    console.log('🔍 Response status:', response.status);

    if (!response.ok) {
      throw new Error('Failed to delete recipe');
    }

    const data = await response.json();
    console.log('✅ Recipe deleted:', data);
    return data;
    
  } catch (error) {
    console.error('❌ Error deleting recipe:', error);
    throw error;
  }
};


// ✅ Toggle favorite
export const toggleFavorite = async (id) => {
  try {
    console.log('📡 Toggling favorite:', id);
    
    const response = await fetch(`${host}/recipes/${id}/favorite`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });

    console.log('🔍 Response status:', response.status);

    if (!response.ok) {
      throw new Error('Failed to toggle favorite');
    }

    const data = await response.json();
    console.log('✅ Favorite toggled:', data);
    return data;
    
  } catch (error) {
    console.error('❌ Error toggling favorite:', error);
    throw error;
  }
};



// ✅ Fetch My Kitchen recipes
export const fetchMyKitchen = async () => {
  try {
    console.log('📡 Fetching My Kitchen recipes...');
    
    const response = await fetch(`${host}/recipes/mykitchen`, {
      headers: getAuthHeaders()
    });

    console.log('🔍 Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Server error:', errorText);
      throw new Error(`Failed to fetch my kitchen recipes: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ My Kitchen recipes fetched:', data);
    return data;
    
  } catch (error) {
    console.error('❌ Error fetching my kitchen:', error);
    throw error;
  }
};
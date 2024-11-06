// Import necessary modules or libraries if required
// Example using Axios (optional):
// const axios = require('axios');

// API configuration
const API_URL = 'https://api.spoonacular.com/recipes/complexSearch'; // Replace with your chosen API's base URL
const API_KEY = 'your_api_key_here'; // Insert your actual API key

/**
 * Fetch recipes based on user search parameters
 * @param {Object} params - Search parameters (ingredients, cuisine, diet, etc.)
 * @returns {Promise} - Promise resolving to the fetched recipe data
 */
async function fetchRecipes(params) {
  try {
    const queryString = new URLSearchParams({
      apiKey: API_KEY,
      ingredients: params.ingredients || '',  // List of ingredients
      cuisine: params.cuisine || '',          // Cuisine type
      diet: params.diet || '',                // Dietary preference
      number: 10                              // Number of recipes to return
    });

    const response = await fetch(`${API_URL}?${queryString}`);
    if (!response.ok) throw new Error('Error fetching recipes');

    const data = await response.json();
    return data.results;  // Assuming 'results' is where recipe data is stored
  } catch (error) {
    console.error('Failed to fetch recipes:', error);
    return [];
  }
}

/**
 * Example function to search recipes by specific ingredient(s)
 * @param {String} ingredient - Ingredient name
 * @returns {Promise} - Promise resolving to recipes containing the specified ingredient
 */
async function searchByIngredient(ingredient) {
  return await fetchRecipes({ ingredients: ingredient });
}

/**
 * Example usage of the API functions
 */
(async function exampleUsage() {
  const recipes = await fetchRecipes({
    ingredients: 'chicken,tomato', 
    cuisine: 'Italian',
    diet: 'low-carb'
  });
  console.log(recipes);
})();

export { fetchRecipes, searchByIngredient };

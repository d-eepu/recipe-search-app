const API_KEY = 'YOUR_API_KEY';
const API_URL = 'https://api.spoonacular.com/recipes/complexSearch';

async function searchRecipes() {
  const query = document.getElementById('searchInput').value;
  const vegan = document.getElementById('vegan').checked;

  const url = `${API_URL}?query=${query}&diet=${
    vegan ? 'vegan' : ''
  }&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayRecipes(data.results);
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
}

function displayRecipes(recipes) {
  const resultsSection = document.getElementById('results');
  resultsSection.innerHTML = '';

  recipes.forEach((recipe) => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h2>${recipe.title}</h2>
            <p>${recipe.summary}</p>
            <button onclick="getRecipeDetails(${recipe.id})">View Details</button>
        `;
    resultsSection.appendChild(card);
  });
}

async function getRecipeDetails(id) {
  const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;
  try {
    const response = await fetch(url);
    const recipe = await response.json();
    showRecipeDetails(recipe);
  } catch (error) {
    console.error('Error fetching recipe details:', error);
  }
}

function showRecipeDetails(recipe) {
  alert(`
        Title: ${recipe.title}
        Servings: ${recipe.servings}
        Preparation time: ${recipe.readyInMinutes} minutes
        Ingredients: ${recipe.extendedIngredients
          .map((ing) => ing.original)
          .join(', ')}
        Instructions: ${recipe.instructions}
    `);
}

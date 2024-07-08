// Recipe App
// Get DOM Elements
const recipeList = document.getElementById('recipe-list');
const addRecipeBtn = document.getElementById('add-recipe-btn');
const recipeModal = document.getElementById('recipe-modal');
const closeBtn = document.getElementsByClassName('close')[0];
const recipeForm = document.getElementById('recipe-form');
const saveRecipeBtn = document.getElementById('save-recipe-btn');

// Initialize Recipes Array
let recipes = [];

// Check if there are any recipes in localStorage
if (localStorage.getItem('recipes')) {
    recipes = JSON.parse(localStorage.getItem('recipes'));
    displayRecipes();
}

// Event Listeners
addRecipeBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
recipeForm.addEventListener('submit', saveRecipe);

// Functions
function openModal() {
    recipeModal.style.display = 'block';
}

function closeModal() {
    recipeModal.style.display = 'none';
    recipeForm.reset();
}

function saveRecipe(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('recipe-name').value;
    const image = document.getElementById('recipe-image').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const instructions = document.getElementById('recipe-instructions').value;

    // Create recipe object
    const recipe = {
        name,
        image,
        ingredients,
        instructions
    };

    // Add new recipe to array
    recipes.push(recipe);

    // Save to localStorage
    localStorage.setItem('recipes', JSON.stringify(recipes));

    // Display updated recipe list
    displayRecipes();

    // Close modal
    closeModal();
}

function displayRecipes() {
    // Clear existing content
    recipeList.innerHTML = '';

    // Loop through recipes array and display each recipe
    recipes.forEach((recipe, index) => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <h3>${recipe.name}</h3>
            <button onclick="deleteRecipe(${index})">Delete</button>
            <button onclick="editRecipe(${index})">Edit</button>
        `;

        recipeList.appendChild(recipeCard);
    });
}

function deleteRecipe(index) {
    // Remove recipe from array
    recipes.splice(index, 1);

    // Update localStorage
    localStorage.setItem('recipes', JSON.stringify(recipes));

    // Re-display recipes
    displayRecipes();
}

function editRecipe(index) {
    // Open modal to edit recipe
    openModal();

    // Pre-fill form with current recipe details
    const recipe = recipes[index];
    document.getElementById('recipe-name').value = recipe.name;
    document.getElementById('recipe-image').value = recipe.image;
    document.getElementById('recipe-ingredients').value = recipe.ingredients;
    document.getElementById('recipe-instructions').value = recipe.instructions;

    // Save edited recipe on form submission
    saveRecipeBtn.onclick = function() {
        // Update recipe object
        recipe.name = document.getElementById('recipe-name').value;
        recipe.image = document.getElementById('recipe-image').value;
        recipe.ingredients = document.getElementById('recipe-ingredients').value;
        recipe.instructions = document.getElementById('recipe-instructions').value;

        // Update array in localStorage
        localStorage.setItem('recipes', JSON.stringify(recipes));

        // Display updated recipe list
        displayRecipes();

        // Close modal
        closeModal();
    }
}

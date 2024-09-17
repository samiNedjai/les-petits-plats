const searchInput = document.getElementById('input_main');
searchInput.addEventListener('input', handleSearchUpdate);

// Initialisation du compteur de recettes
updateRecipeCount(recipes.length);

/**
 * Gère la mise à jour des résultats en fonction de la recherche dans la barre principale
 * et des filtres actifs (ingrédients, appareils, ustensiles).
 * @returns {Array} - Les résultats filtrés à afficher.
 */
function handleSearchUpdate() {
  const keyword = searchInput.value.trim();
  const filters = {
    ingredients: selectedIngredients,
    appliances: selectedAppliances,
    utensils: selectedUtensils,
  };

  // Si aucune entrée ni filtre actif, on réinitialise toutes les recettes
  if (!keyword && !hasActiveFilters(filters)) {
    resetUI();  // Réinitialise l'interface avec toutes les recettes
    return;
  }

  // Si l'entrée est inférieure à 3 caractères et qu'il n'y a pas de filtres, 
  //ne pas faire de recherch
  if (keyword.length < 3 && !hasActiveFilters(filters)) return recipes;

  const filteredBySearchInput = searchRecipes(keyword);
  const finalResults = filterRecipes(filteredBySearchInput, filters);
  updateUIWithSearchResults(finalResults); // Mise à jour de l'interface avec les résultats filtrés
  updateRecipeCount(finalResults.length);

  return finalResults;
}

/**
 * Vérifie si des filtres actifs sont appliqués.
 * @param {Object} filters - Un objet contenant les listes de filtres actifs (ingrédients, appareils, ustensiles).
 * @returns {Boolean} - True si des filtres sont actifs, sinon False.
 */
function hasActiveFilters(filters) {
  return filters.ingredients.length || filters.appliances.length || filters.utensils.length;
}

/**
 * Recherche les recettes en fonction du mot-clé saisi dans la barre de recherche principale.
 * @param {String} keyword - Le mot-clé saisi par l'utilisateur.
 * @returns {Array} - Les recettes filtrées qui correspondent au mot-clé.
 */
function searchRecipes(keyword) {
  const lowerCaseKeyword = keyword.toLowerCase();
  return recipes.filter(recipe => {
    return (
      recipe.name.toLowerCase().includes(lowerCaseKeyword) ||
      recipe.description.toLowerCase().includes(lowerCaseKeyword) ||
      recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(lowerCaseKeyword))
    );
  });
}

/**
 * Filtre les recettes par les ingrédients, appareils et ustensiles sélectionnés.
 * @param {Array} recipes - La liste des recettes à filtrer.
 * @param {Object} filters - Les filtres actifs (ingrédients, appareils, ustensiles).
 * @returns {Array} - Les recettes filtrées qui correspondent aux filtres.
 */
function filterRecipes(recipes, filters) {
  return recipes.filter(recipe => {
    const ingredientMatch = !filters.ingredients.length || filters.ingredients.every(ing =>
      recipe.ingredients.some(recipeIng => recipeIng.ingredient.toLowerCase().includes(ing.toLowerCase()))
    );
    const applianceMatch = !filters.appliances.length || filters.appliances.includes(recipe.appliance.toLowerCase());
    const utensilMatch = !filters.utensils.length || filters.utensils.every(ust =>
      recipe.ustensils.some(recipeUst => recipeUst.toLowerCase().includes(ust.toLowerCase()))
    );
    return ingredientMatch && applianceMatch && utensilMatch;
  });
}

/**
 * Met à jour l'interface utilisateur avec les résultats filtrés.
 * @param {Array} results - Les recettes filtrées à afficher.
 */
function updateUIWithSearchResults(results) {
  const container = document.getElementById('ContainerCards');
  container.innerHTML = ''; // Clear previous results
  if (results.length === 0) {
    container.innerHTML = '<p>Aucune recette ne contient votre recherche.</p>';
  } else {
    const cardFactory = new RecipeCardFactory();
    results.forEach(recipe => container.innerHTML += cardFactory.createCard(recipe));
  }
}

/**
 * Met à jour le compteur de recettes affichées.
 * @param {Number} count - Le nombre total de recettes affichées.
 */
function updateRecipeCount(count) {
  document.querySelector('.total-recipes').textContent = `${count} recettes`;
}

/**
 * Réinitialise l'interface utilisateur avec toutes les recettes disponobles.
 */
function resetUI() {
  updateUIWithSearchResults(recipes);
  updateRecipeCount(recipes.length);
}

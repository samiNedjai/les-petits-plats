document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('input_main');
  const searchForm = document.querySelector('form');

  // Vérifier si les éléments existent avant d'ajouter des écouteurs d'événements
  if (searchInput && searchForm) {
    // Empêche la soumission et le rechargement de la page
    searchForm.addEventListener('submit', function(event) {
      event.preventDefault();
    });

    searchInput.addEventListener('input', function(event) {
      event.preventDefault(); // Empêche tout comportement par défaut
      handleSearchUpdate(event); // Appelle la fonction de mise à jour de la recherche
    });

    // Initialisation du compteur de recettes
    updateRecipeCount(recipes.length);
  } else {
    console.error("L'élément avec l'ID 'input_main' ou le formulaire n'a pas été trouvé.");
  }
});

/**
 * Gère la mise à jour des résultats en fonction de la recherche dans la barre principale
 * et des filtres actifs (ingrédients, appareils, ustensiles).
 * @returns {Array} - Les résultats filtrés à afficher.
 */
function handleSearchUpdate(event) {
  const searchInput = document.getElementById('input_main');
  if (event) event.preventDefault();
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
  if (keyword.length < 3 && !hasActiveFilters(filters)) {
    return resetUI;
  }
    

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
  const filteredRecipes = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const titleMatch = recipe.name.toLowerCase().includes(lowerCaseKeyword);
    const descriptionMatch = recipe.description.toLowerCase().includes(lowerCaseKeyword);

    let ingredientsMatch = false;
    for (let j = 0; j < recipe.ingredients.length; j++) {
      if (recipe.ingredients[j].ingredient.toLowerCase().includes(lowerCaseKeyword)) {
        ingredientsMatch = true;
        break;
      }
    }

    if (titleMatch || descriptionMatch || ingredientsMatch) {
      filteredRecipes.push(recipe);
    }
  }

  return filteredRecipes;
}

/**
 * Filtre les recettes par les ingrédients, appareils et ustensiles sélectionnés.
 * @param {Array} recipes - La liste des recettes à filtrer.
 * @param {Object} filters - Les filtres actifs (ingrédients, appareils, ustensiles).
 * @returns {Array} - Les recettes filtrées qui correspondent aux filtres.
 */
function filterRecipes(recipes, filters) {
  const filteredResults = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    // Vérification des ingrédients
    let ingredientMatch = true;
    if (filters.ingredients.length > 0) {
      ingredientMatch = false;
      for (let j = 0; j < filters.ingredients.length; j++) {
        const filterIngredient = filters.ingredients[j].toLowerCase();
        for (let k = 0; k < recipe.ingredients.length; k++) {
          if (recipe.ingredients[k].ingredient.toLowerCase().includes(filterIngredient)) {
            ingredientMatch = true;
            break;
          }
        }
        if (!ingredientMatch) break;
      }
    }

    // Vérification des appareils
    let applianceMatch = true;
    if (filters.appliances.length > 0) {
      applianceMatch = filters.appliances.includes(recipe.appliance.toLowerCase());
    }

    // Vérification des ustensiles
    let utensilMatch = true;
    if (filters.utensils.length > 0) {
      utensilMatch = false;
      for (let j = 0; j < filters.utensils.length; j++) {
        const filterUtensil = filters.utensils[j].toLowerCase();
        for (let k = 0; k < recipe.ustensils.length; k++) {
          if (recipe.ustensils[k].toLowerCase().includes(filterUtensil)) {
            utensilMatch = true;
            break;
          }
        }
        if (!utensilMatch) break;
      }
    }

    if (ingredientMatch && applianceMatch && utensilMatch) {
      filteredResults.push(recipe);
    }
  }

  return filteredResults;
}

/**
 * Met à jour l'interface utilisateur avec les résultats filtrés.
 * @param {Array} results - Les recettes filtrées à afficher.
 */
function updateUIWithSearchResults(results) {
  const container = document.getElementById('ContainerCards');
  container.innerHTML = ''; // Efface les résultats précédents
  if (results.length === 0) {
    container.innerHTML = '<p>Aucune recette ne contient votre recherche.</p>';
  } else {
    const cardFactory = new RecipeCardFactory();
    for (let i = 0; i < results.length; i++) {
      container.innerHTML += cardFactory.createCard(results[i]);
    }
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
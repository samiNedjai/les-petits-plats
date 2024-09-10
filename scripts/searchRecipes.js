const searchInput = document.getElementById('input_main');
searchInput.addEventListener('input', handleSearchUpdate);

// Initialisation du compteur de recettes
updateRecipeCount(recipes.length);

function handleSearchUpdate() {
  const keyword = searchInput.value.trim(); // Recherche principale
  const ingredientFilter = selectedIngredients; // Filtre basé sur les ingrédients sélectionnés
  const applianceFilter = selectedAppliances; // Filtre basé sur les appareils sélectionnés
  const utensilFilter = selectedUtensils; // Filtre basé sur les ustensiles sélectionnés

  // Ne lancer la recherche que si l'utilisateur entre au moins 3 caractères ou s'il y a des filtres
  if (keyword.length >= 3 || ingredientFilter.length || applianceFilter.length || utensilFilter.length) {
    const filteredBySearchInput = searchRecipes(keyword); // Recherche principale
    const finalResults = filterRecipes(filteredBySearchInput, ingredientFilter, applianceFilter, utensilFilter); // Filtrage des recettes

    updateUIWithSearchResults(finalResults);
    updateRecipeCount(finalResults.length);

    return finalResults; // Retourne les résultats filtrés
  } else {
    // Si moins de 3 caractères, on affiche toutes les recettes
    updateUIWithSearchResults(recipes);
    updateRecipeCount(recipes.length);
    return recipes; // Retourne toutes les recettes
  }
}

// Recherche dans les recettes en fonction du mot-clé saisi dans la barre principale
function searchRecipes(keyword) {
  const lowerCaseKeyword = keyword.toLowerCase();

  return recipes.filter(recipe => {
    const titleMatch = recipe.name.toLowerCase().includes(lowerCaseKeyword);
    const descriptionMatch = recipe.description.toLowerCase().includes(lowerCaseKeyword);
    const ingredientsMatch = recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(lowerCaseKeyword));

    return titleMatch || descriptionMatch || ingredientsMatch;
  });
}

// Filtrer les recettes par les ingrédients, appareils et ustensiles sélectionnés
function filterRecipes(recipes, ingredientFilters, applianceFilters, utensilFilters) {
    return recipes.filter(recipe => {
        const ingredientMatch = !ingredientFilters.length || ingredientFilters.every(ingFilter => 
            recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(ingFilter.toLowerCase()))
        );
        const applianceMatch = !applianceFilters.length || applianceFilters.every(appFilter => 
            recipe.appliance.toLowerCase() === appFilter.toLowerCase()
        );
        const utensilMatch = !utensilFilters.length || utensilFilters.every(ustFilter => 
            recipe.ustensils.some(ust => ust.toLowerCase().includes(ustFilter.toLowerCase()))
        );

        return ingredientMatch && applianceMatch && utensilMatch;
    });
}

function updateUIWithSearchResults(results) {
  const container = document.getElementById('ContainerCards');
  container.innerHTML = ''; // Clear previous results

  if (results.length === 0) {
    container.innerHTML = '<p>Aucune recette ne contient votre recherche.</p>';
  } else {
    const cardFactory = new RecipeCardFactory();
    results.forEach(recipe => {
      const cardHtml = cardFactory.createCard(recipe);
      container.innerHTML += cardHtml;
    });
  }
}

function updateRecipeCount(count) {
  const recipeCountElement = document.querySelector('.total-recipes');
  recipeCountElement.textContent = `${count} recettes`;
}

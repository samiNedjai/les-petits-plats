let selectedIngredients = [];
let selectedAppliances = [];
let selectedUtensils = [];

/**
 * Extrait les ingrédients, appareils et ustensiles uniques à partir des recettes.
 * @returns {Object} - Un objet contenant des tableaux d'ingrédients, appareils et ustensiles uniques.
 */
function extractUniqueItems() {
  const allIngredients = new Set();
  const allAppliances = new Set();
  const allUtensils = new Set();

  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => allIngredients.add(ingredient.ingredient.toLowerCase().trim()));
    allAppliances.add(recipe.appliance.toLowerCase().trim());
    recipe.ustensils.forEach(utensil => allUtensils.add(utensil.toLowerCase().trim()));
  });

  return {
    ingredients: Array.from(allIngredients),
    appliances: Array.from(allAppliances),
    utensils: Array.from(allUtensils)
  };
}

/**
 * Remplit les listes déroulantes avec des éléments filtrés (ingrédients, appareils, ustensiles).
 * @param {object} data -Les données à afficher dans les dropdowns (ingrédients, appareils, ustensiles).
 */
function populateDropdowns(data) {
  populateDropdown('ingredientsList', data.ingredients, 'ingredient');
  populateDropdown('appareilsList', data.appliances, 'appliance');
  populateDropdown('ustensilesList', data.utensils, 'utensil');
  addDropdownEventListeners(); // Ajoute les événements après la mise à jour des dropdowns
}

/**
 * Remplit une liste déroulante spécifique avec des éléments.
 * @param {string} listId - L'ID de la liste déroulante à mettre à jour.
 * @param {Array} items - Les éléments à afficher dans la liste déroulante.
 * @param {string} type  - Le type d'élément (ingredient, appliance, utensil).
 */
function populateDropdown(listId, items, type) {
  const list = document.getElementById(listId);
  list.innerHTML = ''; // Clear previous items
  items.forEach(item => list.innerHTML += `<a href="#" class="dropdown-item ${type}-item">${item}</a>`);
}

/**
 * Met à jour les dropdowns en fonction des résultats filtrés.
 * @param {Array} results - Les résultats filtrés (recettes) à utiliser pour mettre à jour les dropdowns.
 */
function updateDropdownsWithFilteredResults(results) {
  if (!results || !results.length) {
    const allItems = extractUniqueItems();
    populateDropdowns(allItems);// Réinitialise les dropdowns si aucun résultat filtré
    return;
  }

  const filteredIngredients = new Set();
  const filteredAppliances = new Set();
  const filteredUtensils = new Set();

  results.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => filteredIngredients.add(ingredient.ingredient.toLowerCase().trim()));
    filteredAppliances.add(recipe.appliance.toLowerCase().trim());
    recipe.ustensils.forEach(utensil => filteredUtensils.add(utensil.toLowerCase().trim()));
  });

  populateDropdowns({
    ingredients: Array.from(filteredIngredients),
    appliances: Array.from(filteredAppliances),
    utensils: Array.from(filteredUtensils)
  });
}

/**
 * Met à jour les filtres sélectionnés et actualise les dropdowns.
 * @param {String} type - Le type de filtre (ingredient, appliance, utensil).
 * @param {String} value - La valeur de l'élément à filtrer.
 */
function updateSelectedFilters(type, value) {
  const selectedList = getSelectedList(type);
  if (selectedList.includes(value)) return;

  selectedList.push(value);// Ajoute l'élément à la liste de filtres sélectionnés
  addFilterBadge(type, value); // Ajoute un badge visuel pour le filtre

  const finalResults = handleSearchUpdate();
  updateDropdownsWithFilteredResults(finalResults); // Actualise les dropdowns
}

/**
 * Récupère la liste sélectionnée en fonction du type de filtre.
 * @param {String} type - Le type de filtre (ingredient, appliance, utensil).
 * @returns {Array} - La liste des filtres sélectionnés pour ce type.
 */
function getSelectedList(type) {
  switch (type) {
    case 'ingredient': return selectedIngredients;
    case 'appliance': return selectedAppliances;
    case 'utensil': return selectedUtensils;
    default: return [];
  }
}

/**
 * Ajoute un badge visuel pour un filtre sélectionné.
 * @param {String} type - Le type de filtre (ingredient, appliance, utensil).
 * @param {String} value - La valeur du filtre sélectionné.
 */
function addFilterBadge(type, value) {
  const container = document.querySelector('.selected-filters');
  const filterBadge = document.createElement('div');
  filterBadge.classList.add('filter-badge');
  filterBadge.setAttribute('data-value', value);
  filterBadge.innerHTML = `${value} <button class="remove-filter" data-type="${type}" data-value="${value}">x</button>`;
  container.appendChild(filterBadge);

 // Ajouter un écouteur pour retirer le filtre et le badge
 filterBadge.querySelector('.remove-filter').addEventListener('click', (event) => {
    const filterValue = event.target.getAttribute('data-value');
    const filterType = event.target.getAttribute('data-type');
    removeFilter(filterType, filterValue);// Retire le filtre logiquement et visuellemen
    filterBadge.remove(); // Supprime le badge visuellement
  });
}

/**
 * Retire un filtre spécifique et met à jour les résultats.
 * @param {String} type - Le type de filtre (ingredient, appliance, utensil).
 * @param {String} value - La valeur du filtre à retirer.
 */
function removeFilter(type, value) {
  const selectedList = getSelectedList(type);
  const index = selectedList.indexOf(value);
  if (index > -1) selectedList.splice(index, 1); // Retire l'élément de la liste

  const finalResults = handleSearchUpdate();
  updateDropdownsWithFilteredResults(finalResults); // Actualise les dropdowns après suppression
}

/**
 * Ajoute des événements de clic pour chaque élément des dropdowns.
 */
function addDropdownEventListeners() {
  addDropdownClickEvent('ingredient-item', 'ingredient');
  addDropdownClickEvent('appliance-item', 'appliance');
  addDropdownClickEvent('utensil-item', 'utensil');
}

/**
 * Ajoute un événement de clic à un type spécifique d'élément dans un dropdown.
 * @param {String} className - La classe des éléments du dropdown (ingredient-item, appliance-item, etc.).
 * @param {String} type - Le type de filtre (ingredient, appliance, utensil).
 */
function addDropdownClickEvent(className, type) {
  document.querySelectorAll(`.${className}`).forEach(item => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      const value = event.target.textContent.trim();
      updateSelectedFilters(type, value);
    });
  });
}

/**
 * Ajoute les événements d'entrée pour filtrer les listes des dropdowns.
 */
function addSearchEventListeners() {
    addInputFilterEvent('searchIngredient', 'ingredientsList');
    addInputFilterEvent('searchAppareils', 'appareilsList');
    addInputFilterEvent('searchUstensiles', 'ustensilesList');
  }

/**
 * Ajoute un événement d'entrée pour filtrer les éléments dans une liste déroulante.
 * @param {String} inputId - L'ID de l'élément d'entrée de recherche.
 * @param {String} listId - L'ID de la liste à filtrer.
 */
function addInputFilterEvent(inputId, listId) {
    document.getElementById(inputId).addEventListener('input', () => filterDropdownList(inputId, listId));
}

/**
 * Filtre les éléments d'une liste déroulante en fonction de l'entrée utilisateur.
 * @param {String} inputId - L'ID de l'élément d'entrée.
 * @param {String} listId - L'ID de la liste à filtrer.
 */
function filterDropdownList(inputId, listId) {
  const input = document.getElementById(inputId).value.toLowerCase();
  document.querySelectorAll(`#${listId} a`).forEach(item => {
    item.style.display = item.textContent.toLowerCase().includes(input) ? '' : 'none';
  });
}

// Initialisation des événements et des dropdowns à la fin du chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  const data = extractUniqueItems();
  populateDropdowns(data); // Remplit les dropdowns
  addSearchEventListeners(); // Ajoute les événements de recherche
});

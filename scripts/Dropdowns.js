let selectedIngredients = [];
let selectedAppliances = [];
let selectedUtensils = [];

function extractUniqueItems() {
    const allIngredients = new Set();
    const allAppliances = new Set();
    const allUtensils = new Set();

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            allIngredients.add(ingredient.ingredient.toLowerCase().trim());
        });
        allAppliances.add(recipe.appliance.toLowerCase().trim());
        recipe.ustensils.forEach(utensil => {
            allUtensils.add(utensil.toLowerCase().trim());
        });
    });

    return {
        ingredients: Array.from(allIngredients),
        appliances: Array.from(allAppliances),
        utensils: Array.from(allUtensils)
    };
}

function populateDropdowns(data) {
    const ingredientsList = document.getElementById('ingredientsList');
    const appliancesList = document.getElementById('appareilsList');
    const utensilsList = document.getElementById('ustensilesList');

    ingredientsList.innerHTML = ''; // Clear previous items
    appliancesList.innerHTML = ''; // Clear previous items
    utensilsList.innerHTML = ''; // Clear previous items

    data.ingredients.forEach(item => {
        ingredientsList.innerHTML += `<a href="#" class="dropdown-item ingredient-item">${item}</a>`;
    });

    data.appliances.forEach(item => {
        appliancesList.innerHTML += `<a href="#" class="dropdown-item appliance-item">${item}</a>`;
    });

    data.utensils.forEach(item => {
        utensilsList.innerHTML += `<a href="#" class="dropdown-item utensil-item">${item}</a>`;
    });
     // Réattacher les événements après la mise à jour de la liste
     addDropdownEventListeners();
}

// Mise à jour des dropdowns en fonction des résultats filtrés
function updateDropdownsWithFilteredResults(results) {
    const filteredIngredients = new Set();
    const filteredAppliances = new Set();
    const filteredUtensils = new Set();

    // Parcourt les résultats filtrés et met à jour les sets
    results.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            filteredIngredients.add(ingredient.ingredient.toLowerCase().trim());
        });
        filteredAppliances.add(recipe.appliance.toLowerCase().trim());
        recipe.ustensils.forEach(utensil => {
            filteredUtensils.add(utensil.toLowerCase().trim());
        });
    });

    // Mise à jour des dropdowns avec les résultats filtrés
    populateDropdowns({
        ingredients: Array.from(filteredIngredients),
        appliances: Array.from(filteredAppliances),
        utensils: Array.from(filteredUtensils)
    });
}

// Met à jour les filtres sélectionnés et réactualise les dropdowns
function updateSelectedFilters(type, value) {
    const container = document.querySelector('.selected-filters');
    
    // Vérifie si un badge pour ce filtre existe déjà
    if (document.querySelector(`.filter-badge[data-value="${value}"]`)) return;

    // Crée un élément de badge pour l'élément sélectionné
    const filterBadge = document.createElement('div');
    filterBadge.classList.add('filter-badge');
    filterBadge.setAttribute('data-value', value); // Ajout de la valeur pour référence future
    filterBadge.innerHTML = `${value} <button class="remove-filter" data-type="${type}" data-value="${value}">x</button>`;

    // Ajoute le badge au conteneur
    container.appendChild(filterBadge);

    // Ajoute un écouteur pour la suppression du filtre
    filterBadge.querySelector('.remove-filter').addEventListener('click', (event) => {
        const button = event.target;
        const filterType = button.getAttribute('data-type');
        const filterValue = button.getAttribute('data-value');

        // Retire le badge
        filterBadge.remove();

        // Met à jour la liste des filtres
        if (filterType === 'ingredient') {
            selectedIngredients = selectedIngredients.filter(ing => ing !== filterValue);
        } else if (filterType === 'appliance') {
            selectedAppliances = selectedAppliances.filter(app => app !== filterValue);
        } else if (filterType === 'utensil') {
            selectedUtensils = selectedUtensils.filter(ust => ust !== filterValue);
        }

        // Mets à jour les résultats de la recherche et les dropdowns
        const finalResults = handleSearchUpdate();
        updateDropdownsWithFilteredResults(finalResults);
    });

    // Mise à jour des listes de sélection
    if (type === 'ingredient') {
        selectedIngredients.push(value);
    } else if (type === 'appliance') {
        selectedAppliances.push(value);
    } else if (type === 'utensil') {
        selectedUtensils.push(value);
    }

    // Mets à jour les résultats de la recherche et les dropdowns
    const finalResults = handleSearchUpdate();
    updateDropdownsWithFilteredResults(finalResults);
}

function addDropdownEventListeners() {
    // Pour les ingrédients
    document.querySelectorAll('.ingredient-item').forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const value = this.textContent.trim();

            // Mise à jour des filtres et de la liste sélectionnée
            document.getElementById('searchIngredient').value = value; // Mise à jour du champ de recherche
            updateSelectedFilters('ingredient', value); // Mise à jour des filtres affichés

            // Met à jour les résultats des recettes après la sélection
            handleSearchUpdate();
        });
    });

    // Pour les appareils
    document.querySelectorAll('.appliance-item').forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const value = this.textContent.trim();

            // Mise à jour des filtres et de la liste sélectionnée
            document.getElementById('searchAppareils').value = value; // Mise à jour du champ de recherche
            updateSelectedFilters('appliance', value); // Mise à jour des filtres affichés

            // Met à jour les résultats des recettes après la sélection
            handleSearchUpdate();
        });
    });

    // Pour les ustensiles
    document.querySelectorAll('.utensil-item').forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const value = this.textContent.trim();

            // Mise à jour des filtres et de la liste sélectionnée
            document.getElementById('searchUstensiles').value = value; // Mise à jour du champ de recherche
            updateSelectedFilters('utensil', value); // Mise à jour des filtres affichés

            // Met à jour les résultats des recettes après la sélection
            handleSearchUpdate();
        });
    });
}

function filterDropdownList(inputId, listId) {
    const input = document.getElementById(inputId);
    const filter = input.value.toLowerCase();
    const listItems = document.querySelectorAll(`#${listId} a`);

    listItems.forEach(item => {
        const textValue = item.textContent || item.innerText;
        if (textValue.toLowerCase().includes(filter)) {
            item.style.display = ""; // Afficher les éléments correspondants
        } else {
            item.style.display = "none"; // Masquer les éléments non correspondants
        }
    });
}

function addSearchEventListeners() {
    // Filtrer la liste des ingrédients
    document.getElementById('searchIngredient').addEventListener('input', function() {
        filterDropdownList('searchIngredient', 'ingredientsList');
    });

    // Filtrer la liste des appareils
    document.getElementById('searchAppareils').addEventListener('input', function() {
        filterDropdownList('searchAppareils', 'appareilsList');
    });

    // Filtrer la liste des ustensiles
    document.getElementById('searchUstensiles').addEventListener('input', function() {
        filterDropdownList('searchUstensiles', 'ustensilesList');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const data = extractUniqueItems();
    populateDropdowns(data);
    addDropdownEventListeners();
    addSearchEventListeners(); // Ajoute les événements pour la recherche dans les dropdowns
});

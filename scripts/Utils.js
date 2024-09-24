document.addEventListener('DOMContentLoaded', () => {
    const dropdownButtons = document.querySelectorAll('.filter-btn');

    dropdownButtons.forEach(button => {
        const dropdownMenu = button.nextElementSibling;
        const svgArrow = button.querySelector('svg');

        button.addEventListener('click', (event) => {
            event.preventDefault();

            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.classList.remove('show');
                }
            });

            dropdownMenu.classList.toggle('show');

            const isExpanded = dropdownMenu.classList.contains('show');
            button.setAttribute('aria-expanded', isExpanded);
            
            svgArrow.style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
        });

        document.addEventListener('click', (event) => {
            if (!button.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.remove('show');
                svgArrow.style.transform = 'rotate(0deg)';
            }
        });
    });

/**
 * Gère la visibilité et l'action des boutons de suppression (croix) pour les champs de recherche
 * @param {string} inputId - L'ID de l'input à surveiller
 * @param {string} clearButtonClass - La classe CSS de la croix à afficher
 * @param {string} listId - L'ID de la liste associée à mettre à jour
 */
 
    function handleClearButton(inputId, clearButtonClass, listId) {
        const inputElement = document.getElementById(inputId);
        const clearButton = inputElement?.nextElementSibling?.querySelector(clearButtonClass);
    
        if (inputElement && clearButton) {
            // Affiche ou masque la croix selon le contenu de l'input
            inputElement.addEventListener('input', function() {
                clearButton.style.display = inputElement.value ? 'block' : 'none';
            });
    
            // Gère le clic sur la croix pour vider l'input et réinitialiser la liste
            clearButton.addEventListener('click', function() {
                inputElement.value = ''; // Vider le champ de recherche
                clearButton.style.display = 'none'; // Masquer la croix
    
                // Si vous avez une logique pour mettre à jour la liste associée
                filterDropdownList(inputId, listId);  // Mettre à jour la liste après suppression
            });
        }
        
    }
    handleClearButton('searchIngredient', '.svgCroix2', 'ingredientsList');
    handleClearButton('searchAppareils', '.svgCroix2', 'appareilsList');
    handleClearButton('searchUstensiles', '.svgCroix2', 'ustensilesList');


// Événement pour vider l'input de la recherche principale avec la croix .svgCroix
const mainSearchInput = document.getElementById('input_main');
const mainClearButton = document.querySelector('.svgCroix');

if (mainSearchInput && mainClearButton) {
    mainSearchInput.addEventListener('input', function() {
        mainClearButton.style.display = mainSearchInput.value ? 'block' : 'none';
    });

    mainClearButton.addEventListener('click', function() {
        mainSearchInput.value = '';
        mainClearButton.style.display = 'none';
        handleSearchUpdate();  // Mets à jour la recherche principale après la suppression
    });
}
});
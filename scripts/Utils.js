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
});

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
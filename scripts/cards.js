document.addEventListener('DOMContentLoaded', () => {
    displayRecipes();
});

function displayRecipes() {
    const container = document.getElementById('ContainerCards');
    const cardFactory = new RecipeCardFactory();
    recipes.forEach(recipe => {
        const cardHtml = cardFactory.createCard(recipe);
        container.innerHTML += cardHtml;
    });
}

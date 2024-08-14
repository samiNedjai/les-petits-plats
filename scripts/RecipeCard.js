class RecipeCard {
    constructor(recipe) {
        this.recipe = recipe;
    }

    // Méthode pour créer le HTML pour les ingrédients divisés en deux colonnes
    getIngredientsHtml() {
        const ingredients = this.recipe.ingredients;
        const halfwayThrough = Math.ceil(ingredients.length / 2);
        const firstColumn = ingredients.slice(0, halfwayThrough);
        const secondColumn = ingredients.slice(halfwayThrough);

        const createColumnHtml = (items) => items.map(ing =>
            `<div>${ing.ingredient}: ${ing.quantity || ''} ${ing.unit || ''}</div>`
        ).join('');

        return `
            <div class="row">
                <div class="col">${createColumnHtml(firstColumn)}</div>
                <div class="col">${createColumnHtml(secondColumn)}</div>
            </div>
        `;
    }

    // Méthode pour générer la structure HTML de la carte
    generateCardHtml() {
        return `
            <div class="col-md-4 mb-4">
                <div class="card recipe-card">
                    <img src="${this.recipe.image}" class="card-img-top" alt="${this.recipe.name}">
                    <div class="card-body">
                        <div class="recipe-time badge bg-warning text-dark">${this.recipe.time}min</div>
                        <h5 class="card-title">${this.recipe.name}</h5>
                        <p class="card-text">${this.recipe.description}</p>
                        <div class="ingredients">
                            <h6>Ingrédients</h6>
                            ${this.getIngredientsHtml()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

class RecipeCardFactory {
    createCard(recipe) {
        const card = new RecipeCard(recipe);
        return card.generateCardHtml();
    }
}

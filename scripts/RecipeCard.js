
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

    const createColumnHtml = (items) =>
      items
        .map(
          (ing) =>
            `
               <h6> ${ing.ingredient}</h6> 
                <p>${ing.quantity || ""} ${ing.unit || ""}</p>
          `
        )
        .join("");

    return `
            
                <div class="col">${createColumnHtml(firstColumn)}</div>
                <div class="col">${createColumnHtml(secondColumn)}</div>
            
        `;
  }

  // Méthode pour générer la structure HTML de la carte
  generateCardHtml() {
    return `
        <article class="col-mb-4">
                <div class="card">
                    <img src="./assets/Photos-les-petits-plats/${this.recipe.image}"  alt="${this.recipe.name}">
                    <span class="span_min">${this.recipe.time}min</span>
                    <div class="card-body" >
                        <h5 class="card-title">${this.recipe.name}</h5>
                        <h6>RECETTE</h6>
                        <p class="card-text">${this.recipe.description}</p>
                        <h6>INGREDIENTS</h6>
                        <div class="Container_ingredient">
                            ${this.getIngredientsHtml()}
                        </div>
                    </div>
                    
                </div>
        </article>
        `;
  }
}

class RecipeCardFactory {
  createCard(recipe) {
    const card = new RecipeCard(recipe);
    return card.generateCardHtml();
  }
}

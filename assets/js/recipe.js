// Recipe class constructor
class Recipe {
  constructor(id, title, steps, ingredients, imgUrl, summary, time) {
    this.id = id;
    this.title = title;
    this.steps = steps;
    this.ingredients = ingredients;
    this.imgUrl = imgUrl;
    this.summary = summary;
    this.time = time;
  }

  printRecipeData(recipe) {
    // Create div to make a card for each recipe
    let recipeCard = $("<div>");
    // Add image to the card
    let cardImg = $("<div>");
    cardImg
      .css("background-image", "url(" + this.imgUrl + ")")
      .addClass("card-img");
    // Create card-text div
    let cardText = $("<div>");
    cardText.attr("id", `${this.id}`).addClass("card-text");
    cardText.data(`${this.id}`, recipe);
    // Add Recipe Title to Card
    let cardTitle = $("<div>")
      .data(`${this.id}`, this)
      .addClass("card-title")
      .text(this.title);
    // Create buttons for card
    let saveBtn = $("<button>")
      .addClass("recipe-btn save-btn")
      .text("Save Recipe");
    let infoBtn = $("<button>")
      .addClass("recipe-btn info-btn")
      .attr({
        "data-bs-toggle": "modal",
        "data-bs-target": "#recipe-modal",
        type: "button",
      })
      .text("Recipe Info");
    // Append Recipe Title and Buttons to cardTitle Div
    cardText.append(cardTitle, saveBtn, infoBtn);

    recipeCard.addClass("recipe-card").append(cardImg).append(cardText);

    recipeContainer.append(recipeCard);
  }
}

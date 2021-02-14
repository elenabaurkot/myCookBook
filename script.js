// Global Variables
var userSearch = $("#drink-search");
var searchButton = $("#search-button");
let recipeContainer = $("#recipe-return");

// Recipe class constructor
function Recipe(id, title, steps, ingredients, imgUrl, summary, time) {
  this.id = id;
  this.title = title;
  this.steps = steps;
  this.ingredients = ingredients;
  this.imgUrl = imgUrl;
  this.summary = summary;
  this.time = time;
}

//
Recipe.prototype.printRecipeData = function (recipe) {
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
  cardText.data(`${this.title}`, recipe);
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
    .text("Recipe Info");
  // Append Recipe Title and Buttons to cardTitle Div
  cardText.append(cardTitle, saveBtn, infoBtn);

  recipeCard.addClass("recipe-card").append(cardImg).append(cardText);

  recipeContainer.append(recipeCard);
  // rSteps.forEach((recipeStep) => console.log(recipeStep.step));
  // rIngred.forEach((ingredient) => console.log(ingredient.originalString));
};

// Loop through results
const getRecipeData = function (dataArr) {
  for (let i = 0; i < dataArr.length; i++) {
    // create new recipe instance for all returned results
    let recipe = new Recipe(
      dataArr[i].id,
      dataArr[i].title,
      dataArr[i].analyzedInstructions[0].steps,
      dataArr[i].missedIngredients,
      dataArr[i].image,
      dataArr[i].summary,
      dataArr[i].readyInMinutes
    );

    // print recipes to page
    recipe.printRecipeData(recipe);
  }
};

// Recipe Search with API Call
const getRecipes = function (event) {
  event.preventDefault();
  // Get user input
  let searchTerm = userSearch.val();

  // query url
  let queryURL = `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&fillIngredients=true&addRecipeInformation=true&apiKey=fb8f9820c9b74cf1ac411198c8a4e4a0&number=50`;

  fetch(queryURL)
    .then((response) => response.json())
    .then(({ results }) => {
      console.log(results);
      getRecipeData(results);
    });
};

const infoClick = function (event) {
  alert("get info");
  let id = $(event.target).parent().attr("id");
  console.log(id);
  // To Do
  // Make modal that pops up with clicked recipe info
  // Should have recipe time, instructions, ingredients, maybe pic too?
};

const saveRecipe = function (event) {
  alert("save this recipe!");
  let id = $(event.target).parent().attr("id");
  // console.log(id);
  console.log($(`#${id}`).data());
  // Need some database for this part to actually save to your cookbook
};

const buttonClicks = function (event) {
  event.preventDefault();
  if (event.target.matches(".info-btn")) {
    infoClick(event);
  }

  if (event.target.matches(".save-btn")) {
    saveRecipe(event);
  }
};

// Event handlers
searchButton.on("click", getRecipes);
recipeContainer.on("click", buttonClicks);

// Global Variables
const userSearch = $("#drink-search");
const searchButton = $("#search-button");
const recipeContainer = $("#recipe-return");

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
  // get id from parent div of button to access recipe object
  let recipeId = $(event.target).parent().attr("id");
  let recipeData = $(`#${recipeId}`).data();
  let { title, steps, ingredients, imgUrl, summary, time } = recipeData[
    recipeId
  ];

  console.log(recipeData);
  // set modal info to recipe object data
  $(".modal-title").text(title);
  $(".modal-body").html(
    `<p>${summary}</p>
     <img src="${imgUrl}" alt="${title}-image">
     <ul>Ingredients:
      ${ingredients.map((ingredient) => `<li>${ingredient.name}</li>`).join("")}
     </ul>
     <ol>Steps:
      ${steps.map((step) => `<li>${step.step}</li>`).join("")}
     </ol>
     <p>Time to make: ${time}</p>
    `
  );
  // To Do
  // Make modal that pops up with clicked recipe info
  // Should have recipe time, instructions, ingredients, maybe pic too?
};

const saveRecipe = function (event) {
  let id = $(event.target).parent().attr("id");
  let recipeData = $(`#${id}`).data();

  localStorage.setItem(id, JSON.stringify(recipeData));
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

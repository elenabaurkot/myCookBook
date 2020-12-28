// Global Variables
var userSearch = $("#drink-search");
var searchButton = $("#search-button");
let recipeContainer = $("#recipe-return");

// function to get drink user searched for
function getDrinkRecipe(event) {
  event.preventDefault();

  let drinkSearched = userSearch.val();
  let queryURL =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkSearched;

  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      // Stores array of returned drinks in drinks variable
      console.log(data);
      let drinks = data.drinks;

      drinks.forEach((drink) => {
        let drinkName = $("<p>").text(drink.strDrink);
        let instructions = drink.strInstructions;
        let recipeDiv = $("<div>");

        drinkName.addClass("drinkName");

        recipeDiv
          .addClass("recipeDiv")
          .append(drinkName)
          .append(instructions)
          .append("Drink Ingredients: ");

        // Get drink ingredients
        for (let i = 1; i < 15; i++) {
          let ingredient = drink["strIngredient" + i];
          if (ingredient != null) {
            recipeDiv.append(ingredient);
          }
        }
        recipeContainer.append(recipeDiv);
      });
    });
}

const printRecipeData = function (rTitle, rSteps, rIngred, rImg, rSum, rTime) {
  let recTitle = rTitle;
  let steps = rSteps;
  let ingredients = rIngred;
  let recipeImage = rImg;
  let summary = rSum;
  let time = rTime;

  let recipeName = $("<p>");
  recipeName.text(recTitle).addClass("recipe-name");
  // recipeContainer.appendChild(recipeName);

  let recipeDiv = $("<div>");
  recipeDiv.addClass("recipe-div").append(recipeName);

  recipeContainer.append(recipeDiv);
  // .append(drinkName)
  // .append(instructions)
  // .append("Drink Ingredients: ");

  // rSteps.forEach((recipeStep) => console.log(recipeStep.step));
  // rIngred.forEach((ingredient) => console.log(ingredient.originalString));

  console.log(`TITLE = ${recTitle}`);
  console.log(`STEPS = \n ${steps}`);
  console.log(`INGREDIENTS = \n ${ingredients}`);
  console.log(`IMAGEURL = ${recipeImage}`);
  console.log(`SUMMARY = ${summary}`);
  console.log(`Time = ${time}`);
};

// Loop through results
// Get the description, ingredients and instructions
// Print them to the page
const getRecipeData = function (dataArr) {
  for (let i = 0; i < dataArr.length; i++) {
    let title = dataArr[i].title;
    let steps = dataArr[i].analyzedInstructions[0].steps;
    let ingredients = dataArr[i].missedIngredients;
    let imageURL = dataArr[i].image;
    let summary = dataArr[i].summary;
    let time = dataArr[i].readyInMinutes;

    printRecipeData(title, steps, ingredients, imageURL, summary, time);
  }
};

const getRecipes = function (event) {
  event.preventDefault();

  // Get user input
  let searchTerm = userSearch.val();
  // console.log(searchTerm);

  // query url
  let queryURL = `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&fillIngredients=true&addRecipeInformation=true&apiKey=fb8f9820c9b74cf1ac411198c8a4e4a0&number=50`;

  fetch(queryURL)
    .then((response) => response.json())
    .then(({ results }) => {
      console.log(results);
      getRecipeData(results);
    });
};

// Click events
searchButton.on("click", getRecipes);

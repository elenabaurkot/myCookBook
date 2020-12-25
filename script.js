// Global Variables
var userSearch = document.getElementById("drink-search");
var searchButton = document.getElementById("search-button");
let recipeContainer = document.getElementById("recipe-return");

// function to get drink user searched for
function getDrinkRecipe(event) {
  event.preventDefault();

  let drinkSearched = userSearch.value;
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

const printRecipeData = function (rTitle, rSteps, rIngred, rImg, rSum) {
  let recTitle = rTitle;
  let steps = rSteps.forEach((recipeStep) => console.log(recipeStep.step));
  let ingredients = rIngred.forEach((ingredient) =>
    console.log(ingredient.originalString)
  );
  let recipeImage = rImg;
  let summary = rSum;

  console.log(`TITLE = ${recTitle}`);
  console.log(`STEPS = \n ${steps}`);
  console.log(`INGREDIENTS = \n ${ingredients}`);
  console.log(`IMAGEURL = ${recipeImage}`);
  console.log(`SUMMARY = ${summary}`);
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

    printRecipeData(title, steps, ingredients, imageURL, summary);
  }
};

const getRecipes = function (event) {
  event.preventDefault();

  // Get user input
  let searchTerm = userSearch.value;
  // console.log(searchTerm);

  // query url
  let queryURL = `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&fillIngredients=true&addRecipeInformation=true&apiKey=fb8f9820c9b74cf1ac411198c8a4e4a0&number=5`;

  fetch(queryURL)
    .then((response) => response.json())
    .then(({ results }) => {
      // console.log(results);
      getRecipeData(results);
    });
};

// Click events
searchButton.addEventListener("click", getRecipes);

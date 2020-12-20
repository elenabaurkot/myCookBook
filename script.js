// Global Variables
var drinkInput = $("#drink-search");
var searchButton = $("#search-button");
let recipeContainer = $("#recipe-return");

// function to get drink user searched for
function getDrinkRecipe(event) {
  event.preventDefault();

  let drinkSearched = drinkInput.val();
  let queryURL =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkSearched;

  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      // Stores array of returned drinks in drinks variable
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

function getFoodRecipe() {
  let queryURL =
    "https://api.edamam.com/search?q=spaghetti&app_id=4db3d7fd&app_key=3475be3b40eea6987b6f909f7c1ff553";

  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

getFoodRecipe();

// Click events
searchButton.on("click", getDrinkRecipe);

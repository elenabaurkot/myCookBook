// Global Variables
var drinkInput = $('#drink-search');
var searchButton = $('#search-button');
let recipeContainer = $('#recipe-return');

// function to get drink user searched for
function getDrinkRecipe() {
  let drinkSearched = drinkInput.val();
  let queryURL =
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drinkSearched;

  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      // Stores array of returned drinks in drinks variable
      let drinks = data.drinks;

      drinks.forEach((drink) => {
        let drinkName = $('<p>').text(drink.strDrink);
        let instructions = drink.strInstructions;
        let recipeDiv = $('<div>');

        drinkName.addClass('drinkName');

        recipeDiv
          .addClass('recipeDiv')
          .append(drinkName)
          .append(instructions)
          .append('Drink Ingredients: ');

        // Get drink ingredients
        for (let i = 1; i < 15; i++) {
          let ingredient = drink['strIngredient' + i];
          if (ingredient != null) {
            recipeDiv.append(ingredient);
          }
        }
        recipeContainer.append(recipeDiv);
      });
    });
}

// Click events
searchButton.on('click', getDrinkRecipe);

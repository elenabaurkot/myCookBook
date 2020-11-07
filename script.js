// Global Variables
var drinkInput = $('#drink-search');
var searchButton = $('#search-button');

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
        let drinkName = drink.strDrink;
        let instructions = drink.strInstructions;
        $('<div>')
          .addClass('recipeDiv')
          .append(drinkName, instructions)
          .appendTo($('#recipe-return'));

        console.log(drink);
        // Get drink name and instructions for making
        console.log(`Drink name: ${drink.strDrink}`);
        console.log(`Instructions: ${drink.strInstructions}`);
        // Get drink ingredients
        console.log('Drink ingredients: ');
        for (let i = 1; i < 15; i++) {
          let ingredient = drink['strIngredient' + i];
          if (ingredient != null) {
            console.log(ingredient);
          }
        }
      });
    });
}

// Click events
searchButton.on('click', getDrinkRecipe);

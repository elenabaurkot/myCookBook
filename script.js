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
        console.log(drink);
        console.log(drink.strDrink);
        for (let i = 1; i < 15; i++) {
          console.log(drink['strIngredient' + i]);
        }
      });
    });
}

// Click events
searchButton.on('click', getDrinkRecipe);

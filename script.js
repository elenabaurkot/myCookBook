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
    .then((data) => console.log(data));
}

// Click events
searchButton.on('click', getDrinkRecipe);

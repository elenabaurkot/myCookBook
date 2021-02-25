// Global Variables
const userSearch = $("#drink-search");
const searchButton = $("#search-button");
const recipeContainer = $("#recipe-return");

// Loop through results
const getRecipeData = (dataArr) => {
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
const getRecipes = (event) => {
  event.preventDefault();

  // Clear previous searches
  recipeContainer.empty();
  // Get user input
  let searchTerm = userSearch.val();

  // query url
  let queryURL = `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&fillIngredients=true&addRecipeInformation=true&apiKey=fb8f9820c9b74cf1ac411198c8a4e4a0&number=50`;

  fetch(queryURL)
    .then((response) => response.json())
    .then(({ results }) => {
      console.log(results);
      // clear search
      searchTerm = "";
      getRecipeData(results);
    });
};

const infoClick = (event) => {
  // get id from parent div of button to access recipe object
  let recipeId = $(event.target).parent().attr("id");
  let recipeData = $(`#${recipeId}`).data();
  let { title, steps, ingredients, imgUrl, summary, time } = recipeData[
    recipeId
  ];

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
};

const saveRecipe = (event) => {
  let id = $(event.target).parent().attr("id");
  let recipeData = $(`#${id}`).data();

  localStorage.setItem(id, JSON.stringify(recipeData));
  // Need some database for this part to actually save to your cookbook
};

const buttonClicks = (event) => {
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

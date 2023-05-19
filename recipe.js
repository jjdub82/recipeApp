const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('recipeId');
const app_id = 'a3d1dcf8'
const app_key = 'b638b6abb916f1a4882edc001a786986'
const recipeContainer = document.getElementById('recipeContainer');

recipe: {
  ingredientLines: []
}
;



console.log(recipeId)
  
const apiUrl = `https://api.edamam.com/api/recipes/v2/${recipeId}?type=public&app_id=${app_id}&app_key=${app_key}`;
console.log(apiUrl)
  
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {

    // Process the recipe data here
  
    // console.log(data);
    const recipe = data.recipe
    console.log(recipe)

    //create the div
    const item = document.createElement('div');
    item.className = ' item p-5 mx-3 container-fluid';
    item.style.outline = '1px solid lightgray; border-radius: 10px';
    recipeContainer.appendChild(item);

    //  // Create the row
    //  const row = document.createElement('div');
    //  row.className = 'row';

    const row1 =document.createElement('div')
    row1.className = 'row';
    
    const row2 = document.createElement('div')
    row2.className = 'row mt-3'
    

    const col1 =document.createElement('div')
    col1.className = 'col-md-6';
    col1.style.outline = '1px solid lightgray';
    

    const col2 =document.createElement('div')
    col2.className = 'col-md-4';
    col2.style.outline = '1px solid lightgray';
   
  
     const img = document.createElement('img');
        img.src = recipe.image;
        img.alt = 'recipe image';
        img.style.width = '200px'; // Set the desired width
        img.style.height = '150px'; // Set the desired height
        col1.appendChild(img);

      const recipeLabel = document.createElement('h1');
      recipeLabel.className = 'display-1 recipe-label';
      recipeLabel.textContent = recipe.label
      col1.appendChild(recipeLabel);

 

      const yield = document.createElement('p');
      yield.className = 'item-data';
      yield.textContent = 'Yields '+ recipe.yield + ' servings'
      col2.appendChild(yield);

      const calories = document.createElement('p');
      calories.className = 'item-data';
      calories.textContent = `Calories: ${Math.round(recipe.calories / recipe.yield)}` + ' per serving'
      col2.appendChild(calories);

      const mealType = document.createElement('p');
      mealType.className = 'item-data';
      mealType.textContent = recipe.mealType;
      col2.appendChild(mealType);

      const cuisineType = document.createElement('p');
      cuisineType.className = 'item-data';
      cuisineType.textContent = recipe.cuisineType;
      col2.appendChild(cuisineType)



      const dietLabels = document.createElement('p');
      dietLabels.className = 'item-data';
      dietLabels.textContent = recipe.dietLabels;
      col2.appendChild(dietLabels);

      const health = document.createElement('p');
      health.className = 'item-data';
      health.textContent = recipe.healthLabels;
      col2.appendChild(health)

      const recipeLink = document.createElement('a');
      recipeLink.className = 'btn btn-success btn-lg';
      recipeLink.textContent = 'Link to Recipe';
      recipeLink.href = recipe.url;
      col2.appendChild(recipeLink);


      const recipeURI = document.createElement('p');
      recipeURI.className = 'recipe-uri'
      recipeURI.style.display = 'none';
      col2.appendChild(recipeURI);

      const ingredeientHeading = document.createElement('h1');
      ingredeientHeading.className = 'display-3';
      ingredeientHeading.textContent = 'Ingredients';
      row2.appendChild(ingredeientHeading);

      // const indgredients = document.createElement('p');
      // indgredients.className = 'item-data mt-3';
      // indgredients.textContent = recipe.ingredientLines;
      // row2.appendChild(indgredients);
      
      const ingredientLines = recipe.ingredientLines;
      if (ingredientLines.length > 0) {
        ingredientLines.forEach(item => {
        const lineElement = document.createElement('p');
        lineElement.className ='item-data mt-2 pt-2'
        lineElement.textContent = item;
        row2.appendChild(lineElement);
        });
      } else {
        const emptyElement = document.createElement('p');
        emptyElement.textContent = 'No ingredients found.';
        row2.appendChild(emptyElement);
      }
      const macroHeader = document.createElement('h1');
      macroHeader.className = 'display-3 mt-3';
      macroHeader.textContent = 'Macros';
      row2.appendChild(macroHeader);

      const digest = recipe.digest.filter(item => {
        // Specify the conditions to include the elements
        // For example, let's include only the elements with labels "Fat" and "Carbs"
        return item.label === "Fat" || item.label === "Carbs" || item.label === "Protein";
      });
  
      digest.forEach(item => {
        const p = document.createElement("p");
        p.className = "item-data mt-2 pt-2";
        const totalPerServing = Math.round(item.total / recipe.yield);
        p.textContent = `${item.label}: ${totalPerServing}`;
        row2.appendChild(p);
      });
      
    
      


    row1.appendChild(col1);
    row1.appendChild(col2);

    item.appendChild(row1);
    item.appendChild(row2);

  })
  .catch(error => {
    console.error('Error:', error);
  });



  
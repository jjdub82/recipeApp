document.addEventListener('DOMContentLoaded', (event) => {
const urlParams = new URLSearchParams(window.location.search);
const qText = urlParams.get('q');
console.log(qText)


const searchInput = document.getElementById('searchText');
const searchBtn = document.getElementById('submitBtn');
const searchResult = document.getElementById('searchResults');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentPage = 2;
const resultsPerPage = 12;
const from = currentPage +1 * resultsPerPage;
const to = from + resultsPerPage;
const app_id = 'a3d1dcf8';
const app_key = 'b638b6abb916f1a4882edc001a786986';
let nextPageUrl = '';
// const mainContainer = getElementById('mainContent');



    // https://api.edamam.com/api/recipes/v2?type=any&q=Chicken&app_id=a3d1dcf8&app_key=b638b6abb916f1a4882edc001a786986

const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${qText}&app_id=${app_id}&app_key=${app_key}&from=${from}&to=${to}`;







        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            
               
                searchResult.innerHTML = ''; // clear previous results
                

  
               


                data.hits.forEach(hit => {
                    const recipe = hit.recipe;

                    const item = document.createElement('div');
                        item.className = ' item p-5 mx-3';
                        item.style.outline = '1px solid lightgray; border-radius: 10px';

                        const flex = document.createElement('div');
                        flex.className = 'flex-wrapper';


                        // Create the row
                        const row = document.createElement('div');
                        row.className = 'row';


                        // Create the first column
                        const column1 = document.createElement('div');
                        column1.className = 'col';

                        const img = document.createElement('img');
                        img.src = recipe.image;
                        img.alt = 'recipe image';
                        img.style.width = '200px'; // Set the desired width
                        img.style.height = '150px'; // Set the desired height
                        column1.appendChild(img);

                        const h1 = document.createElement('h1');
                        h1.className = 'title';
                        h1.textContent = recipe.label;
                        column1.appendChild(h1);

                        const a = document.createElement('a');
                        a.className = 'view-button';
                        a.href = recipe.url;
                        a.textContent = 'Link to Full Recipe';
                        column1.appendChild(a);

                        const p = document.createElement('p');
                        p.className = 'item-data';
                        p.textContent = `Calories: ${Math.round(recipe.calories / recipe.yield)}`;
                        column1.appendChild(p);

                        const dishtype = document.createElement('p');
                        dishtype.className = 'item-data';
                        dishtype.textContent = recipe.dishType.join(', ');
                        column1.appendChild(dishtype);

                        const cuisineType = document.createElement('p');
                        cuisineType.className = 'item-data';
                        cuisineType.textContent = 'Cuisine' + ' ' + recipe.cuisineType.join(', ');
                        column1.appendChild(cuisineType);

                        const yield = document.createElement('p');
                        yield.className = 'item-data yield';
                        yield.textContent = 'Serves' + ' ' + recipe.yield;
                        column1.appendChild(yield);

                        // Append the first column to the item div
                        item.appendChild(column1);

                        // Create the second column
                        const column2 = document.createElement('div');
                        column2.className = 'col-md-6';

                        const detailsButton = document.createElement('button');
                        detailsButton.className = 'details-button';
                        detailsButton.textContent = 'View Details';
                        // column2.appendChild(detailsButton);

                        const dietLabels = document.createElement('p');
                        dietLabels.className = 'item-data';
                        dietLabels.textContent = recipe.dietLabels;
                        column2.appendChild(dietLabels);

                        const recipeData = JSON.stringify(recipe);
                        const encodedRecipeData = encodeURIComponent(recipeData);
                        const url = `detail.html?recipeId=${encodeURIComponent(recipe.uri.split('_')[1])}&recipe_label =${recipe.label}`;
                        const recipeUri = document.createElement('a');
                        recipeUri.className = 'btn btn-primary';
                        recipeUri.textContent = 'Details';
                        recipeUri.href = url;

                        column2.appendChild(recipeUri);


                        // https://api.edamam.com/api/recipes/v2/f4ce5814f10c79bf856f7d40b2bade83?type=public&app_id=a3d1dcf8&app_key=b638b6abb916f1a4882edc001a786986


                        // Append the second column to the item div
                        item.appendChild(column2);

                        // Append the item div to the searchResult
                        searchResult.appendChild(item);

                    

                });
                if (data._links && data._links.next) {
                    nextPageUrl = data._links.next.href;
                    console.log('next page url in fetchRecipes is ' + nextPageUrl);
                }



            })
            
                    
            .catch(error => console.error('Error:', error));

           
    

    const fetchNext = () => {
        console.log('fetchNext called');
        fetch(nextPageUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                searchResult.innerHTML = '';
                // ... your existing code to handle each hit ...
                data.hits.forEach(hit => {
                    const recipe = hit.recipe;

                    const item = document.createElement('div');
                        item.className = ' item p-5 mx-3';
                        item.style.outline = '1px solid lightgray; border-radius: 10px';

                        const flex = document.createElement('div');
                        flex.className = 'flex-wrapper';


                        // Create the row
                        const row = document.createElement('div');
                        row.className = 'row';


                        // Create the first column
                        const column1 = document.createElement('div');
                        column1.className = 'col';

                        const img = document.createElement('img');
                        img.src = recipe.image;
                        img.alt = 'recipe image';
                        img.style.width = '200px'; // Set the desired width
                        img.style.height = '150px'; // Set the desired height
                        column1.appendChild(img);

                        const h1 = document.createElement('h1');
                        h1.className = 'title';
                        h1.textContent = recipe.label;
                        column1.appendChild(h1);

                        const a = document.createElement('a');
                        a.className = 'view-button';
                        a.href = recipe.url;
                        a.textContent = 'View Recipe';
                        column1.appendChild(a);

                        const p = document.createElement('p');
                        p.className = 'item-data';
                        p.textContent = `Calories: ${Math.round(recipe.calories / recipe.yield)}`;
                        column1.appendChild(p);

                        const dishtype = document.createElement('p');
                        dishtype.className = 'item-data';
                        dishtype.textContent = recipe.dishType.join(', ');
                        column1.appendChild(dishtype);

                        const cuisineType = document.createElement('p');
                        cuisineType.className = 'item-data';
                        cuisineType.textContent = 'Cuisine' + ' ' + recipe.cuisineType.join(', ');
                        column1.appendChild(cuisineType);

                        const yield = document.createElement('p');
                        yield.className = 'item-data yield';
                        yield.textContent = 'Serves' + ' ' + recipe.yield;
                        column1.appendChild(yield);

                        // Append the first column to the item div
                        item.appendChild(column1);

                        // Create the second column
                        const column2 = document.createElement('div');
                        column2.className = 'col-md-6';

                        const detailsButton = document.createElement('button');
                        detailsButton.className = 'details-button';
                        detailsButton.textContent = 'View Details';
                        // column2.appendChild(detailsButton);

                        const dietLabels = document.createElement('p');
                        dietLabels.className = 'item-data';
                        dietLabels.textContent = recipe.dietLabels;
                        column2.appendChild(dietLabels);

                        const recipeData = JSON.stringify(recipe);
                        const encodedRecipeData = encodeURIComponent(recipeData);
                        const url = `detail.html?recipeId=${encodeURIComponent(recipe.uri.split('_')[1])}`;
                        const recipeUri = document.createElement('a');
                        recipeUri.className = 'btn btn-primary';
                        recipeUri.textContent = 'Details';
                        recipeUri.href = url;

                        column2.appendChild(recipeUri);


                        // https://api.edamam.com/api/recipes/v2/f4ce5814f10c79bf856f7d40b2bade83?type=public&app_id=a3d1dcf8&app_key=b638b6abb916f1a4882edc001a786986


                        // Append the second column to the item div
                        item.appendChild(column2);

                        // Append the item div to the searchResult
                        searchResult.appendChild(item);

                    

                });

                // save the next page URL
                if (data._links && data._links.next) {
                    nextPageUrl = data._links.next.href;
                    console.log('next page url is ' +nextPageUrl)
                }
            })
            .catch(error => console.error('Error:', error));
    };



    nextBtn.addEventListener('click', (e) => {
        console.log('Next button clicked');
        e.preventDefault();
        currentPage++;
        fetchNext();
    });
});

document.getElementById('navSearchBtn').addEventListener('click', function(){
    let qText = document.getElementById('navSearchTxt').value
    // console.log(qText)
    
    link = `search.html?q=${qText}`
    window.location.href = link
  
  
  
  } )
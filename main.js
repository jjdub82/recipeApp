document.addEventListener('DOMContentLoaded', (event) => {
    const searchInput = document.getElementById('searchText');
    const searchBtn = document.getElementById('submitBtn');
    const searchResult = document.getElementById('searchResults');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const searchText = searchInput.value;
    let currentPage = 0;
    const resultsPerPage = 20; // This can be any number up to the API's limit
    const from = currentPage * resultsPerPage;
    const to = from + resultsPerPage;

    const app_id = 'a3d1dcf8'
    const app_key = 'b638b6abb916f1a4882edc001a786986'

    const fetchRecipes = () => {
        const searchText = searchInput.value;
        const from = currentPage * resultsPerPage;
        const to = from + resultsPerPage;

    if (searchText.length > 2) {
        const url = `https://api.edamam.com/search?q=${searchText}&app_id=${app_id}&app_key=${app_key}&from=${from}&to=${to}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                searchResult.innerHTML = ''; // clear previous results
                data.hits.forEach(hit => {
                    const recipe = hit.recipe;

                    const item = document.createElement('div');
                    item.className = 'item p-5 mx-3';
                    item.style.outline = '1px solid lightgray; border-radius: 10px';

                    const img = document.createElement('img');
                    img.src = recipe.image;
                    img.alt = 'recipe image';
                    item.appendChild(img);

                    const h1 = document.createElement('h1');
                    h1.className = 'title';
                    h1.textContent = recipe.label;
                    item.appendChild(h1);

                    const a = document.createElement('a');
                    a.className = 'view-button';
                    a.href = recipe.url;
                    a.textContent = 'View Recipe';
                    item.appendChild(a);

                    const p = document.createElement('p');
                    p.className = 'item-data';
                    p.textContent = `Calories: ${Math.round(recipe.calories/recipe.yield)}`;
                    item.appendChild(p);

                    const dishtype = document.createElement('p');
                    dishtype.className = 'item-data';
                    dishtype.textContent = recipe.dishType.join(', ');
                    item.appendChild(dishtype);

                    const cuisineType = document.createElement('p');
                    cuisineType.className = 'item-data';
                    cuisineType.textContent = 'Cuisine' +' '+recipe.cuisineType.join(', ');
                    item.appendChild(cuisineType);

                    const details = document.createElement('a');
                    details.className = 'view-button';
                    details.href = `detail.html?recipe=${encodeURIComponent(JSON.stringify(recipe))}`;
                    details.textContent = 'View Details';
                    item.appendChild(details);
        

                    const yield = document.createElement('p');
                    yield.className = 'item-data';
                    yield.textContent = 'Serves' +' '+ recipe.yield;
                    item.appendChild(yield)

                    

                    

                    searchResult.appendChild(item);
                });
            })
            .catch(error => console.error('Error:', error));
    }
    }
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentPage =0;
        fetchRecipes();
    });

    prevBtn.addEventListener('click', (e) => {
        if (currentPage > 0) { // Prevent going to a negative page
            currentPage--;
            fetchRecipes();
        }
    });

    nextBtn.addEventListener('click', (e) => {
        currentPage++;
        fetchRecipes();
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeString = urlParams.get('recipe');
    const recipe = JSON.parse(decodeURIComponent(recipeString));
  
    // Access and use the recipe object's attributes as needed...
  });
  
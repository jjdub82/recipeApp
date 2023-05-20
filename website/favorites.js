

fetch('/all')
    .then(response => response.json())
    .then(data => {
        createFavoriteList(data);
        console.log(data)
    })
    .catch(error => console.error('Error:', error));


function createFavoriteList(favorites){
    const parentElement = document.getElementById('favoriteList');
    const list_group = document.createElement('div')
    list_group.className = 'list-group';
    parentElement.append(list_group)

    const heading = document.createElement('h1')
    heading.className = 'display-1'
    heading.textContent = 'My Favorite Recipes';
    list_group.appendChild(heading)



    for(let favorite of favorites) {
        let title = favorite.title;
        let uri = favorite.uri;

        let link = document.createElement('a');
        link.textContent = title;
        link.style = 'color:white'
        link.href = `detail.html?recipeId=${encodeURIComponent(uri)}`;

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'x';
        deleteBtn.className = 'btn btn-sm btn-danger float-end'
        deleteBtn.onclick = function(){
            deleteFavorite(uri, listItem);
        };

        let listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.appendChild(link);
        listItem.appendChild(deleteBtn);

        list_group.appendChild(listItem);
    }
}

function deleteFavorite(uri, listItem) {
    fetch(`/delete/${encodeURIComponent(uri)}`, {
        method: 'DELETE',
    })
    .then(response => {
        console.log(response);
        if (response.ok) {
            console.log('Item successfully deleted.');
            listItem.remove();
        } else {
            return response.json();
        }
    })
    .then(data => {
        if (data) console.log(data);
    })
    .catch(error => console.error('Error:', error));
}

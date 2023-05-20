const fs = require('fs');
let data = fs.readFileSync('favorites.json')
let favorites = JSON.parse(data)

const express = require('express')
const app = express()

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use(express.static('website'));

app.get('/add/:favtitle/:favuri', addFavorite);

function addFavorite(request,response){
    let data = request.params;

    let favtitle = data.favtitle;
    let favuri = data.favuri;
    console.log('parameters entered are: '+ data.favtitle+ ' and' + data.favuri)

    let newFavorite = { title: favtitle, uri: favuri };
    favorites.push(newFavorite);

    let datastring = JSON.stringify(favorites, null, 2);
    console.log('The Datastring = '+datastring)
    fs.writeFile('favorites.json', datastring, finished);

    function finished(err) {
        console.log('You saved '+favtitle+': '+ favuri +' to your favorites');
    }

    let reply = {
        msg:'You added a favorite'
    }

    response.send(reply)
}

app.get('/all', sendAll);
function sendAll(req, res) {
    res.send(favorites);
}

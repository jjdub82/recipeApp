const fs = require('fs');
let data = fs.readFileSync('favorites.json')
let favorites = JSON.parse(data)

const express = require('express')
const app = express()

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use(express.static('website'));

//add item get request
app.get('/add/:favtitle/:favuri', addFavorite);

//Delete Item Script
app.delete('/delete/:uri', (req,res) => {
    const uriToDelete = req.params.uri;

    fs.readFile('favorites.json', 'utf8', (err, data)=>{
        if (err) {
            console.error(err);
            res.status(500).send('Error reading favorites file');
            return;
        }

        let favorites = JSON.parse(data);
        favorites = favorites.filter(favorite => favorite.uri !== uriToDelete);

        fs.writeFile('favorites.json', JSON.stringify(favorites), (err) =>{
            if (err) {
                console.error(err);
                res.status(500).send('Error writing to favorites file');
                return;
            }
            res.status(200).send('Item has been deleted!');
        });
    });

});

//Add Item Script
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
//Read All Request
app.get('/all', sendAll);
function sendAll(req, res) {
    res.send(favorites);
}

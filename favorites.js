const sqlite3 = require('sqlite3').verbose();

// Open the database connection
const db = new sqlite3.Database('favorites.db');

// Create the favorites table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT,
    uri TEXT
  )
`);

// Insert a favorite recipe
const recipe = {
  label: 'Recipe Label',
  uri: 'Recipe URI'
};

const label = recipe.label;
const uri = recipe.uri;

db.run(
  'INSERT INTO favorites (label, uri) VALUES (?, ?)',
  [label, uri],
  (err) => {
    if (err) {
      console.error('Error inserting favorite recipe:', err);
    } else {
      console.log('Favorite recipe inserted successfully');
    }
  }
);

// Retrieve favorite recipes
db.all('SELECT * FROM favorites', (err, rows) => {
  if (err) {
    console.error('Error retrieving favorite recipes:', err);
  } else {
    console.log(rows);
    // Process the retrieved favorite recipes
  }
});

// Close the database connection when done
db.close();

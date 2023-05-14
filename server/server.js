const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();
const port = 5000;

app.use(bodyParser.json());
// use helmet to secure express
app.use(helmet());

// Define favorites array
let favorites = [];

// Define the route to fetch data from the iTunes API
app.get('/search', async (req, res) => {
  const searchTerm = req.query.term;
  const url = `https://itunes.apple.com/search?term=${searchTerm}`;

  try {
    const response = await axios.get(url);
    const data = await response.data;

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from iTunes API');
  }
});

// Define the route to fetch the favorites array
app.get('/search/favorites', (req, res) => {
  res.json(favorites);
});

// Define the route to add favorite items
app.post('/search/favorites', (req, res) => {
  const item = req.body;
  favorites.push(item);
  res.status(201).json({ message: 'Favorite item added successfully!' });
});

// Define the route to remove favorite items
app.delete('/search/favorites/:id', (req, res) => {
  const id = parseInt(req.params.id);
  favorites = favorites.filter((item) => item.trackId !== id);
  res.json({ message: 'Favorite item removed successfully!' });
});

// start the server
app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});

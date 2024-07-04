const express = require('express'); // Import Express Module
const axios = require('axios'); // Import Axios for making http requests
const app = express(); // Create an instance of express

// set ejs
app.set('view engine', 'ejs'); 
app.use(express.static('public')); // serve static files from the "public directory"

// middleware to parse url-encoded data
app.use(express.urlencoded({ extended: true }));

// define port to listen to
const PORT = process.env.PORT || 3000;

// route for the home page
app.get('/', (req, res) => {
  res.render('index'); // render the index.ejs
});

// route to handle form submission and fetch joke
app.post('/get-joke', async (req, res) => {
  const name = req.body.name; // get the name from the form input
  try {
    // make a GET request to the JokeAPI
    const response = await axios.get('https://v2.jokeapi.dev/joke/Any?type=single');
    const joke = response.data.joke; //extract joke from the response data

    // render the index.ejs template with name and joke
    res.render('index', { name, joke });
  } catch (error) {
    console.error(error); // log any errors
    // render index.ejs with error message if api request fails
    res.render('index', { name, joke: 'Could not retrieve a joke at this time, please try again later.' });
  }
});

// start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

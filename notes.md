Frontend (client side)
- HTML to strucuture the webpage
- CSS for styling the webpage
- Javascript for interactivity

Backend (server side)
- Node.js to handle server logic, routing and processing submissions
- Express.js to handle server logic, routing and processing submissions
- Axios for making http requests to JokeApi to fetch jokes
- EJS to generate html dynamically

1. Create the project structure 
2. Use Express to handle the routes
3. Use EJS for rendering the html page

key steps and break down

const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/get-joke', async (req, res) => {
  const name = req.body.name;
  try {
    const response = await axios.get('https://v2.jokeapi.dev/joke/Any?type=single');
    const joke = response.data.joke;
    res.render('index', { name, joke });
  } catch (error) {
    console.error(error);
    res.render('index', { name, joke: 'Could not retrieve a joke at this time, please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Joke App</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>

  <h1>Welcome to the Joke App</h1>
  <form action="/get-joke" method="POST">
    <label for="name">Enter your name:</label>
    <input type="text" id="name" name="name" required>
    <button type="submit">Get a Joke</button>
  </form>

  <% if (typeof joke !== 'undefined') { %>
    <h2>Hello, <%= name %>!</h2>
    <p>Here is your joke:</p>
    <p><%= joke %></p>
  <% } %>

Summary 

- server.js sets up the server, handles the routes and fetches jokesAPI
- index.ejs to render the form and display the joke

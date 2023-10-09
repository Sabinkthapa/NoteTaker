
//import express module
const express = require('express');

//impor the Path module ,provides utility functions for working with files and directoy path
const path = require('path');

const PORT = process.env.port || 3002; // use default port 3001 if there is no port environment variable specified

const app = express(); //create a instant of express appli

//middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', express.static('public'));
// app.use('./api', api);

//Get route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
//Get route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});





app.listen(PORT, () => {
    console.log(`listening on port at http://localhost:${PORT}`);
});


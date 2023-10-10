
//import express module
const express = require('express');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

//impor the Path module ,provides utility functions for working with files and directoy path
const path = require('path');

const PORT = process.env.PORT || 3002; // use default port 3001 if there is no port environment variable specified

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

// API routes
app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname + '/db/db.json'), 'utf8'));
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const newNote =req.body;
    newNote.id = uuidv4(); // Generate a unique ID for the note

   fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error reading notes from database"});
    }
    let notes = JSON.parse(data);

    //add new note to the arrat
    notes.push(newNote);

    // use fs writefile method to update notes

    fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(notes), 'utf8', (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({eror:"An error occurred while saving notes"});
        }
        res.json(newNote);
    });
});
});
    
app.listen(PORT, () => {
    console.log(`listening on port at http://localhost:${PORT}`);

});

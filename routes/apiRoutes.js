const routerApi = require('express').Router();
const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');


const readFromDatabase = util.promisify(fs.readFile);

const writeToDatabase = (database, data) => {
    fs.writeFile(database, JSON.stringify(data, null, 1), (err) => {
        err ? console.error(err) : console.info(`\nData written to ${database}`)
    });
};


routerApi.get('/api/notes', (req, res) => {
    readFromDatabase("./db/db.json").then((data) => res.json(JSON.parse(data)));
});


routerApi.get("/api/notes/:id", (req, res) => {
    readFromDatabase("./db/db.json").then((data) => {
        let dbNotes = JSON.parse(data);
        res.json(dbNotes[req.params.id]);
    });
});


routerApi.post('/api/notes', (req, res) => {

    let { title, text } = req.body;

    title = title.trim();
    text = text.trim();

    if (title && text) {

        const newNote = {
            id: uuidv4(),
            title,
            text,
        };

        readFromDatabase('./db/db.json').then((data) => {
            let dbNotes = JSON.parse(data);
            dbNotes.push(newNote);
            writeToDatabase('./db/db.json', dbNotes);
        });

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting note!');
    }
});


routerApi.delete('/api/notes/:id', (req, res) =>
    readFromDatabase('./db/db.json').then((data) => {

        let dbNotes = JSON.parse(data);
        // console.log(dbNotes);

        dbNotes = dbNotes.filter((note) => {
            return note.id !== req.params.id;
        })
        // console.log(dbNotes);

        writeToDatabase('./db/db.json', dbNotes);

        res.json(JSON.parse(data));
    })
);


module.exports = routerApi; 
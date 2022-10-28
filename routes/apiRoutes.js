const routerApi = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );

routerApi.get('/api/notes', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

routerApi.post('/api/notes', (req, res) => {

    console.log("i am called");
    const { title, text } = req.body;

    if (title && text) {

        const newNote = {
            id: uuidv4(),
            title,
            text,
        };

        readFromFile('./db/db.json').then((data) => {
            let dbNotes= JSON.parse(data);
            dbNotes.push(newNote);
            writeToFile('./db/db.json', dbNotes);
        });


// writeToFile('./db/db.json', JSON.parse(readFromFile('./db/db.json')).push(newNote));

const response = {
    status: 'success',
    body: newNote,
};

res.json(response);
    } else {
    res.json('Error in posting note!');
}
  });


module.exports = routerApi; 
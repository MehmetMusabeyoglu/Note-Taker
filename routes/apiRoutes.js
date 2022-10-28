const routerApi = require('express').Router();
const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) => {
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => {
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    });
};
  

routerApi.get('/api/notes', (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

routerApi.get("/api/notes/:id", (req, res) => {
    readFromFile("./db/db.json").then((data) => {
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

        readFromFile('./db/db.json').then((data) => {
            let dbNotes = JSON.parse(data);
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


routerApi.delete('/api/notes/:id', (req, res) =>
    readFromFile('./db/db.json').then((data) => {
        let dbNotes = JSON.parse(data);

        dbNotes = dbNotes.filter((note) => {
            note !== dbNotes[req.params.id]
        })

        writeToFile('./db/db.json', dbNotes);
        console.log(dbNotes);



        //    res.json(dataArr[req.params.id]);
        //     for(let i=0; i<dataArr.length; i++){
        //         if(dataArr[i] === req.params.id){
        //             console.log(req.params.id);
        //         }
        //     }
        res.json(JSON.parse(data));
    })
);


module.exports = routerApi; 
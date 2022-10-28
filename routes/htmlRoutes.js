const express = require('express');
const routerHtml = express();
const path = require('path');


routerHtml.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
);

routerHtml.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/notes.html"))
);

routerHtml.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/index.html"))
);

module.exports = routerHtml;


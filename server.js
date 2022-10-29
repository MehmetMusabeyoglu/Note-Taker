const express = require('express');
const routerApi = require('./routes/apiRoutes');
const routerHtml = require('./routes/htmlRoutes');


const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', routerApi);
app.use('/', routerHtml);


app.listen(PORT, () => console.log(`Node is listening and available at http://localhost:${PORT}/`));
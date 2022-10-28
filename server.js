const express = require('express');
const routerHtml = require('./routes/htmlRoutes');
const routerApi = require('./routes/apiRoutes');


const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', routerHtml);
app.use('/', routerApi);

app.listen(PORT, () => console.log(`Node is listening and available at http://localhost:${PORT}/`));
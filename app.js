require('dotenv').config();
require('./config/database').connect();

const express = require('express');
const routes = require('./routes');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', routes);

app.listen(port, () => {
    console.log(`listening on ${port}`);
});
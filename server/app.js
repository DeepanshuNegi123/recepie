const express = require('express');
const Recipe = require('./models/Recipe');
const routes = require('./routes/reciperoutes');

const app = express();

app.use(express.json());
app.use('/recipes', routes);

module.exports = app;

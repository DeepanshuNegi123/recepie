

const express = require('express');

const routes = require('./routes/reciperoutes');
const authroutes = require('./routes/authroutes');
const otherroutes = require('./routes/otherroutes');
const app = express();
const cors = require('cors');
app.use(cors({ // we have harcoded the frontend url 
    origin: 'http://localhost:5173',
    credentials:true 
}))

app.use(express.json());
app.use('/recipes', routes);
app.use('/api/auth', authroutes);
app.use('/api/comment', otherroutes);
module.exports = app;





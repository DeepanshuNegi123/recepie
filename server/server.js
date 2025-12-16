// server.js (CommonJS version)

require('dotenv').config(); // If using .env variables
// const express = require('express');
const mongoose = require('mongoose');
const app = require('./app'); // Your Express app config

const PORT = process.env.PORT || 5003;


const dbconnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to database: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await dbconnection();
});

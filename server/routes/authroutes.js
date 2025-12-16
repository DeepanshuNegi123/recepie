// routes/authroutes.js
const express = require('express');
const router = express.Router();
const { registerController, loginController , profilecontroller} = require('../controllers/authcontrollers');

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/profile',profilecontroller);
module.exports = router;
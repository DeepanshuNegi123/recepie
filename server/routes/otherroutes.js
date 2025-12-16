


const express = require('express');
const { addcomment, getcomment } = require('../controllers/commentcontrol');

const router = express.Router();

router.post('/add', addcomment);
// router.post('/delete', deletecomment);
// router.post('/editcomment', editcomment);

// router.delete('/delete', deletecomment);

router.get('/get/:recipeId', getcomment);

module.exports = router;
const express = require('express');
const router = express.Router();
const {getRecipes, addRecipe} = require('../controller/recipe');


router.get('/', getRecipes);
router.post('/', addRecipe);


module.exports = router;

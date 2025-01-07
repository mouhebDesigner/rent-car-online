const Recipe = require('../models/recipe');


const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({ createdAt: -1 });
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const addRecipe = async (req, res) => {
    const recipe = new Recipe(req.body);
    try {
        await recipe.save();
        res.status(201).json({ message: 'Recipe added!' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { getRecipes, addRecipe };


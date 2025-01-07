const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    ingredients: [{
        type: String
    }],
    instructions: [{
        type: String
    }],
    category: {
        type: String
    },
    cookingTime: {
        type: Number
    }
}, {
    timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

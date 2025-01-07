const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
        enum: ['Black', 'White', 'Red', 'Silver', 'Gray', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple'],
    },
    mileage: {
        type: Number,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;

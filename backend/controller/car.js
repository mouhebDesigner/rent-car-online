const Car = require('../models/car');
const mongoose = require('mongoose');



const getCars = async (req, res) => {
    try {
        const cars = await Car.find().sort({ createdAt: -1 });
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const addCar = async (req, res) => {
    const car = new Car(req.body);
    try {
        await car.save();
        res.status(201).json({ car: car, message: 'Car added!' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const editCar = async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid car ID' });
    }

    try {
        // Update the car
        const car = await Car.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        // Check if the car exists
        if (!car) {
            return res.status(404).json({message: 'Car not found' });
        }

        // Send the updated car as a response
        res.json({ car: car, message: 'Car updated successfully' });
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};


const deleteCar = async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid car ID' });
    }

    try {
        // Find and delete the car
        const car = await Car.findByIdAndDelete(id);

        // Check if the car exists
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        // Respond with success message
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};



module.exports = { getCars, addCar, editCar, deleteCar };


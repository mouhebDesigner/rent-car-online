import React, { useState } from 'react';

const CreateCar = ({ car, onCarCreated, onClose }) => {
    const [formData, setFormData] = useState(car ? { ...car } : {
        brand: '',
        model: '',
        year: '',
        price: '',
        color: 'Black',
        mileage: '',
        isAvailable: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const closeModal = () => {
    };
   

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = car ? 'PUT' : 'POST';
        const url = car ? `http://localhost:5000/car/${car._id}` : 'http://localhost:5000/car';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                
                onCarCreated(data.car);
            })
            .catch(err => {
                console.error('Error:', err);
                if (err.message.includes('SyntaxError')) {
                    alert('Invalid form data');
                }
            });
    };

    return (
        <div className="container">
            <h2 className="text-center">{car ? 'Edit' : 'Create a New'} Car</h2>
            <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="brand" className="form-label">Brand</label>
                    <input type="text" name="brand" placeholder="Brand" className="form-control" value={formData.brand} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="model" className="form-label">Model</label>
                    <input type="text" name="model" placeholder="Model" className="form-control" value={formData.model} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="year" className="form-label">Year</label>
                    <input type="number" name="year" placeholder="Year" className="form-control" value={formData.year} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" name="price" placeholder="Price" className="form-control" value={formData.price} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="color" className="form-label">Color</label>
                    <select name="color" value={formData.color} onChange={handleChange} required className="form-select">
                        <option value="Black">Black</option>
                        <option value="White">White</option>
                        <option value="Red">Red</option>
                        <option value="Silver">Silver</option>
                        <option value="Gray">Gray</option>
                        <option value="Blue">Blue</option>
                        <option value="Green">Green</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Orange">Orange</option>
                        <option value="Purple">Purple</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label htmlFor="mileage" className="form-label">Mileage</label>
                    <input type="number" name="mileage" placeholder="Mileage" className="form-control" value={formData.mileage} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleChange} />
                        <label className="form-check-label" htmlFor="isAvailable">
                            Available
                        </label>
                    </div>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="reset" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default CreateCar;

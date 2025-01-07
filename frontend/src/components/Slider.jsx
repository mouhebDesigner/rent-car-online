import React from 'react';
import '../assets/slider.css'; // You can add CSS for styling the slider
import car1 from'../assets/images/1.jpeg';
import car2 from'../assets/images/2.jpeg';
import car3 from'../assets/images/3.jpeg';

const Slider = () => {
    return (
        <div className="slider">
            <div className="slider-content">
                <h2>Explore Our Car Fleet</h2>
                <p>Find the perfect car for your next adventure</p>
                <button>Book Now</button>
            </div>
            <div className="slider-images">
                <img src={car1} alt="Car 1" className="slider-image" />
                <img src={car2} alt="Car 2" className="slider-image" />
                <img src={car3} alt="Car 3" className="slider-image" />
            </div>
        </div>
    );
};

export default Slider;

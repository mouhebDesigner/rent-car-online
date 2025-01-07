import React from 'react';
import '../assets/style.css'; // You can create a separate CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>CarRent</h1>
      </div>
      <nav className="navigation">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#cars">Cars</a></li>
          <li><a href="#fleet">Our Fleet</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <div className="cta">
        <a href="#book" className="btn-book">Book a Car</a>
      </div>
    </header>
  );
};

export default Header;

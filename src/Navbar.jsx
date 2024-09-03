import React from 'react';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        
        <img src="logo.png" alt="Logo" className="logo" />
      </div>
      <button className="navbar-button">Try it For Free</button>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <div className="title">
        <h1 className='dashboard'>Dashboard</h1>
      </div>
      <div className="search-container">
        <div className="search-wrapper">
          <img 
            src="/icons/Search.png" 
            alt="Search" 
            className="search-icon" 
          />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
        <img 
          src="/icons/bell.png" 
          alt="Notifications" 
          className="notification-icon" 
        />
        <img 
          src="/icons/Question 1.png" 
          alt="Help" 
          className="question-icon" 
        />
        <img 
          src="/icons/Avatar 313.png" 
          alt="User" 
          className="avatar-icon" 
        />
      </div>
    </div>
  );
}

export default Header;
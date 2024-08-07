// src/components/NavBar.js
import React from 'react';
import './Navbar.css';

const NavBar = ({ theme, toggleTheme }) => {
  return (
    <nav className={`navbar ${theme}`}>
      <ul className="navbar-menu">
        <li className="menu-item"><a href="/">Home</a></li>
        <li className="menu-item dropdown">
          <span>Quizzes</span>
          <ul className="dropdown-content">
            <li><a href="quizzes/science">Science</a></li>
            <li><a href="quizzes/tech">Tech</a></li>
            <li><a href="quizzes/general-knowledge">General Knowledge</a></li>
            {/* Add more quiz links as needed */}
          </ul>
        </li>
        <li className="menu-item"><a href="/leaderboard">Leaderboard</a></li>
        <li className="menu-item"><a href="/about">About</a></li>
      </ul>
      <div className="theme-toggle">
        <label className="switch">
          <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
          <span className="slider"></span>
        </label>
        <span className="theme-label">{theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}</span>
      </div>
    </nav>
  );
};

export default NavBar;

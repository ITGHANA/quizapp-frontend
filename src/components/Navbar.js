// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ toggleTheme, theme }) => {
  return (
    <nav className={`navbar ${theme}`}>
      <div className="nav-left">
        <Link to="/">Home</Link>
        <div className="dropdown">
          <span>Quizzes</span>
          <div className="dropdown-content">
            <Link to="/quizzes/science">Science</Link>
            <Link to="/quizzes/tech">Tech</Link>
            <Link to="/quizzes/general">General Knowledge</Link>
          </div>
        </div>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="nav-right">
        <label className="switch">
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === 'dark'}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </nav>
  );
};

export default Navbar;

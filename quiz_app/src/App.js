// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import QuizList from './components/QuizList';
import QuizPage from './components/QuizPage';
import Leaderboard from './components/Leaderboard';
import About from './components/About';
import './App.css';

const App = () => {
  // Initialize theme based on localStorage value or default to 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme); // Save theme to localStorage
      return newTheme;
    });
  };

  return (
    <Router>
      <div className={`app ${theme}`}>
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quizzes" element={<QuizList />} />
            <Route path="/quizzes/:quizName" element={<QuizPage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home">
      <h1>Welcome to the Quiz App</h1>
      <div className="quiz-buttons">
        <Link to="/quizzes/science"><button>Science Quiz</button></Link>
        <Link to="/quizzes/tech"><button>Tech Quiz</button></Link>
        <Link to="/quizzes/general"><button>General Knowledge Quiz</button></Link>
      </div>
    </div>
  );
};

export default HomePage;

// src/components/QuizPage.js
import React, { useState } from 'react';
import './QuizPage.css';

const QuizPage = ({ quizName }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      setAccessGranted(true);
    }
  };

  return (
    <div className="quiz-page">
      <h2>{quizName} Quiz</h2>
      {!accessGranted ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Start Quiz</button>
        </form>
      ) : (
        <div>
          {/* Quiz questions go here */}
          <p>Welcome, {name}! Enjoy the quiz.</p>
        </div>
      )}
    </div>
  );
};

export default QuizPage;

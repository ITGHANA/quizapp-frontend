// src/components/QuizList.js
import React from 'react';
import { Link } from 'react-router-dom';
import './QuizList.css';

const QuizList = () => {
  const quizzes = [
    { name: 'Science', path: '/quizzes/science' },
    { name: 'Tech', path: '/quizzes/tech' },
    { name: 'General Knowledge', path: '/quizzes/general' },
  ];

  return (
    <div className="quiz-list">
      <h2>All Quizzes</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.name}>
            <Link to={quiz.path}>{quiz.name} Quiz</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;

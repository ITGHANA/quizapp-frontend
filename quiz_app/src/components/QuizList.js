// src/components/QuizList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuizContext } from '../QuizContext';
import './QuizList.css';

const QuizList = () => {
  const { quizCategories } = useQuizContext();

  return (
    <div className="quiz-list">
      <h2>All Quizzes</h2>
      <ul>
        {quizCategories.map((quiz) => (
          <li key={quiz.name}>
            <Link to={quiz.path}>{quiz.name} Quiz</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;

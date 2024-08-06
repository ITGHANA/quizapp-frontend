// src/components/HomePage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const quizQuestions = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    answer: 'Paris',
  },
  {
    question: 'Who wrote "Romeo and Juliet"?',
    options: ['William Shakespeare', 'Mark Twain', 'Jane Austen', 'Charles Dickens'],
    answer: 'William Shakespeare',
  },
  {
    question: 'What is the largest planet in our solar system?',
    options: ['Mars', 'Earth', 'Jupiter', 'Saturn'],
    answer: 'Jupiter',
  },
  // Add more questions as needed
];

const getCurrentDayIndex = () => {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 0);
  const diff = currentDate - startOfYear + (startOfYear.getTimezoneOffset() - currentDate.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return dayOfYear % quizQuestions.length;
};

const HomePage = ({ theme }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilNextQuiz());
  const [quizIndex, setQuizIndex] = useState(getCurrentDayIndex());
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState('');

  function getTimeUntilNextQuiz() {
    const now = new Date();
    const nextQuizTime = new Date();
    nextQuizTime.setUTCHours(24, 0, 0, 0); // Midnight UTC
    return nextQuizTime - now;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilNextQuiz());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const dayInterval = setInterval(() => {
      setQuizIndex(getCurrentDayIndex());
      setSelectedOption(null); // Reset selection for new question
      setFeedback(''); // Clear feedback for new question
    }, 24 * 60 * 60 * 1000); // Update every 24 hours

    return () => clearInterval(dayInterval);
  }, []);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === currentQuestion.answer) {
      setFeedback('Congratulations! You selected the correct answer.');
    } else {
      setFeedback(`Wrong answer. The correct answer is ${currentQuestion.answer}.`);
    }
  };

  const currentQuestion = quizQuestions[quizIndex];

  return (
    <div className={`home ${theme}`}>
      <h1>Welcome to the Quiz App!</h1>
      <div className="quiz-buttons">
        <Link to="/quizzes/science"><button>Science Quiz</button></Link>
        <Link to="/quizzes/tech"><button>Tech Quiz</button></Link>
        <Link to="/quizzes/general"><button>General Knowledge Quiz</button></Link>
      </div>
      <div className={`quiz-of-the-day ${theme}`}>
        <h2>Quiz of the Day</h2>
        <p>{currentQuestion.question}</p>
        <ul>
          {currentQuestion.options.map((option, index) => (
            <li
              key={index}
              className={selectedOption === option ? 'selected' : ''}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
        <div className="feedback">{feedback}</div>
        <div className="timer">
          <p>Next quiz question in: {formatTime(timeLeft)}</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

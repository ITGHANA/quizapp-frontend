import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuizContext } from '../context/QuizContext';
import './HomePage.css';

const HomePage = ({ theme }) => {
  const { quizQuestions, slides } = useQuizContext();
  const [timeLeft, setTimeLeft] = useState(getTimeUntilNextQuiz());
  const [quizIndex, setQuizIndex] = useState(getCurrentDayIndex());
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

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

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length); // Toggle between slides
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(slideInterval);
  }, [slides.length]);

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
    const currentQuestion = quizQuestions[quizIndex];
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
      <div className="slideshow">
        {slides.map((slide, index) => (
          <div key={slide.id} className={`slide ${currentSlide === index ? 'active' : ''}`}>
            <img src={slide.image_url} alt={`Slide ${index + 1}`} />
            <div className="overlay">
              <Link to={slide.link}>
                <button>{slide.button_text}</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
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

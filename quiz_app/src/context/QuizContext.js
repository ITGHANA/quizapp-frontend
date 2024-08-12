// src/QuizContext.js
import React, { createContext, useState, useContext } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [quizQuestions, setQuizQuestions] = useState([
        {
            id: 1,
            question: 'What is the capital of Ghana?',
            options: ['Berlin', 'Accra', 'Paris', 'Rome'],
            answer: 'Accra',
        },
        // Add more questions as needed
    ]);

    const [slides, setSlides] = useState([
        {
            id: 1,
            image_url: 'slide1.jpg',
            link: '/quizzes',
            button_text: 'View All Quizzes',
            quiz_question: 1,
        },
        // Add more slides as needed
    ]);

    const [quizCategories, setQuizCategories] = useState([
        { name: 'Science', path: '/quizzes/science' },
        { name: 'Tech', path: '/quizzes/tech' },
        { name: 'General Knowledge', path: '/quizzes/general' },
    ]);

    return (
        <QuizContext.Provider value={{ quizQuestions, slides, quizCategories, setQuizQuestions, setSlides, setQuizCategories }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuizContext = () => useContext(QuizContext);

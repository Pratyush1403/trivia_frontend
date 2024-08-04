import React, { useState, useEffect } from 'react';
import axios from 'axios';
import he from 'he';
import './App.css';

const TriviaQuiz = ({ setShowHeader, userId }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [showScore, setShowScore] = useState(false);
  const [answers, setAnswers] = useState([]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('https://trivia-backend-sand.vercel.app/api/questions');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching trivia questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    const isCorrect = selectedOption === correctAnswer;
    setAnswers([
      ...answers,
      {
        question: questions[currentQuestionIndex].question,
        selectedOption,
        correctAnswer,
        isCorrect
      }
    ]);

    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedOption('');
    } else {
      setShowScore(true);
      setShowHeader(false);
      updateScore(score + (isCorrect ? 1 : 0));
    }
  };

  const updateScore = async (finalScore) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Add this line
      const response = await axios.post('https://trivia-backend-sand.vercel.app/api/score', 
        { score: finalScore },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log('Score update response:', response.data); // Add this line
    } catch (error) {
      console.error('Error saving score:', error.response ? error.response.data : error.message);
    }
  };

  const tryAgain = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption('');
    setShowScore(false);
    setAnswers([]);
    fetchQuestions();
    setShowHeader(true);
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {showScore ? (
        <div>
          <h2>Your score is {score} out of {questions.length}</h2>
          <h3>Review your answers:</h3>
          {answers.map((answer, index) => (
            <div key={index} className="question">
              <p>{index + 1}. {he.decode(answer.question)}</p>
              <p>Your answer: {he.decode(answer.selectedOption)}</p>
              <p>Correct answer: {he.decode(answer.correctAnswer)}</p>
              <p>{answer.isCorrect ? 'Correct' : 'Incorrect'}</p>
            </div>
          ))}
          <button onClick={tryAgain}>Try Again</button>
        </div>
      ) : (
        <div>
          <h2>Question {currentQuestionIndex + 1}</h2>
          <div className="question">{he.decode(questions[currentQuestionIndex].question)}</div>
          <div className="options">
            {questions[currentQuestionIndex].incorrect_answers.concat(questions[currentQuestionIndex].correct_answer).map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={option}
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionSelect(option)}
                />
                <label htmlFor={option}>{he.decode(option)}</label>
              </div>
            ))}
          </div>
          <button onClick={handleNextQuestion}>Next Question</button>
        </div>
      )}
    </div>
  );
};

export default TriviaQuiz;

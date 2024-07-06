import React, { useState, useEffect } from 'react';
import axios from 'axios';
import he from 'he';
import './App.css';

const TriviaQuiz = ({ setShowHeader }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [showScore, setShowScore] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching trivia questions:', error);
      }
    };

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
    }
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

import React from 'react';

const Question = ({ question }) => {
  const { question: questionText, correct_answer, incorrect_answers } = question;

  const answers = [...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5);

  return (
    <div className="question">
      <p>{questionText}</p>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
    </div>
  );
};

export default Question;

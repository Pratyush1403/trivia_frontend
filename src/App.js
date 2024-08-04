import React, { useState } from 'react';
import './App.css';
import TriviaQuiz from './TriviaQuiz';
import SignUp from './Signup';
import Login from './Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

const App = () => {
  const [token, setToken] = useState(null);
  const [showHeader, setShowHeader] = useState(true);

  return (
    <>
      {showHeader && (
        <header className="App-header">
          <h1>Trivia Quiz App</h1>
        </header>
      )}
      <main style={{ marginTop: '3rem', marginBottom: '2.5rem' }}>
      <div className="App">
          {!token ? (
            <>
              <SignUp />
              <Login setToken={setToken} />
            </>
          ) : (
            <TriviaQuiz setShowHeader={setShowHeader} token={token} />
          )}
        </div>
      </main>
      <footer>
        <p>Developed by Pratyush Sharma</p>
        <a href="mailto:pratyushsharma1404@gmail.com">
          <FontAwesomeIcon icon={faEnvelope} size="lg" />
        </a>
        <a href="https://www.linkedin.com/in/pratyush-sharma-432241227/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} size="lg" />
        </a>
      </footer>
    </>
  );
};

export default App;

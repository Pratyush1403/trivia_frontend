import React, { useState, useEffect } from 'react';
import './App.css';
import TriviaQuiz from './TriviaQuiz';
import Auth from './Auth';
import Profile from './Profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { jwtDecode } from "jwt-decode";

const App = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  import { jwtDecode } from "jwt-decode";

useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    setUser(decodedToken.userId);
  }
}, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setShowProfile(false);
  };

  return (
    <>
      {showHeader && (
        <header className="App-header">
          <h1>Trivia Quiz App</h1>
          {user && (
            <div>
              <button onClick={() => setShowProfile(!showProfile)}>
                {showProfile ? 'Play Quiz' : 'View Profile'}
              </button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </header>
      )}
      <main style={{ marginTop: '3rem', marginBottom: '2.5rem' }}>
        <div className="App">
          {!user ? (
            <Auth setUser={setUser} />
          ) : showProfile ? (
            <Profile userId={user} />
          ) : (
            <TriviaQuiz setShowHeader={setShowHeader} userId={user} />
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

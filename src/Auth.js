import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css'; // Import the CSS file

const Auth = ({ setUser }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isSignUp ? '/api/signup' : '/api/signin';
      const response = await axios.post(`https://trivia-backend-sand.vercel.app${endpoint}`, { email, password });
      if (isSignUp) {
        setIsSignUp(false);
      } else {
        localStorage.setItem('token', response.data.token);
        console.log('Token stored:', response.data.token); // Add this line
        setUser(response.data.token);
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
      </form>
      <button className="auth-toggle-button" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
      </button>
      {error && <p className="auth-error">{error}</p>}
    </div>
  );
};

export default Auth;

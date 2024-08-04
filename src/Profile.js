import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/profile/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch profile');
      }
    };

    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/leaderboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setLeaderboard(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError('Failed to fetch leaderboard');
      }
    };

    if (userId) {
      fetchProfile();
      fetchLeaderboard();
    }
  }, [userId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile || leaderboard.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>Email: {profile.email}</p>
      <h3>Recent Scores</h3>
      <ul>
        {profile.recentScores && profile.recentScores.map((score, index) => (
          <li key={index}>
            Score: {score.score}, Date: {new Date(score.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
      <h3>Leaderboard</h3>
      <ol>
        {leaderboard.map((user, index) => (
          <li key={index}>
            {user.email}: {user.averageScore ? user.averageScore.toFixed(2) : 'N/A'}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Profile;
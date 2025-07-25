import React from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <h1>ברוכות הבאות ליומן האישי שלכן 🌸</h1>
        <p>כאן תוכלו לשמור זכרונות, מחשבות, מסעות וקסם יומיומי ✨</p>
        <div className="welcome-buttons">
<button onClick={() => navigate('/login')} className="pink-button">כניסה</button>
          <button onClick={() => navigate('/register')} className="pink-outline-button">הרשמה</button>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;

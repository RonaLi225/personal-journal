import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [identifier, setIdentifier] = useState(''); // יכול להיות גם שם משתמש וגם אימייל
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        identifier,
        password,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      alert('שם משתמש/אימייל או סיסמה שגויים ❌');
    }
  };

  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <h2>כניסה ליומן 🌸</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="אימייל או שם משתמש"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="סיסמה"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingRight: '2.5rem' }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#ff69b4',
                fontSize: '1rem',
              }}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <button type="submit" className="pink-button">כניסה</button>
        </form>
        <p>
          עדיין אין לך חשבון?{' '}
          <span
            onClick={() => navigate('/register')}
            style={{ color: '#ff69b4', cursor: 'pointer' }}
          >
            להרשמה
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

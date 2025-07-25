import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      alert('שגיאה בהרשמה. ייתכן שהמשתמש כבר קיים.');
    }
  };

  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <h2>הרשמה ליומן 🌸</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="שם משתמש"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="אימייל"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" className="pink-button">הרשמה</button>
        </form>
        <p>
          כבר יש לך חשבון?{' '}
          <span onClick={() => navigate('/login')} style={{ color: '#ff69b4', cursor: 'pointer' }}>
            להתחברות
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;

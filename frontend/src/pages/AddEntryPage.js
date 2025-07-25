import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddEntryPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleAddEntry = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:5000/api/entries', {
        title,
        content,
        date,
        location,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('הרשומה נוספה בהצלחה! 🌸');
      navigate('/home'); // ✅ זה מחזיר אותך לעמוד שמציג את הרשומות
    } catch (err) {
      console.error('❌ שגיאה בהוספת הרשומה:', err.response?.data || err.message);
      alert('שגיאה בהוספה ❌');
    }
  };

  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <h2>הוספת רשומה חדשה 📝</h2>
        <form onSubmit={handleAddEntry}>
          <input
            type="text"
            placeholder="כותרת"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="תוכן"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="מיקום"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <button type="submit" className="pink-button">הוספה</button>
        </form>
      </div>
    </div>
  );
}

export default AddEntryPage;

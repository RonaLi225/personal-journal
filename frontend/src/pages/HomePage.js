import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("את בטוחה שתרצי למחוק את הרשומה?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/entries/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEntries((prevEntries) => prevEntries.filter((entry) => entry._id !== id));
    } catch (err) {
      console.error("שגיאה במחיקה:", err);
      alert("שגיאה במחיקת הרשומה ❌");
    }
  };

  const fetchEntries = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/entries', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEntries(res.data);
    } catch (err) {
      console.error('שגיאה בטעינת רשומות:', err);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return (
    <div className="welcome-container">
      {/* 🔒 כפתור התנתקות */}
      <button
        className="pink-button"
        style={{ position: 'absolute', top: '20px', left: '20px' }}
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/');
        }}
      >
        🚪 התנתקות
      </button>

      <div className="welcome-box">
        <h1>רשומות היומן שלך 📖</h1>
        {entries.length === 0 ? (
          <p>אין עדיין רשומות 🥺</p>
        ) : (
          entries.map((entry) => (
            <div key={entry._id} style={{
              backgroundColor: '#ffe6f0',
              padding: '20px',
              borderRadius: '15px',
              marginBottom: '20px',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              textAlign: 'right'
            }}>
              <h2 style={{ color: '#ff69b4' }}>{entry.title}</h2>
              <p>{entry.content}</p>
              <small>{new Date(entry.date).toLocaleDateString()} | {entry.location}</small>

              <div style={{ marginTop: '10px' }}>
                <button
                  style={{
                    backgroundColor: '#ffd700',
                    color: 'black',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    marginLeft: '10px'
                  }}
                  onClick={() => navigate(`/edit-entry/${entry._id}`)}
                >
                  ✏️ ערכי
                </button>

                <button
                  style={{
                    backgroundColor: '#ff4d4d',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleDelete(entry._id)}
                >
                  🗑️ מחקי
                </button>
              </div>
            </div>
          ))
        )}

        {/* ➕ כפתור להוספת רשומה חדשה */}
        <button
          className="pink-button"
          style={{ marginTop: '30px' }}
          onClick={() => navigate('/add-entry')}
        >
          ➕ הוסיפי רשומה חדשה
        </button>
      </div>
    </div>
  );
}

export default HomePage;

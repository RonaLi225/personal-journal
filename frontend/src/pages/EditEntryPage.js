import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditEntryPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/entries/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const entry = res.data;
        setTitle(entry.title);
        setContent(entry.content);
        setDate(entry.date.split('T')[0]);
        setLocation(entry.location);
      } catch (err) {
        console.error('שגיאה בטעינת הרשומה:', err);
      }
    };

    fetchEntry();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/entries/${id}`, {
        title, content, date, location
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('הרשומה עודכנה בהצלחה!');
      navigate('/home');
    } catch (err) {
      console.error('שגיאה בעדכון הרשומה:', err);
      alert('שגיאה בעדכון');
    }
  };

  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <h2>עריכת רשומה ✏️</h2>
        <form onSubmit={handleUpdate}>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
          <button type="submit" className="pink-button">עדכון</button>
        </form>
      </div>
    </div>
  );
}

export default EditEntryPage;

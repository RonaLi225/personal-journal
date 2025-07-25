import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AddEntryPage from './pages/AddEntryPage';
import './style.css';
import EditEntryPage from './pages/EditEntryPage';


<Route path="/edit-entry/:id" element={<EditEntryPage />} />



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/add-entry" element={<AddEntryPage />} />
        <Route path="/edit-entry/:id" element={<EditEntryPage />} />


      </Routes>
    </Router>
  );
}

export default App;

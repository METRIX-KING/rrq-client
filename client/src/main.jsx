import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Generate from './pages/Generate';
import './index.css';

function App() {
  const token = localStorage.getItem('token');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={token ? "/generate" : "/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/generate" element={token ? <Generate /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
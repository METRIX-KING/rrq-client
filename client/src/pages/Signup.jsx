import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
const API = import.meta.env.VITE_API_URL;

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const register = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/auth/register`, { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/generate');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={register}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
        <p style={{ textAlign: 'center' }}>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </>
  );
}
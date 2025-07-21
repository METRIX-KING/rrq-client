import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/generate');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={login}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        <p style={{ textAlign: 'center' }}>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </form>
    </>
  );
}
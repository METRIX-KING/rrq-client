import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', { username, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold">Sign Up</h2>
        <p className="text-gray-400">Create a new account</p>
        {error && <p className="text-red-500">{error}</p>}
        <form className="space-y-4" onSubmit={handleSignup}>
          <input type="text" placeholder="Username" className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
            value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded text-white font-semibold">
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
}

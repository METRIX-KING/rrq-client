import React, { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });
      localStorage.setItem('token', res.data.token);
      alert("Login successful!");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold">Welcome</h2>
        <p className="text-gray-400">Sign in to your dashboard</p>
        {error && <p className="text-red-500">{error}</p>}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-purple-500" checked={remember} onChange={() => setRemember(!remember)} />
              <span>Remember me</span>
            </label>
            <span className="text-purple-400 hover:underline cursor-pointer">Forgot password?</span>
          </div>
          <button type="submit" className="w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded text-white font-semibold">
            GO TO DASHBOARD
          </button>
        </form>
        <p className="text-center text-sm text-gray-500">
          Don’t have an account? <span className="text-white font-medium underline cursor-pointer">Sign Up</span>
        </p>
      </div>
    </div>
  );
}

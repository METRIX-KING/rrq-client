import React, { useState } from 'react';
import axios from 'axios';

export default function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [response, setResponse] = useState('');

  const handleResetRequest = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/auth/request-reset', { username });
    setResponse(res.data.token ? `Reset token: ${res.data.token}` : 'Failed to generate reset link');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold">Forgot Password</h2>
        <form onSubmit={handleResetRequest} className="space-y-4">
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          />
          <button type="submit" className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded">
            Request Reset
          </button>
        </form>
        {response && <p className="text-sm text-green-400">{response}</p>}
      </div>
    </div>
  );
}

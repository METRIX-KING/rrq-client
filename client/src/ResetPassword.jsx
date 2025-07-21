import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
      setStatus('Password reset successful.');
    } catch (err) {
      setStatus('Failed to reset password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <form onSubmit={handleReset} className="space-y-4 max-w-md w-full">
        <h2 className="text-xl font-bold">Reset Password</h2>
        <input
          type="password"
          placeholder="New password"
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full py-2 bg-green-600 rounded text-white">Reset</button>
        {status && <p className="text-sm mt-2">{status}</p>}
      </form>
    </div>
  );
}

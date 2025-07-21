import React from 'react';
import UserTable from './components/UserTable';
import LicenseTable from './components/LicenseTable';

export default function Dashboard() {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button onClick={logout} className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white">Logout</button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <UserTable />
        <LicenseTable />
      </div>
    </div>
  );
}

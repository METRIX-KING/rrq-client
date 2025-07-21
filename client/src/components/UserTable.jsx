import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/users', {
      headers: { Authorization: localStorage.getItem('token') }
    });
    setUsers(res.data);
  };

  useEffect(() => { fetchUsers(); }, []);

  const filtered = users.filter(user => user.username.includes(search));

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-md">
      <div className="mb-4">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search username..." className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-full" />
      </div>
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th className="text-purple-400">Username</th>
            <th className="text-purple-400">Role</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(user => (
            <tr key={user._id} className="bg-gray-800 hover:bg-gray-700 rounded">
              <td className="px-3 py-2">{user.username}</td>
              <td className="px-3 py-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

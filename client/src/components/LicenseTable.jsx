import React from 'react';

export default function LicenseTable() {
  const dummyLicenses = [
    { key: 'ABC123', duration: '30d', user: 'admin', status: 'active' },
    { key: 'XYZ789', duration: '90d', user: 'test', status: 'unused' }
  ];

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2">License Keys</h3>
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th className="text-purple-400">Key</th>
            <th className="text-purple-400">Duration</th>
            <th className="text-purple-400">User</th>
            <th className="text-purple-400">Status</th>
          </tr>
        </thead>
        <tbody>
          {dummyLicenses.map((license, index) => (
            <tr key={index} className="bg-gray-800 hover:bg-gray-700 rounded">
              <td className="px-3 py-2">{license.key}</td>
              <td className="px-3 py-2">{license.duration}</td>
              <td className="px-3 py-2">{license.user}</td>
              <td className="px-3 py-2">{license.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

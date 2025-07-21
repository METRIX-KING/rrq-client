import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function GenerateKeys() {
  const [hacks, setHacks] = useState([]);
  const [selectedHack, setSelectedHack] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [balance, setBalance] = useState(0);
  const [generatedKeys, setGeneratedKeys] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const hacksRes = await axios.get('http://localhost:5000/api/hacks', {
        headers: { Authorization: token },
      });
      setHacks(hacksRes.data);

      const balRes = await axios.get('http://localhost:5000/api/user/balance', {
        headers: { Authorization: token },
      });
      setBalance(balRes.data.balance);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedHack && selectedDuration) {
      const durationInfo = selectedHack.durations.find(d => d.name === selectedDuration);
      if (durationInfo) {
        setTotal(durationInfo.price * quantity);
      }
    }
  }, [selectedHack, selectedDuration, quantity]);

  const generate = async () => {
    if (!selectedHack || !selectedDuration) return;
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('http://localhost:5000/api/license/generate', {
        hackId: selectedHack._id,
        duration: selectedDuration,
        quantity,
      }, {
        headers: { Authorization: token }
      });
      setGeneratedKeys(res.data.keys);
      setBalance(res.data.newBalance);
    } catch (err) {
      alert(err.response?.data?.message || 'Error generating keys.');
    }
  };

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-purple-400 mb-4">Generate Keys</h1>

        <div className="mb-3">
          <label className="block mb-1">Select Hack</label>
          <select onChange={e => {
            const hack = hacks.find(h => h.name === e.target.value);
            setSelectedHack(h);
            setSelectedDuration('');
          }} className="w-full px-3 py-2 bg-gray-800 rounded">
            <option>Select a hack</option>
            {hacks.map(h => <option key={h._id}>{h.name}</option>)}
          </select>
        </div>

        {selectedHack && (
          <div className="mb-3">
            <label className="block mb-1">Select Duration</label>
            <select onChange={e => setSelectedDuration(e.target.value)} className="w-full px-3 py-2 bg-gray-800 rounded">
              <option>Select duration</option>
              {selectedHack.durations.map(d => (
                <option key={d.name} value={d.name}>
                  {d.name} - ${d.price}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-3">
          <label className="block mb-1">Quantity</label>
          <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))}
            min="1" className="w-full px-3 py-2 bg-gray-800 rounded" />
        </div>

        <div className="mb-3 text-sm text-gray-300">
          <p>Balance: ${balance.toFixed(2)}</p>
          <p>Total: ${total.toFixed(2)}</p>
        </div>

        <button onClick={generate}
          className="w-full py-2 mt-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90 rounded text-white font-semibold">
          Buy Keys
        </button>

        {generatedKeys.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Generated Keys:</h2>
            <ul className="text-sm space-y-1">
              {generatedKeys.map((key, i) => (
                <li key={i} className="bg-gray-800 px-3 py-1 rounded">{key}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

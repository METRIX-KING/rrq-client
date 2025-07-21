import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

export default function Generate() {
  const [hacks, setHacks] = useState([]);
  const [selectedHack, setSelectedHack] = useState('');
  const [durations, setDurations] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [balance, setBalance] = useState(0);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const hacksRes = await axios.get(`${API}/api/hacks`);
      setHacks(hacksRes.data);
      const userRes = await axios.get(`${API}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBalance(userRes.data.balance);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const selected = hacks.find(h => h.name === selectedHack);
    if (selected) {
      setDurations(selected.durations);
      setPrice(selected.price);
    }
  }, [selectedHack]);

  const handleGenerate = async () => {
    const res = await axios.post(`${API}/api/license/generate`, {
      hack: selectedHack,
      duration: selectedDuration,
      quantity
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setKeys(res.data.keys);
  };

  const total = price * quantity;

  return (
    <div style={{ backgroundColor: '#111', minHeight: '100vh', padding: '2rem', color: 'white' }}>
      <h2>Generate Keys</h2>
      <div style={{ display: 'grid', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
        <select onChange={e => setSelectedHack(e.target.value)}>
          <option value="">Select Hack</option>
          {hacks.map(h => <option key={h._id} value={h.name}>{h.name}</option>)}
        </select>
        <select onChange={e => setSelectedDuration(e.target.value)}>
          <option value="">Select Duration</option>
          {durations.map(d => <option key={d} value={d}>{d} days</option>)}
        </select>
        <input type="number" value={quantity} min={1} onChange={e => setQuantity(Number(e.target.value))} />
        <div>Balance: ${balance.toFixed(2)}</div>
        <div>Total: ${total.toFixed(2)}</div>
        <button onClick={handleGenerate}>Buy Keys</button>
        {keys.length > 0 && (
          <div>
            <h3>Generated Keys:</h3>
            <ul>{keys.map((k, i) => <li key={i}>{k}</li>)}</ul>
          </div>
        )}
      </div>
    </div>
  );
}
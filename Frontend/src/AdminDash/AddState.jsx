
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddState = () => {
  const [form, setForm] = useState({ stateName: '', stateCode: '' });
  const [states, setStates] = useState([]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchStates = async () => {
    try {
      const res = await axios.get('http://localhost:4545/addingstate/showallstate', getAuthHeaders());
      setStates(res.data.data);
    } catch (err) {
      console.error('Error fetching states:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.stateName || !form.stateCode) return alert('Both fields are required');

    try {
      await axios.post('http://localhost:4545/addingstate/addstate',{ state: form.stateName, code: form.stateCode }, getAuthHeaders());
      setForm({ stateName: '', stateCode: '' });
      fetchStates(); // Refresh list after adding
    } catch (err) {
      console.error('Error adding state:', err);
      alert('Failed to add state');
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-4">Add State and Code</h1>

      {/* Input Fields */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          name="stateName"
          value={form.stateName}
          onChange={handleChange}
          placeholder="Enter state name"
          className="border px-3 py-2 rounded w-64"
        />
        <input
          type="text"
          name="stateCode"
          value={form.stateCode}
          onChange={handleChange}
          placeholder="Enter code"
          className="border px-3 py-2 rounded w-64"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Display Added States */}
      <div className="mt-4">
        <h2 className="text-lg font-bold mb-2">All States</h2>
        {states.length === 0 ? (
          <p className="text-gray-500">No states added yet.</p>
        ) : (
          <table className="w-full border table-auto">
            <thead>
              <tr>
                <th className="border px-2 py-1">State</th>
                <th className="border px-2 py-1">Code</th>
              </tr>
            </thead>
            <tbody>
             

              {states.map((item, index) => (
  <tr key={index}>
    <td className="border px-2 py-1">{item.state}</td>
    <td className="border px-2 py-1">{item.code}</td>
  </tr>
))}

            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AddState;


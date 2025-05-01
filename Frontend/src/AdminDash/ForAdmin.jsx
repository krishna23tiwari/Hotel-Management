import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ForAdmin = () => {
  const [form, setForm] = useState({ city: '', state: '' });
  const [data, setData] = useState([]);
  const [inactiveData, setInactiveData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [availableStates, setAvailableStates] = useState([]);


  const [searchActive, setSearchActive] = useState('');
  const [searchInactive, setSearchInactive] = useState('');
  const [sortActiveAsc, setSortActiveAsc] = useState(true);
  const [sortInactiveAsc, setSortInactiveAsc] = useState(true);

  useEffect(() => {
    fetchData();
    fetchStates();
  }, []);

  const fetchStates = async () => {
    const res = await axios.get('http://localhost:4545/admin/getallstates', getAuthHeaders());
    console.log(`>>>>statedataforcity`,res.data)
    setAvailableStates(res.data.states || []); // assuming res.data.states is the array
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchData = async () => {
    const res = await axios.get('http://localhost:4545/admin/getalldata', getAuthHeaders());
    const actualData = res.data.data; // correct path to the array

    const active = actualData.filter(item => item.status === 'active');
    const inactive = actualData.filter(item => item.status === 'inactive');

    setData(active);
    setInactiveData(inactive);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.city || !form.state) return alert('Both fields required');
    if (editingId) {
      await axios.put(`http://localhost:4545/admin/updatecitystate/${editingId}`, form, getAuthHeaders());
    } else {
      await axios.post('http://localhost:4545/admin/AddCityState', form, getAuthHeaders());
    }
    setForm({ city: '', state: '' });
    setEditingId(null);
    fetchData();
  };

  const handleEdit = (item) => {
    setForm({ city: item.city, state: item.state });
    setEditingId(item._id);
  };

  const activateEntry = async (id) => {
    await axios.patch(`http://localhost:4545/admin/activateentry/${id}`, {}, getAuthHeaders());
    fetchData();
  };

  const softDelete = async (id) => {
    await axios.patch(`http://localhost:4545/admin/softdelete/${id}`);
    fetchData();
  };

  const hardDelete = async (id) => {
    await axios.delete(`http://localhost:4545/admin/harddelete/${id}`, getAuthHeaders());
    fetchData();
  };

  return (
    <div className="p-5">
      <h1 className="text-xl mb-4 font-semibold">City-State Management</h1>



      <div className="flex gap-2 mb-4">
  <input
    type="text"
    name="city"
    value={form.city}
    onChange={handleChange}
    placeholder="Enter city"
    className="border px-2 py-1"
  />


  <select
    name="state"
    value={form.state}
    onChange={handleChange}
    className="border px-2 py-1"
  >
    <option value="">Select state</option>
    {availableStates.map((state, index) => (
      

      <option key={index} value={state._id}>
  {state.state}
</option>

    ))}
  </select>

  {/* Submit Button */}
  <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-1 rounded">
    {editingId ? 'Update' : 'Add'}
  </button>
</div>


      {/* Active List */}
      <h2 className="font-bold">Active Entries</h2>

      {/* Active Search and Sort Controls */}
      <div className="flex justify-between items-center mb-2">
        <input
          type="text"
          value={searchActive}
          onChange={(e) => setSearchActive(e.target.value)}
          placeholder="Search active cities"
          className="border px-2 py-1"
        />
        <button
          onClick={() => setSortActiveAsc(!sortActiveAsc)}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Sort {sortActiveAsc ? 'A-Z' : 'Z-A'}
        </button>
      </div>

      <table className="table-auto border w-full mb-6">
        <thead>
          <tr>
            <th className="border px-2 py-1">City</th>
            <th className="border px-2 py-1">State</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[...data]
            .filter(item =>
              item.city.toLowerCase().includes(searchActive.toLowerCase())
            )
            .sort((a, b) =>
              sortActiveAsc
                ? a.city.localeCompare(b.city)
                : b.city.localeCompare(a.city)
            )
            .map(item => (
              <tr key={item._id}>
                <td className="border px-2 py-1">{item.city}</td>
                <td className="border px-2 py-1">{item.state}</td>
                <td className="border px-2 py-1">{item.date}</td>
                <td className="border px-2 py-1 flex gap-2">
                  <button onClick={() => handleEdit(item)} className="text-yellow-600">Edit</button>
                  <button onClick={() => softDelete(item._id)} className="text-orange-600">Soft Delete</button>
                  <button onClick={() => hardDelete(item._id)} className="text-red-600">Hard Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Inactive List */}
      <h2 className="font-bold">Inactive Entries</h2>

      {/* Inactive Search and Sort Controls */}
      <div className="flex justify-between items-center mb-2 mt-4">
        <input
          type="text"
          value={searchInactive}
          onChange={(e) => setSearchInactive(e.target.value)}
          placeholder="Search inactive cities"
          className="border px-2 py-1"
        />
        <button
          onClick={() => setSortInactiveAsc(!sortInactiveAsc)}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Sort {sortInactiveAsc ? 'A-Z' : 'Z-A'}
        </button>
      </div>

      <table className="table-auto border w-full">
        <thead>
          <tr>
            <th className="border px-2 py-1">City</th>
            <th className="border px-2 py-1">State</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[...inactiveData]
            .filter(item =>
              item.city.toLowerCase().includes(searchInactive.toLowerCase())
            )
            .sort((a, b) =>
              sortInactiveAsc
                ? a.city.localeCompare(b.city)
                : b.city.localeCompare(a.city)
            )
            .map(item => (
              <tr key={item._id}>
                <td className="border px-2 py-1">{item.city}</td>
                <td className="border px-2 py-1">{item.state}</td>
                <td className="border px-2 py-1">{item.date}</td>
                <td className="border px-2 py-1 flex gap-2">
                  <button onClick={() => activateEntry(item._id)} className="text-green-600">Activate</button>
                  {/* <button onClick={() => softDelete(item._id)} className="text-orange-600">Soft Delete</button>
                  <button onClick={() => hardDelete(item._id)} className="text-red-600">Hard Delete</button> */}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ForAdmin;

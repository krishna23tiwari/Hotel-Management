

import React, { useEffect, useState } from "react";
import axios from "axios";

const AddState = () => {
  const [form, setForm] = useState({ state: "", code: "" });
  const [data, setData] = useState([]);
  const [inactiveData, setInactiveData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [searchActive, setSearchActive] = useState("");
  const [searchInactive, setSearchInactive] = useState("");
  const [sortActiveAsc, setSortActiveAsc] = useState(true);
  const [sortInactiveAsc, setSortInactiveAsc] = useState(true);

  useEffect(() => {
    fetchStates();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchStates = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4545/addingstate/showallstate",
        getAuthHeaders()
      );
      const allStates = res.data.data;

      const active = allStates.filter((s) => s.status === "active");
      const inactive = allStates.filter((s) => s.status === "inactive");

      setData(active);
      setInactiveData(inactive);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.state || !form.code) {
      return alert("State name and code are required");
    }
  
    try {
      let response;
      if (editingId) {
    
        response = await axios.put(
          `http://localhost:4545/addingstate/updatestate/${editingId}`,
          form,
          getAuthHeaders()
        );
      } else {
        
        response = await axios.post(
          "http://localhost:4545/addingstate/addstate",
          form,
          getAuthHeaders()
        );
      }
  
      if (response.status === 200) {
        alert(response.data.message); 
      }

      setForm({ state: "", code: "" });
      setEditingId(null);
      fetchStates();
    } catch (err) {

      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        console.error("Error submitting:", err);
        alert("Failed to add state. Please try again.");
      }
    }
  };
  

  

  const handleEdit = (item) => {
    setForm({ state: item.state, code: item.code });
    setEditingId(item._id);
  };

  const activateEntry = async (id) => {
    await axios.patch(
      `http://localhost:4545/addingstate/activateentry/${id}`,
      {},
      getAuthHeaders()
    );
    fetchStates();
  };

  const softDelete = async (id) => {
    await axios.patch(
      `http://localhost:4545/addingstate/softdelete/${id}`,
      {},
      getAuthHeaders()
    );
    fetchStates();
  };

 


  const hardDelete = async (id) => {
    await axios.delete(
      `http://localhost:4545/addingstate/harddelete/${id}`,
      getAuthHeaders()

      
    );
  
    fetchStates();
  };


// const hardDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("token"); // or wherever it's stored
  
//       await axios.delete(
//         `http://localhost:4545/addingstate/harddelete/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
// //       );
  
//       fetchStates();
//     } catch (err) {
//       console.error("Delete Error:", err.response?.data || err.message);
//       alert("Delete failed!");
//     }
//   };
  
  return (
    <div className="p-5">
      <h1 className="text-xl mb-4 font-semibold">State Management</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          name="state"
          value={form.state}
          onChange={handleChange}
          placeholder="Enter state name"
          className="border px-2 py-1"
        />
        <input
          type="text"
          name="code"
          value={form.code}
          onChange={handleChange}
          placeholder="Enter state code"
          className="border px-2 py-1"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      {/* Active Section */}
      <h2 className="font-bold">Active States</h2>

      <div className="flex justify-between items-center mb-2">
        <input
          type="text"
          value={searchActive}
          onChange={(e) => setSearchActive(e.target.value)}
          placeholder="Search active states"
          className="border px-2 py-1"
        />
        <button
          onClick={() => setSortActiveAsc(!sortActiveAsc)}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Sort {sortActiveAsc ? "A-Z" : "Z-A"}
        </button>
      </div>

      <table className="table-auto border w-full mb-6">
        <thead>
          <tr>
            <th className="border px-2 py-1">State</th>
            <th className="border px-2 py-1">State Code</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[...data]
            .filter((item) =>
              item.state.toLowerCase().includes(searchActive.toLowerCase())
            )
            .sort((a, b) =>
              sortActiveAsc
                ? a.state.localeCompare(b.state)
                : b.state.localeCompare(a.state)
            )
            .map((item) => (
              <tr key={item._id}>
                <td className="border px-2 py-1">{item.state}</td>
                <td className="border px-2 py-1">{item.code}</td>
                <td className="border px-2 py-1">{item.date}</td>
                <td className="border px-2 py-1 flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => softDelete(item._id)}
                    className="text-orange-600"
                  >
                    Soft Delete
                  </button>
                  <button
                    onClick={() => hardDelete(item._id)}
                    className="text-red-600"
                  >
                    Hard Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Inactive Section */}
      <h2 className="font-bold">Inactive States</h2>

      <div className="flex justify-between items-center mb-2 mt-4">
        <input
          type="text"
          value={searchInactive}
          onChange={(e) => setSearchInactive(e.target.value)}
          placeholder="Search inactive states"
          className="border px-2 py-1"
        />
        <button
          onClick={() => setSortInactiveAsc(!sortInactiveAsc)}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Sort {sortInactiveAsc ? "A-Z" : "Z-A"}
        </button>
      </div>

      <table className="table-auto border w-full">
        <thead>
          <tr>
            <th className="border px-2 py-1">State</th>
            <th className="border px-2 py-1">State Code</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[...inactiveData]
            .filter((item) =>
              item.state.toLowerCase().includes(searchInactive.toLowerCase())
            )
            .sort((a, b) =>
              sortInactiveAsc
                ? a.state.localeCompare(b.state)
                : b.state.localeCompare(a.state)
            )
            .map((item) => (
              <tr key={item._id}>
                <td className="border px-2 py-1">{item.state}</td>
                <td className="border px-2 py-1">{item.code}</td>
                <td className="border px-2 py-1">{item.date}</td>
                <td className="border px-2 py-1 flex gap-2">
                  <button
                    onClick={() => activateEntry(item._id)}
                    className="text-green-600"
                  >
                    Activate
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddState;

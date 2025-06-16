import React, { useEffect, useState } from "react";
import axios from "axios";
import baseurl from "../BaseUrl";

const ForAdmin = () => {
  const [form, setForm] = useState({ city: "", state: "" });
  const [states, setStates] = useState([]);
  const [data, setData] = useState([]);
  const [activeinactive ,setctiveinactive] = useState([])
  const [inactiveData, setInactiveData] = useState([]);
  const [editingId, setEditingId] = useState(null);


  const [searchActive, setSearchActive] = useState("");
  const [searchInactive, setSearchInactive] = useState("");
  const [sortActiveAsc, setSortActiveAsc] = useState(true);
  const [sortInactiveAsc, setSortInactiveAsc] = useState(true);

  useEffect(() => {
    fetchData();
   
    fetchStatesindropdown();
  }, []);


  // const fetchStatesindropdown = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:4545/addingstate/showallstate",
  //       getAuthHeaders()
  //     );

  //     const activeStates = response.data.data.filter(state => state.status === 'active');
  //     // console.log(`>>>>cityDropDown>>>>>`, response.data.data)
  //     setStates(activeStates);
  //     setctiveinactive(response.data.data)

  //   } catch (error) {
  //     console.error("Error fetching states:", error);
  //     showAlert("error", "Failed to load states");
  //   }
  // };

const fetchStatesindropdown = async () => {
  try {
    const response = await axios.get(
      `${baseurl}addingstate/showallstate`,
      getAuthHeaders()
    );

    const activeStates = response.data.data.filter(state => state.status === 'active');
    // console.log(`>>>>cityDropDown>>>>>`, response.data.data)
    setStates(activeStates);
    setctiveinactive(response.data.data)

  } catch (error) {
    console.error("Error fetching states:", error);
    showAlert("error", "Failed to load states");
  }
};


  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // const fetchData = async () => {
  //   const res = await axios.get(
  //     "http://localhost:4545/admin/getalldata",
  //     getAuthHeaders()
  //   );
  //   const actualData = res.data.data; 

  //   const active = actualData.filter((item) => item.status === "active");
  //   const inactive = actualData.filter((item) => item.status === "inactive");

  //   setData(active);
  //   setInactiveData(inactive);
  // };


  const fetchData = async () => {
  const res = await axios.get(
    `${baseurl}admin/getalldata`,
    getAuthHeaders()
  );
  const actualData = res.data.data; 

  const active = actualData.filter((item) => item.status === "active");
  const inactive = actualData.filter((item) => item.status === "inactive");

  setData(active);
  setInactiveData(inactive);
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


  // const handleSubmit = async () => {
  //   if (!form.city || !form.state) return alert("Both fields required");
  
  //   try {
  //     let response;
  //     if (editingId) {

  //       response = await axios.put(
  //         `http://localhost:4545/admin/updatecitystate/${editingId}`,
  //         form,
  //         getAuthHeaders()
  //       );
  //     } else {
  //       response = await axios.post(
  //         "http://localhost:4545/admin/AddCityState",
  //         form,
  //         getAuthHeaders()
  //       );
  //     }

  //     if (response.status === 200) {
  //       alert(response.data.message); 
  //     }
  
  
  //     setForm({ city: "", state: "" });
  //     setEditingId(null);
  //     fetchData();
  //   } catch (err) {

  //     if (err.response && err.response.data && err.response.data.message) {
  //       alert(err.response.data.message); 
  //       setForm({ city: "", state: "" });
  //     } else {
  //       console.error("Error submitting:", err);
  //       alert("Failed to add or update city-state. Please try again.");
  //     }
  //   }
  // };
  
const handleSubmit = async () => {
  if (!form.city || !form.state) return alert("Both fields required");

  try {
    let response;
    if (editingId) {
      response = await axios.put(
        `${baseurl}admin/updatecitystate/${editingId}`,
        form,
        getAuthHeaders()
      );
    } else {
      response = await axios.post(
        `${baseurl}admin/AddCityState`,
        form,
        getAuthHeaders()
      );
    }

    if (response.status === 200) {
      alert(response.data.message); 
    }

    setForm({ city: "", state: "" });
    setEditingId(null);
    fetchData();
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      alert(err.response.data.message); 
      setForm({ city: "", state: "" });
    } else {
      console.error("Error submitting:", err);
      alert("Failed to add or update city-state. Please try again.");
    }
  }
};

  const handleEdit = (item) => {
    setForm({ city: item.city, state: item.state });
    setEditingId(item._id);
  };


  // const activateEntry = async (id) => {
  //   try {
  //     const res = await axios.patch(
  //       `http://localhost:4545/admin/activateentry/${id}`,
  //       {},
  //       getAuthHeaders()
  //     );
     
  //     alert(res.data.message);
  //     fetchData();
  //   } catch (err) {
  //     if (err.response) {

  //       const { status, data } = err.response;
  //       if (status === 400 || status === 404) {
  //         alert(data.message);
  //       } else if (status >= 500) {
  //         alert("Server error — please try again later.");
  //       } else {
  //         alert("Unexpected error: " + data.message);
  //       }
  //     } else {
     
  //       console.error("Error activating entry:", err);
  //       alert("Network error — please check your connection.");
  //     }
  //   }
  // };
  
  

  // const softDelete = async (id) => {
  //   await axios.patch(`http://localhost:4545/admin/softdelete/${id}`);
  //   fetchData();
  // };

  // const hardDelete = async (id) => {
  //   await axios.delete(
  //     `http://localhost:4545/admin/harddelete/${id}`,
  //     getAuthHeaders()
  //   );
  //   fetchData();
  // };


  const activateEntry = async (id) => {
  try {
    const res = await axios.patch(
      `${baseurl}admin/activateentry/${id}`,
      {},
      getAuthHeaders()
    );
   
    alert(res.data.message);
    fetchData();
  } catch (err) {
    if (err.response) {
      const { status, data } = err.response;
      if (status === 400 || status === 404) {
        alert(data.message);
      } else if (status >= 500) {
        alert("Server error — please try again later.");
      } else {
        alert("Unexpected error: " + data.message);
      }
    } else {
      console.error("Error activating entry:", err);
      alert("Network error — please check your connection.");
    }
  }
};

const softDelete = async (id) => {
  await axios.patch(`${baseurl}admin/softdelete/${id}`, {}, getAuthHeaders());
  fetchData();
};

const hardDelete = async (id) => {
  await axios.delete(
    `${baseurl}admin/harddelete/${id}`,
    getAuthHeaders()
  );
  fetchData();
};
  return (
    <div className="p-2 sm:p-5">
      <h1 className="text-lg sm:text-xl mb-4 font-semibold">City-State Management</h1>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <select
          name="state"
          value={form.state}
          onChange={handleChange}
          className="border px-2 py-1 w-full sm:w-auto"
        >
          <option value="">Select state</option>
          {states.map((state) => (
            <option key={state._id} value={state._id}>
              {state.state}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="Enter city"
          className="border px-2 py-1 w-full sm:w-auto"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-1 rounded w-full sm:w-auto"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      <h2 className="font-bold">Active Entries</h2>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-2 gap-2">
        <input
          type="text"
          value={searchActive}
          onChange={(e) => setSearchActive(e.target.value)}
          placeholder="Search active cities"
          className="border px-2 py-1 w-full sm:w-auto"
        />
        <button
          onClick={() => setSortActiveAsc(!sortActiveAsc)}
          className="bg-gray-300 px-3 py-1 rounded w-full sm:w-auto"
        >
          Sort {sortActiveAsc ? "A-Z" : "Z-A"}
        </button>
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="table-auto border w-full min-w-[600px]">
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
              .filter((item) =>
                item.city.toLowerCase().includes(searchActive.toLowerCase())
              )
              .sort((a, b) =>
                sortActiveAsc
                  ? a.city.localeCompare(b.city)
                  : b.city.localeCompare(a.city)
              )
              .map((item) => (
                <tr key={item._id}>
                  <td className="border px-2 py-1">{item.city}</td>
                  <td className="border px-2 py-1">
                    {item.state?.state ||
                      activeinactive.find((s) => s._id === item.state)?.state ||
                      "Unknown"}
                  </td>
                  <td className="border px-2 py-1">{item.date}</td>
                  <td className="border px-2 py-1">
                    <div className="flex flex-col sm:flex-row gap-2">
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
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-bold">Inactive Entries</h2>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-2 mt-4 gap-2">
        <input
          type="text"
          value={searchInactive}
          onChange={(e) => setSearchInactive(e.target.value)}
          placeholder="Search inactive cities"
          className="border px-2 py-1 w-full sm:w-auto"
        />
        <button
          onClick={() => setSortInactiveAsc(!sortInactiveAsc)}
          className="bg-gray-300 px-3 py-1 rounded w-full sm:w-auto"
        >
          Sort {sortInactiveAsc ? "A-Z" : "Z-A"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto border w-full min-w-[600px]">
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
              .filter((item) =>
                item.city.toLowerCase().includes(searchInactive.toLowerCase())
              )
              .sort((a, b) =>
                sortInactiveAsc
                  ? a.city.localeCompare(b.city)
                  : b.city.localeCompare(a.city)
              )
              .map((item) => (
                <tr key={item._id}>
                  <td className="border px-2 py-1">{item.city}</td>
                  <td className="border px-2 py-1">
                    {item.state?.state ||
                      activeinactive.find((value) => value._id === item.state)?.state ||
                      "Unknown"}
                  </td>
                  <td className="border px-2 py-1">{item.date}</td>
                  <td className="border px-2 py-1">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => activateEntry(item._id)}
                        className="text-green-600"
                      >
                        Activate
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ForAdmin;




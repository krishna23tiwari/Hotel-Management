// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AddHotel = () => {
//   const [form, setForm] = useState({ hotel: "", state: "", city: "",  address: "",email: "",phone: "",room: "",description: ""});
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [data, setData] = useState([]);
//   const [stateprint, setstateprint] = useState([]);
//   const [showdropdown, setshowdropdown] = useState([])
//   const [activedropdowncity, setactivedropdowncity] = useState([])

//   const [inactiveData, setInactiveData] = useState([]); 
//   const [editingId, setEditingId] = useState(null);

//   const [searchActive, setSearchActive] = useState("");
//   const [searchInactive, setSearchInactive] = useState("");
//   const [sortActiveAsc, setSortActiveAsc] = useState(true);
//   const [sortInactiveAsc, setSortInactiveAsc] = useState(true);

  
//   useEffect(() => {
//     fetchStates();
//     fetchCities();
//     fetchData();
//     fetchStatestoprint();
//   }, []);

//   const getAuthHeaders = () => {
//     const token = localStorage.getItem("token");
//     return { headers: { Authorization: `Bearer ${token}` } };
//   };

//   const fetchStates = async () => {
//     const res = await axios.get(
//       "http://localhost:4545/addingstate/showallstate",
//       getAuthHeaders()
//     );

//     console.log(`>>>res.data.hotel`, res.data.data)

//     const activeStates = res.data.data.filter(state => state.status === 'active');
//     setshowdropdown(activeStates)
//     setStates(res.data.data);
//   };

//   const fetchStatestoprint = async () => {
//     const res = await axios.get(
//       "http://localhost:4545/hotelroute/showallstateprint",
//       getAuthHeaders()
//     );
//     console.log(`>>>>>nested-data>>>>>`, res.data)
//     setstateprint(res.data.data);
//   };

//   const fetchCities = async () => {
//     const res = await axios.get(
//       "http://localhost:4545/admin/getalldata",
//       getAuthHeaders()
//     );

//     const activecity = res.data.data.filter(city => city.status === 'active')
//     console.log(`>>>>res.data>>>`, res.data.data)
//     setCities(res.data.data || []);
//     setactivedropdowncity(activecity)
//   };

//   const fetchData = async () => {
//     const res = await axios.get(
//       "http://localhost:4545/hotelroute/getallhotels",
//       getAuthHeaders()
//     );
//     const actualData = res.data.data;
//     setData(actualData.filter((item) => item.status === "active"));
//     console.log("asdas", actualData.filter((item) => item.status === "active"))
//     setInactiveData(actualData.filter((item) => item.status === "inactive"));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async () => {
//     if (!form.hotel || !form.city || !form.state || !form.address || !form.email || !form.phone)
//       return alert("All fields are required");
  
//     try {
//       let response;
      
//       if (editingId) {
        
//         response = await axios.put(
//           `http://localhost:4545/hotelroute/updatehotel/${editingId}`,
//           form,
//           getAuthHeaders()
//         );
//       } else {
        
//         response = await axios.post(
//           "http://localhost:4545/hotelroute/addhotel",
//           form,
//           getAuthHeaders()
//         );
//       }
  
      
//       alert(response.data.message);
      
      
//       setForm({ hotel: "", city: "", state: "",  address: "", email: "", phone: "",room: "", description: "" });
//       setEditingId(null);
//       fetchData();
//     } catch (err) {

//       if (err.response && err.response.data.message) {
//         alert(err.response.data.message); 
        
//       } else {
//         alert("An error occurred. Please try again.");
//       }
//       console.error("Error submitting:", err);
//     }
//   };
 

//   const handleEdit = (item) => {
//     setForm({ hotel: item.hotel, city: item.city, state: item.state, address: item.address, email: item.email, phone: item.phone, room: item.room, description: item.description  });
//     setEditingId(item._id);
//   };


  

//   const softDelete = async (id) => {
//     await axios.patch(
//       `http://localhost:4545/hotelroute/softdeletehotel/${id}`,
//       {},
//       getAuthHeaders()
//     );
//     fetchData();
//   };

//   const hardDelete = async (id) => {
//     await axios.delete(
//       `http://localhost:4545/hotelroute/harddeletehotel/${id}`,
//       getAuthHeaders()
//     );
//     fetchData();
//   };

//   const activateEntry = async (id) => {
//     try {
//       const res = await axios.patch(
//         `http://localhost:4545/hotelroute/activatehotel/${id}`,
//         {},
//         getAuthHeaders()
//       );
      
//       if (res.status === 200) {
//         console.log(res);
//         alert(res.data.message); 
//         fetchData(); 
//       }
//     } catch (err) {
      
//       if (err.response) {
//         const statusCode = err.response.status;
//         const message = err.response.data.message;
  
//         if (statusCode === 400) {
//           alert(message);
//         } else if (statusCode === 500) {
//           alert("Server error occurred, please try again later.");
//         } else {
//           alert("An unknown error occurred.");
//         }
//       } else {
//         console.error("Error activating entry:", err);
//         alert("Failed to activate hotel, state or city is inactive.");
//       }
//     }
//   };
  
 import React, { useEffect, useState } from "react";
import axios from "axios";
import baseurl from "../BaseUrl"; // <-- Add this import

const AddHotel = () => {
  const [form, setForm] = useState({ hotel: "", state: "", city: "",  address: "",email: "",phone: "",room: "",description: ""});
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [data, setData] = useState([]);
  const [stateprint, setstateprint] = useState([]);
  const [showdropdown, setshowdropdown] = useState([])
  const [activedropdowncity, setactivedropdowncity] = useState([])

  const [inactiveData, setInactiveData] = useState([]); 
  const [editingId, setEditingId] = useState(null);

  const [searchActive, setSearchActive] = useState("");
  const [searchInactive, setSearchInactive] = useState("");
  const [sortActiveAsc, setSortActiveAsc] = useState(true);
  const [sortInactiveAsc, setSortInactiveAsc] = useState(true);

  
  useEffect(() => {
    fetchStates();
    fetchCities();
    fetchData();
    fetchStatestoprint();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchStates = async () => {
    const res = await axios.get(
      `${baseurl}addingstate/showallstate`,
      getAuthHeaders()
    );

    console.log(`>>>res.data.hotel`, res.data.data)

    const activeStates = res.data.data.filter(state => state.status === 'active');
    setshowdropdown(activeStates)
    setStates(res.data.data);
  };

  const fetchStatestoprint = async () => {
    const res = await axios.get(
      `${baseurl}hotelroute/showallstateprint`,
      getAuthHeaders()
    );
    console.log(`>>>>>nested-data>>>>>`, res.data)
    setstateprint(res.data.data);
  };

  const fetchCities = async () => {
    const res = await axios.get(
      `${baseurl}admin/getalldata`,
      getAuthHeaders()
    );

    const activecity = res.data.data.filter(city => city.status === 'active')
    console.log(`>>>>res.data>>>`, res.data.data)
    setCities(res.data.data || []);
    setactivedropdowncity(activecity)
  };

  const fetchData = async () => {
    const res = await axios.get(
      `${baseurl}hotelroute/getallhotels`,
      getAuthHeaders()
    );
    const actualData = res.data.data;
    setData(actualData.filter((item) => item.status === "active"));
    console.log("asdas", actualData.filter((item) => item.status === "active"))
    setInactiveData(actualData.filter((item) => item.status === "inactive"));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.hotel || !form.city || !form.state || !form.address || !form.email || !form.phone)
      return alert("All fields are required");
  
    try {
      let response;
      
      if (editingId) {
        
        response = await axios.put(
          `${baseurl}hotelroute/updatehotel/${editingId}`,
          form,
          getAuthHeaders()
        );
      } else {
        
        response = await axios.post(
          `${baseurl}hotelroute/addhotel`,
          form,
          getAuthHeaders()
        );
      }
  
      
      alert(response.data.message);
      
      
      setForm({ hotel: "", city: "", state: "",  address: "", email: "", phone: "",room: "", description: "" });
      setEditingId(null);
      fetchData();
    } catch (err) {

      if (err.response && err.response.data.message) {
        alert(err.response.data.message); 
        
      } else {
        alert("An error occurred. Please try again.");
      }
      console.error("Error submitting:", err);
    }
  };
 

  const handleEdit = (item) => {
    setForm({ hotel: item.hotel, city: item.city, state: item.state, address: item.address, email: item.email, phone: item.phone, room: item.room, description: item.description  });
    setEditingId(item._id);
  };

  const softDelete = async (id) => {
    await axios.patch(
      `${baseurl}hotelroute/softdeletehotel/${id}`,
      {},
      getAuthHeaders()
    );
    fetchData();
  };

  const hardDelete = async (id) => {
    await axios.delete(
      `${baseurl}hotelroute/harddeletehotel/${id}`,
      getAuthHeaders()
    );
    fetchData();
  };

  const activateEntry = async (id) => {
    try {
      const res = await axios.patch(
        `${baseurl}hotelroute/activatehotel/${id}`,
        {},
        getAuthHeaders()
      );
      
      if (res.status === 200) {
        console.log(res);
        alert(res.data.message); 
        fetchData(); 
      }
    } catch (err) {
      
      if (err.response) {
        const statusCode = err.response.status;
        const message = err.response.data.message;
  
        if (statusCode === 400) {
          alert(message);
        } else if (statusCode === 500) {
          alert("Server error occurred, please try again later.");
        } else {
          alert("An unknown error occurred.");
        }
      } else {
        console.error("Error activating entry:", err);
        alert("Failed to activate hotel, state or city is inactive.");
      }
    }
  };
// ...existing code continues...

//   return (
//     <div className="p-5">
//       <h1 className="text-xl mb-4 font-semibold">Hotel Management</h1>

//       {/* <div className="flex gap-2 mb-4 flex-wrap">

//         <select
//           name="state"
//           value={form.state}
//           onChange={handleChange}
//           className="border px-2 py-1"
//         >
//           <option value="">Select state</option>
//           {showdropdown.map((state) => (
//             <option key={state._id} value={state._id}>
//               {state.state}
//             </option>
//           ))}
//         </select>

//         <select
//           name="city"
//           value={form.city}
//           onChange={handleChange}
//           className="border px-2 py-1"
//         >
//           <option value="">Select city</option>
//           {activedropdowncity
//             .filter((c) => c.state === form.state)
//             .map((city) => (
//               <option key={city._id} value={city._id}>
//                 {city.city}
//               </option>
//             ))}
//         </select>

//         <input
//           type="text"
//           name="hotel"
//           value={form.hotel}
//           onChange={handleChange}
//           placeholder="Enter hotel name"
//           className="border px-2 py-1"
//         />

//         <button
//           onClick={handleSubmit}
//           className="bg-blue-500 text-white px-4 py-1 rounded"
//         >
//           {editingId ? "Update" : "Add"}
//         </button>
//       </div> */}

//       <div className="flex gap-2 mb-4 flex-wrap">
//   {/* Existing Selects for state and city */}
//   <select
//     name="state"
//     value={form.state}
//     onChange={handleChange}
//     className="border px-2 py-1"
//   >
//     <option value="">Select state</option>
//     {showdropdown.map((state) => (
//       <option key={state._id} value={state._id}>
//         {state.state}
//       </option>
//     ))}
//   </select>

//   <select
//     name="city"
//     value={form.city}
//     onChange={handleChange}
//     className="border px-2 py-1"
//   >
//     <option value="">Select city</option>
//     {activedropdowncity
//       .filter((c) => c.state === form.state)
//       .map((city) => (
//         <option key={city._id} value={city._id}>
//           {city.city}
//         </option>
//       ))}
//   </select>

//   {/* New Inputs */}
//   <input
//     type="text"
//     name="hotel"
//     value={form.hotel}
//     onChange={handleChange}
//     placeholder="Enter hotel name"
//     className="border px-2 py-1"
//   />

//   <input
//     type="text"
//     name="address"
//     value={form.address}
//     onChange={handleChange}
//     placeholder="Enter hotel address"
//     className="border px-2 py-1"
//   />

//   <input
//     type="email"
//     name="email"
//     value={form.email}
//     onChange={handleChange}
//     placeholder="Enter hotel email"
//     className="border px-2 py-1"
//   />

//   <input
//     type="text"
//     name="phone"
//     value={form.phone}
//     onChange={handleChange}
//     placeholder="Enter hotel phone"
//     className="border px-2 py-1"
//   />

// <input
//     type="text"
//     name="room"
//     value={form.room}
//     onChange={handleChange}
//     placeholder="Enter hotel rooms"
//     className="border px-2 py-1"
//   />


// <input
//     type="text"
//     name="description"
//     value={form.description}
//     onChange={handleChange}
//     placeholder="Enter hotel description"
//     className="border px-2 py-1"
//   />



//   <button
//     onClick={handleSubmit}
//     className="bg-blue-500 text-white px-4 py-1 rounded"
//   >
//     {editingId ? "Update" : "Add"}
//   </button>
// </div>


//       {/* Active Section */}
//       <h2 className="font-bold">Active Hotels</h2>
//       <div className="flex justify-between items-center mb-2">
//         <input
//           type="text"
//           value={searchActive}
//           onChange={(e) => setSearchActive(e.target.value)}
//           placeholder="Search hotels"
//           className="border px-2 py-1"
//         />
//         <button
//           onClick={() => setSortActiveAsc(!sortActiveAsc)}
//           className="bg-gray-300 px-3 py-1 rounded"
//         >
//           Sort {sortActiveAsc ? "A-Z" : "Z-A"}
//         </button>
//       </div>

//       <table className="table-auto border w-full mb-6">
//   <thead>
//     <tr>
//       <th className="border px-2 py-1">Hotel</th>
//       <th className="border px-2 py-1">City</th>
//       <th className="border px-2 py-1">State</th>
//       <th className="border px-2 py-1">Address</th>
//       <th className="border px-2 py-1">Email</th>
//       <th className="border px-2 py-1">Phone</th>
//       <th className="border px-2 py-1">Rooms</th>
//       <th className="border px-2 py-1">Actions</th> {/* Actions LAST */}
//     </tr>
//   </thead>
//   <tbody>
//     {[...data]
//       .filter((item) =>
//         item.hotel.toLowerCase().includes(searchActive.toLowerCase())
//       )
//       .sort((a, b) =>
//         sortActiveAsc
//           ? a.hotel.localeCompare(b.hotel)
//           : b.hotel.localeCompare(a.hotel)
//       )
//       .map((item) => (
//         <tr key={item._id}>
//           <td className="border px-2 py-1">{item.hotel}</td>
//           <td className="border px-2 py-1">
//             {item.city?.city ||
//               cities.find((c) => c._id === item.city)?.city ||
//               "Unknown"}
//           </td>
//           <td className="border px-2 py-1">
//             {item.state?.state ||
//               states.find((s) => s._id === item.city?.state?._id)?.state ||
//               "Unknown"}
//           </td>
//           <td className="border px-2 py-1">{item.address || "N/A"}</td>
//           <td className="border px-2 py-1">{item.email || "N/A"}</td>
//           <td className="border px-2 py-1">{item.phone || "N/A"}</td>
//           <td className="border px-2 py-1">{item.room || "N/A"}</td>
//           <td className="border px-2 py-1 flex gap-2">
//             <button
//               onClick={() => handleEdit(item)}
//               className="text-yellow-600"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => softDelete(item._id)}
//               className="text-orange-600"
//             >
//               Soft Delete
//             </button>
//             <button
//               onClick={() => hardDelete(item._id)}
//               className="text-red-600"
//             >
//               Hard Delete
//             </button>
//           </td>
//         </tr>
//       ))}
//   </tbody>
// </table>


//       {/* Inactive Section */}
//       <h2 className="font-bold">Inactive Hotels</h2>
//       <div className="flex justify-between items-center mb-2">
//         <input
//           type="text"
//           value={searchInactive}
//           onChange={(e) => setSearchInactive(e.target.value)}
//           placeholder="Search hotels"
//           className="border px-2 py-1"
//         />
//         <button
//           onClick={() => setSortInactiveAsc(!sortInactiveAsc)}
//           className="bg-gray-300 px-3 py-1 rounded"
//         >
//           Sort {sortInactiveAsc ? "A-Z" : "Z-A"}
//         </button>
//       </div>

//       <table className="table-auto border w-full">
//         <thead>
//           <tr>
//             <th className="border px-2 py-1">Hotel</th>
//             <th className="border px-2 py-1">City</th>
//             <th className="border px-2 py-1">State</th>
//             <th className="border px-2 py-1">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {[...inactiveData]
//             .filter((item) =>
//               item.hotel.toLowerCase().includes(searchInactive.toLowerCase())
//             )
//             .sort((a, b) =>
//               sortInactiveAsc
//                 ? a.hotel.localeCompare(b.hotel)
//                 : b.hotel.localeCompare(a.hotel)
//             )
//             .map((item) => (
//               <tr key={item._id}>
//                 <td className="border px-2 py-1">{item.hotel}</td>
//                 <td className="border px-2 py-1">
//                   {item.city?.city ||
//                     cities.find((c) => c._id === item.city)?.city ||
//                     "Unknown"}
//                 </td>
//                 {/* <td className="border px-2 py-1">
//                   {item.state?.state ||
//                     states.find((s) => s._id === item.state)?.state ||
//                     "Unknown"}
//                 </td> */}

//                 <td className="border px-2 py-1">
//                   {item.state?.state ||
//                     states.find((s) => s._id === item.city.state._id)?.state ||
//                     "abc"}
//                 </td>
//                 <td className="border px-2 py-1 flex gap-2">
//                   <button
//                     onClick={() => activateEntry(item._id)}
//                     className="text-green-600"
//                   >
//                     Activate
//                   </button>
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );

return (
  <div className="p-4 sm:p-6">
    <h1 className="text-xl mb-4 font-semibold">Hotel Management</h1>

    {/* Responsive Form */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
      <select
        name="state"
        value={form.state}
        onChange={handleChange}
        className="border px-2 py-2 rounded w-full"
      >
        <option value="">Select state</option>
        {showdropdown.map((state) => (
          <option key={state._id} value={state._id}>{state.state}</option>
        ))}
      </select>

      <select
        name="city"
        value={form.city}
        onChange={handleChange}
        className="border px-2 py-2 rounded w-full"
      >
        <option value="">Select city</option>
        {activedropdowncity
          .filter((c) => c.state === form.state)
          .map((city) => (
            <option key={city._id} value={city._id}>{city.city}</option>
          ))}
      </select>

      <input
        type="text"
        name="hotel"
        value={form.hotel}
        onChange={handleChange}
        placeholder="Enter hotel name"
        className="border px-2 py-2 rounded w-full"
      />

      <input
        type="text"
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Enter hotel address"
        className="border px-2 py-2 rounded w-full"
      />

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Enter hotel email"
        className="border px-2 py-2 rounded w-full"
      />

      <input
        type="text"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Enter hotel phone"
        className="border px-2 py-2 rounded w-full"
      />

      <input
        type="text"
        name="room"
        value={form.room}
        onChange={handleChange}
        placeholder="Enter hotel rooms"
        className="border px-2 py-2 rounded w-full"
      />

      <input
        type="text"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Enter hotel description"
        className="border px-2 py-2 rounded w-full col-span-full"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
      >
        {editingId ? "Update" : "Add"}
      </button>
    </div>

    {/* Active Section */}
    <h2 className="font-bold text-lg mb-2">Active Hotels</h2>
    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 mb-3">
      <input
        type="text"
        value={searchActive}
        onChange={(e) => setSearchActive(e.target.value)}
        placeholder="Search hotels"
        className="border px-2 py-2 rounded w-full sm:w-1/2"
      />
      <button
        onClick={() => setSortActiveAsc(!sortActiveAsc)}
        className="bg-gray-300 px-4 py-2 rounded w-full sm:w-auto"
      >
        Sort {sortActiveAsc ? "A-Z" : "Z-A"}
      </button>
    </div>

    <div className="overflow-x-auto mb-6">
      <table className="min-w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-2">Hotel</th>
            <th className="border px-2 py-2">City</th>
            <th className="border px-2 py-2">State</th>
            <th className="border px-2 py-2">Address</th>
            <th className="border px-2 py-2">Email</th>
            <th className="border px-2 py-2">Phone</th>
            <th className="border px-2 py-2">Rooms</th>
            <th className="border px-2 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[...data]
            .filter((item) => item.hotel.toLowerCase().includes(searchActive.toLowerCase()))
            .sort((a, b) =>
              sortActiveAsc
                ? a.hotel.localeCompare(b.hotel)
                : b.hotel.localeCompare(a.hotel)
            )
            .map((item) => (
              <tr key={item._id}>
                <td className="border px-2 py-2">{item.hotel}</td>
                <td className="border px-2 py-2">{item.city?.city || "Unknown"}</td>
                <td className="border px-2 py-2">{item.state?.state || "Unknown"}</td>
                <td className="border px-2 py-2">{item.address || "N/A"}</td>
                <td className="border px-2 py-2">{item.email || "N/A"}</td>
                <td className="border px-2 py-2">{item.phone || "N/A"}</td>
                <td className="border px-2 py-2">{item.room || "N/A"}</td>
                <td className="border px-2 py-2 flex flex-col sm:flex-row gap-1">
                  <button onClick={() => handleEdit(item)} className="text-yellow-600">Edit</button>
                  <button onClick={() => softDelete(item._id)} className="text-orange-600">Soft Delete</button>
                  <button onClick={() => hardDelete(item._id)} className="text-red-600">Hard Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>

    {/* Inactive Section */}
    <h2 className="font-bold text-lg mb-2">Inactive Hotels</h2>
    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 mb-3">
      <input
        type="text"
        value={searchInactive}
        onChange={(e) => setSearchInactive(e.target.value)}
        placeholder="Search hotels"
        className="border px-2 py-2 rounded w-full sm:w-1/2"
      />
      <button
        onClick={() => setSortInactiveAsc(!sortInactiveAsc)}
        className="bg-gray-300 px-4 py-2 rounded w-full sm:w-auto"
      >
        Sort {sortInactiveAsc ? "A-Z" : "Z-A"}
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-2">Hotel</th>
            <th className="border px-2 py-2">City</th>
            <th className="border px-2 py-2">State</th>
            <th className="border px-2 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[...inactiveData]
            .filter((item) => item.hotel.toLowerCase().includes(searchInactive.toLowerCase()))
            .sort((a, b) =>
              sortInactiveAsc
                ? a.hotel.localeCompare(b.hotel)
                : b.hotel.localeCompare(a.hotel)
            )
            .map((item) => (
              <tr key={item._id}>
                <td className="border px-2 py-2">{item.hotel}</td>
                <td className="border px-2 py-2">{item.city?.city || "Unknown"}</td>
                <td className="border px-2 py-2">{item.state?.state || "abc"}</td>
                <td className="border px-2 py-2">
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
  </div>
);

};

export default AddHotel;

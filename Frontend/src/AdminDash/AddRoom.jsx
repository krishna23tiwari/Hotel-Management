// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AddRoom = () => {
//   const [form, setForm] = useState({ hotel: "", state: "", city: "" });
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [data, setData] = useState([]);
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
//     setStates(res.data.data);
//   };

//   const fetchCities = async () => {
//     const res = await axios.get(
//       "http://localhost:4545/admin/getalldata",
//       getAuthHeaders()
//     );
//     setCities(res.data.data || []);
//   };

//   const fetchData = async () => {
//     const res = await axios.get(
//       "http://localhost:4545/hotelroute/getallhotels",
//       getAuthHeaders()
//     );
//     const actualData = res.data.data;
//     setData(actualData.filter((item) => item.status === "active"));
//     setInactiveData(actualData.filter((item) => item.status === "inactive"));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async () => {
//     if (!form.hotel || !form.city || !form.state)
//       return alert("All fields are required");

//     if (editingId) {
//       await axios.put(
//         `http://localhost:4545/hotelroute/updatehotel/${editingId}`,
//         form,
//         getAuthHeaders()
//       );
//     } else {
//       await axios.post(
//         "http://localhost:4545/hotelroute/AddRoom",
//         form,
//         getAuthHeaders()
//       );
//     }

//     setForm({ hotel: "", city: "", state: "" });
//     setEditingId(null);
//     fetchData();
//   };

//   const handleEdit = (item) => {
//     setForm({ hotel: item.hotel, city: item.city, state: item.state });
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
//     await axios.patch(
//       `http://localhost:4545/hotelroute/activatehotel/${id}`,
//       {},
//       getAuthHeaders()
//     );
//     fetchData();
//   };

//   return (
//     <div className="p-5">
//       <h1 className="text-xl mb-4 font-semibold">Hotel Management</h1>

//       <div className="flex gap-2 mb-4 flex-wrap">
//         <input
//           type="text"
//           name="hotel"
//           value={form.hotel}
//           onChange={handleChange}
//           placeholder="Enter hotel name"
//           className="border px-2 py-1"
//         />

//         <select
//           name="state"
//           value={form.state}
//           onChange={handleChange}
//           className="border px-2 py-1"
//         >
//           <option value="">Select state</option>
//           {states.map((state) => (
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
//           {cities
//             .filter((c) => c.state === form.state)
//             .map((city) => (
//               <option key={city._id} value={city._id}>
//                 {city.city}
//               </option>
//             ))}
//         </select>

//         <button
//           onClick={handleSubmit}
//           className="bg-blue-500 text-white px-4 py-1 rounded"
//         >
//           {editingId ? "Update" : "Add"}
//         </button>
//       </div>

//       {/* Active Hotels */}
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
//         <thead>
//           <tr>
//             <th className="border px-2 py-1">Hotel</th>
//             <th className="border px-2 py-1">City</th>
//             <th className="border px-2 py-1">State</th>
//             <th className="border px-2 py-1">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {[...data]
//             .filter((item) =>
//               item.hotel.toLowerCase().includes(searchActive.toLowerCase())
//             )
//             .sort((a, b) =>
//               sortActiveAsc
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
//                 <td className="border px-2 py-1">
//                   {item.state?.state ||
//                     states.find((s) => s._id === item.state)?.state ||
//                     "Unknown"}
//                 </td>
//                 <td className="border px-2 py-1 flex gap-2">
//                   <button
//                     onClick={() => handleEdit(item)}
//                     className="text-yellow-600"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => softDelete(item._id)}
//                     className="text-orange-600"
//                   >
//                     Soft Delete
//                   </button>
//                   <button
//                     onClick={() => hardDelete(item._id)}
//                     className="text-red-600"
//                   >
//                     Hard Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>

//       {/* Inactive Hotels */}
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
//                 <td className="border px-2 py-1">
//                   {item.state?.state ||
//                     states.find((s) => s._id === item.state)?.state ||
//                     "Unknown"}
//                 </td>
//                 <td className="border px-2 py-1 flex gap-2">
//                   <button
//                     onClick={() => activateEntry(item._id)}
//                     className="text-green-600"
//                   >
//                     Activate
//                   </button>
//                   <button
//                     onClick={() => hardDelete(item._id)}
//                     className="text-red-600"
//                   >
//                     Hard Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AddRoom;

import React, { useEffect, useState } from "react";
import axios from "axios";

const AddRoom = () => {
  const [form, setForm] = useState({
    roomName: "",
    roomNumber: "",
    roomType: "",
    price: "",
    image: null, // For storing image
    status: "active", // Default status
  });
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchRooms = async () => {
    const res = await axios.get(
      "http://localhost:4545/roomroute/getallrooms",
      getAuthHeaders()
    );
    setRooms(res.data.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async () => {
    if (!form.roomName || !form.roomNumber || !form.roomType || !form.price)
      return alert("All fields are required");

    const formData = new FormData();
    formData.append("roomName", form.roomName);
    formData.append("roomNumber", form.roomNumber);
    formData.append("roomType", form.roomType);
    formData.append("price", form.price);
    if (form.image) formData.append("image", form.image); // Append image if exists

    if (editingId) {
      await axios.put(
        `http://localhost:4545/roomroute/updateroom/${editingId}`,
        formData,
        getAuthHeaders()
      );
    } else {
      await axios.post(
        "http://localhost:4545/roomroute/addroom",
        formData,
        getAuthHeaders()
      );
    }

    setForm({
      roomName: "",
      roomNumber: "",
      roomType: "",
      price: "",
      image: null,
      status: "active",
    });
    setEditingId(null);
    fetchRooms();
  };

  const handleEdit = (item) => {
    setForm({
      roomName: item.roomName,
      roomNumber: item.roomNumber,
      roomType: item.roomType,
      price: item.price,
      image: null,
      status: item.status,
    });
    setEditingId(item._id);
  };

  const softDelete = async (id) => {
    await axios.patch(
      `http://localhost:4545/roomroute/softdeleteroom/${id}`,
      {},
      getAuthHeaders()
    );
    fetchRooms();
  };

  const hardDelete = async (id) => {
    await axios.delete(
      `http://localhost:4545/roomroute/harddeleteroom/${id}`,
      getAuthHeaders()
    );
    fetchRooms();
  };

  const activateRoom = async (id) => {
    await axios.patch(
      `http://localhost:4545/roomroute/activateroom/${id}`,
      {},
      getAuthHeaders()
    );
    fetchRooms();
  };

  return (
    <div className="p-5">
      <h1 className="text-xl mb-4 font-semibold">Room Management</h1>

      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          type="text"
          name="roomName"
          value={form.roomName}
          onChange={handleChange}
          placeholder="Enter room name"
          className="border px-2 py-1"
        />
        <input
          type="number"
          name="roomNumber"
          value={form.roomNumber}
          onChange={handleChange}
          placeholder="Enter room number"
          className="border px-2 py-1"
        />
        <select
          name="roomType"
          value={form.roomType}
          onChange={handleChange}
          className="border px-2 py-1"
        >
          <option value="">Select room type</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Suite">Suite</option>
        </select>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Enter price"
          className="border px-2 py-1"
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className="border px-2 py-1"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      {/* Room List Section */}
      <h2 className="font-bold">Rooms</h2>
      <div className="flex justify-between items-center mb-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search rooms"
          className="border px-2 py-1"
        />
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Sort {sortAsc ? "A-Z" : "Z-A"}
        </button>
      </div>

      <table className="table-auto border w-full mb-6">
        <thead>
          <tr>
            <th className="border px-2 py-1">Room Name</th>
            <th className="border px-2 py-1">Room Number</th>
            <th className="border px-2 py-1">Room Type</th>
            <th className="border px-2 py-1">Price</th>
            <th className="border px-2 py-1">Image</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[...rooms]
            .filter((item) =>
              item.roomName.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a, b) =>
              sortAsc
                ? a.roomName.localeCompare(b.roomName)
                : b.roomName.localeCompare(a.roomName)
            )
            .map((item) => (
              <tr key={item._id}>
                <td className="border px-2 py-1">{item.roomName}</td>
                <td className="border px-2 py-1">{item.roomNumber}</td>
                <td className="border px-2 py-1">{item.roomType}</td>
                <td className="border px-2 py-1">{item.price}</td>
                <td className="border px-2 py-1">
                  <img
                    src={`http://localhost:4545/${item.image}`}
                    alt="Room"
                    className="w-20 h-20 object-cover"
                  />
                </td>
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
                  <button
                    onClick={() => activateRoom(item._id)}
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

export default AddRoom;

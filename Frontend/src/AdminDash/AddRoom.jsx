import React, { useEffect, useState } from "react";
import axios from "axios";
import baseurl from "../BaseUrl";

const AddRoom = () => {
  // const [form, setForm] = useState({ room: "", hotel: "", city: "", state: "" });
  const [form, setForm] = useState({
    room: '',
    roomNumber: '',
    type: '',
    capacity: '',
    price: '',
    description: '',
    amenities: [], // ✅ Important: should be an array
    image: '',
    hotel: '',
    status: 'active',
  });

  const [states, setStates] = useState([]);
  const [activestates, setactivestates] = useState([])
  const [cities, setCities] = useState([]);
  const [acivecity, setacivecity] = useState([])
  const [hotels, setHotels] = useState([]);
  const [data, setData] = useState([]);
  const [inactiveData, setInactiveData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [images, setImages] = useState([]);

  const [searchActive, setSearchActive] = useState("");
  const [searchInactive, setSearchInactive] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetchStates();
    fetchCities();
    fetchHotels();
    fetchRooms();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // const fetchStates = async () => {
  //   const res = await axios.get("http://localhost:4545/addingstate/showallstate", getAuthHeaders());

  //   const activaeStates = res.data.data.filter(state => state.status === 'active')
  //   setStates(res.data.data);
  //   setactivestates(activaeStates)
  // };

  // const fetchCities = async () => {
  //   const res = await axios.get("http://localhost:4545/admin/getalldata", getAuthHeaders());

  //   const activecity = res.data.data.filter(city => city.status === 'active')
  //   setacivecity(activecity)
  //   setCities(res.data.data || []);
  // };

  // const handleImageChange = (e) => {
  //   setImages(Array.from(e.target.files)); // store FileList as array
  // };

  // const fetchHotels = async () => {
  //   const res = await axios.get("http://localhost:4545/hotelroute/getallhotels", getAuthHeaders());
  //   console.log(`res.hotel`, res.data.data)
  //   setHotels(res.data.data || []);
  // };

  // const fetchRooms = async () => {
  //   const res = await axios.get("http://localhost:4545/roomroute/getallrooms", getAuthHeaders());
  //   const all = res.data.data;
  //   console.log(`>>>rooms>>>>`, all)
  //   setData(all.filter(r => r.status === "active"));
  //   setInactiveData(all.filter(r => r.status === "inactive"));
  // };
// <-- Add this at the top with your imports

const fetchStates = async () => {
  const res = await axios.get(`${baseurl}addingstate/showallstate`, getAuthHeaders());

  const activaeStates = res.data.data.filter(state => state.status === 'active')
  setStates(res.data.data);
  setactivestates(activaeStates)
};

const fetchCities = async () => {
  const res = await axios.get(`${baseurl}admin/getalldata`, getAuthHeaders());

  const activecity = res.data.data.filter(city => city.status === 'active')
  setacivecity(activecity)
  setCities(res.data.data || []);
};

const handleImageChange = (e) => {
  setImages(Array.from(e.target.files)); // store FileList as array
};

const fetchHotels = async () => {
  const res = await axios.get(`${baseurl}hotelroute/getallhotels`, getAuthHeaders());
  console.log(`res.hotel`, res.data.data)
  setHotels(res.data.data || []);
};

const fetchRooms = async () => {
  const res = await axios.get(`${baseurl}roomroute/getallrooms`, getAuthHeaders());
  const all = res.data.data;
  console.log(`>>>rooms>>>>`, all)
  setData(all.filter(r => r.status === "active"));
  setInactiveData(all.filter(r => r.status === "inactive"));
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

//   const handleSubmit = async () => {
//     const { room, hotel, city, state } = form;
//     if (!room || !hotel || !city || !state) return alert("All fields are required");
  
//     const formData = new FormData();
//     formData.append("room", room);
//     formData.append("hotel", hotel);
//     formData.append("city", city);
//     formData.append("state", state);
//     // formData.append("roomType", form.roomType);
//     // formData.append("price", form.price);
//     // formData.append("bedCount", form.bedCount);
//     // formData.append("capacity", form.capacity);
//     formData.append("type", form.type);
// formData.append("roomNumber", form.roomNumber);
// formData.append("capacity", form.capacity);
// formData.append("price", form.price);
// formData.append("description", form.description);
// formData.append("status", form.status);
// form.amenities.forEach((a) => formData.append("amenities", a));

   

  

//     images.forEach((image) => {
//       formData.append("images", image); 
//     });

  
//     try {
//       let res;
//       if (editingId) {
//         res = await axios.put(
//           `http://localhost:4545/roomroute/updateroom/${editingId}`,
//           formData,getAuthHeaders()
          
//         );
//       } else {
//         res = await axios.post(
//           "http://localhost:4545/roomroute/addroom",
//           formData,
//           getAuthHeaders()
//         );
//       }
  
//       alert(res.data.message);
//       setForm({
//         // room: "",
//         // hotel: "",
//         // city: "",
//         // state: "",
//         // roomType: "",
//         // price: "",
//         // bedCount: "",
//         // capacity: "",

//         room: '',
//         roomNumber: '',
//         type: '',
//         capacity: '',
//         price: '',
//         description: '',
//         amenities: [], 
//         image: '',
//         hotel: '',
//         status: 'active',
        
//       });
      
//       // setForm({ room: "", hotel: "", city: "", state: "" });
//       setImages([]);
//       setEditingId(null);
//       fetchRooms();
//     } catch (err) {
//       alert(err.response?.data?.message || "Something went wrong.");
//     }
//   };

const handleSubmit = async () => {
  const { room, hotel, city, state } = form;
  if (!room || !hotel || !city || !state) return alert("All fields are required");

  const formData = new FormData();
  formData.append("room", room);
  formData.append("hotel", hotel);
  formData.append("city", city);
  formData.append("state", state);
  formData.append("type", form.type);
  formData.append("roomNumber", form.roomNumber);
  formData.append("capacity", form.capacity);
  formData.append("price", form.price);
  formData.append("description", form.description);
  formData.append("status", form.status);
  form.amenities.forEach((a) => formData.append("amenities", a));

  images.forEach((image) => {
    formData.append("images", image); 
  });

  try {
    let res;
    if (editingId) {
      res = await axios.put(
        `${baseurl}roomroute/updateroom/${editingId}`,
        formData,
        getAuthHeaders()
      );
    } else {
      res = await axios.post(
        `${baseurl}roomroute/addroom`,
        formData,
        getAuthHeaders()
      );
    }

    alert(res.data.message);
    setForm({
      room: '',
      roomNumber: '',
      type: '',
      capacity: '',
      price: '',
      description: '',
      amenities: [], 
      image: '',
      hotel: '',
      status: 'active',
    });
    setImages([]);
    setEditingId(null);
    fetchRooms();
  } catch (err) {
    alert(err.response?.data?.message || "Something went wrong.");
  }
};  

const handleEdit = (item) => {
    setForm({
      room: item.room,
      hotel: item.hotel._id || item.hotel,
      city: item.hotel?.city?.city || item.city,
      state: item.hotel?.city?.state?.state || item.state,
    });
    setEditingId(item._id);
  };

  // const softDelete = async (id) => {
  //   await axios.patch(`http://localhost:4545/roomroute/softdeleteroom/${id}`, {}, getAuthHeaders());
  //   fetchRooms();
  // };

  // const hardDelete = async (id) => {
  //   await axios.delete(`http://localhost:4545/roomroute/harddeleteroom/${id}`, getAuthHeaders());
  //   fetchRooms();
  // };

  // const activateEntry = async (id) => {
  //   try {
  //     const res = await axios.patch(
  //       `http://localhost:4545/roomroute/activateroom/${id}`,
  //       {},
  //       getAuthHeaders()
  //     );
  //     alert(res.data.message);
  //     fetchRooms();
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

  const softDelete = async (id) => {
  await axios.patch(`${baseurl}roomroute/softdeleteroom/${id}`, {}, getAuthHeaders());
  fetchRooms();
};

const hardDelete = async (id) => {
  await axios.delete(`${baseurl}roomroute/harddeleteroom/${id}`, getAuthHeaders());
  fetchRooms();
};

const activateEntry = async (id) => {
  try {
    const res = await axios.patch(
      `${baseurl}roomroute/activateroom/${id}`,
      {},
      getAuthHeaders()
    );
    alert(res.data.message);
    fetchRooms();
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


  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
  
    setForm((prevForm) => {
      const amenities = prevForm.amenities;
  
      if (checked) {
      
        return { ...prevForm, amenities: [...amenities, value] };
      } else {
        
        return { ...prevForm, amenities: amenities.filter((item) => item !== value) };
      }
    });
  };
  
  

  return (


<div className="p-6 bg-gray-50 min-h-screen">
  <h1 className="text-2xl font-bold mb-6 text-blue-800">Room Management</h1>

  {/* --- Form Section --- */}
  <div className="flex gap-3 mb-6 flex-wrap items-center">
    <select name="state" value={form.state} onChange={handleChange} className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
      <option value="">Select State</option>
      {activestates.map((s) => (
        <option key={s._id} value={s._id}>{s.state}</option>
      ))}
    </select>

    <select name="city" value={form.city} onChange={handleChange} className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
      <option value="">Select City</option>
      {acivecity.filter(c => c.state === form.state).map((c) => (
        <option key={c._id} value={c._id}>{c.city}</option>
      ))}
    </select>

    <select name="hotel" value={form.hotel} onChange={handleChange} className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
      <option value="">Select Hotel</option>
      {hotels.filter(h => h.city._id === form.city).map((h) => (
        <option key={h._id} value={h._id}>{h.hotel}</option>
      ))}
    </select>

    <input
      name="room"
      value={form.room}
      onChange={handleChange}
      placeholder="Enter room name"
      className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

<input
  name="roomNumber"
  type="text"
  placeholder="Room Number"
  value={form.roomNumber}
  onChange={handleChange}
  className="border px-3 py-2 rounded"
/>

<select name="type" value={form.type} onChange={handleChange} className="border px-3 py-2 rounded">
  <option value="">Select Room Type</option>
  <option value="Standard">Standard</option>
  <option value="Deluxe">Deluxe</option>
  <option value="Suite">Suite</option>
  <option value="Premium">Premium</option>
  <option value="Executive">Executive</option>
</select>

<input
  name="capacity"
  type="number"
  min="1"         
  max="10"  
  placeholder="Capacity"
  value={form.capacity}
  onChange={handleChange}
  className="border px-3 py-2 rounded"
/>

<input
  name="price"
  type="number"
  min="0"   
  placeholder="Price"
  value={form.price}
  onChange={handleChange}
  className="border px-3 py-2 rounded"
/>

<input
  name="description"
  type="text"
  placeholder="Room Description"
  value={form.description}
  onChange={handleChange}
  className="border px-3 py-2 rounded"
/>

{/* Amenities as multiple checkboxes or multi-select */}
<label className="block">Amenities:</label>
<div className="flex flex-wrap gap-2">
  {["AC", "WiFi", "TV", "Mini Fridge", "Balcony", "Heater"].map((item) => (
    <label key={item}>
      <input
        type="checkbox"
        name="amenities"
        value={item}
        checked={form.amenities?.includes(item)}
        onChange={handleAmenitiesChange}
      />{" "}
      {item}
    </label>
  ))}
</div>




    {/* Upload Image */}
    <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">
      Upload Images
      <input
        type="file"
        name="image"
        multiple
        onChange={handleImageChange}
        className="hidden"
      />
    </label>

    <button
      onClick={handleSubmit}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
    >
      {editingId ? "Update" : "Add"}
    </button>
  </div>

  {/* Preview Images */}
  {images.length > 0 && (
    <div className="flex gap-3 flex-wrap mb-6">
      {images.map((img, i) => (
        <img key={i} src={URL.createObjectURL(img)} alt="preview" className="w-20 h-20 rounded shadow object-cover" />
      ))}
    </div>
  )}

  {/* Active Rooms Table */}
  <h2 className="font-semibold text-lg text-green-700 mb-2">Active Rooms</h2>

  <div className="flex justify-between items-center mb-3">
    <input
      value={searchActive}
      onChange={(e) => setSearchActive(e.target.value)}
      placeholder="Search room"
      className="border px-3 py-2 rounded w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <button
      onClick={() => setSortAsc(!sortAsc)}
      className="ml-3 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
    >
      Sort {sortAsc ? "A-Z" : "Z-A"}
    </button>
  </div>

  <table className="w-full border table-auto mb-8 text-sm">
    <thead className="bg-gray-100">
      <tr>
        <th className="border px-3 py-2 font-medium">Room</th>
        <th className="border px-3 py-2 font-medium">Hotel</th>
        <th className="border px-3 py-2 font-medium">City</th>
        <th className="border px-3 py-2 font-medium">State</th>
        <th className="border px-3 py-2 font-medium">Images</th>
        <th className="border px-3 py-2 font-medium">Actions</th>
      </tr>
    </thead>
    <tbody>
      {[...data]
        .filter(r => r.room.toLowerCase().includes(searchActive.toLowerCase()))
        .sort((a, b) => sortAsc ? a.room.localeCompare(b.room) : b.room.localeCompare(a.room))
        .map(r => (
          <tr key={r._id} className="text-center">
            <td className="border px-2 py-2">{r.room}</td>
            <td className="border px-2 py-2">{r.hotel?.hotel || hotels.find(h => h._id === r.hotel)?.hotel || "?"}</td>
            <td className="border px-2 py-2">{r.hotel?.city?.city || "?"}</td>
            <td className="border px-2 py-2">{r.hotel?.city?.state?.state || "?"}</td>
          
<td className="border px-2 py-2">
  {r.image?.length > 0 ? (
    <div className="flex gap-2 justify-center flex-wrap">
      {r.image.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`room-${i}`}
          className="w-14 h-14 rounded object-cover shadow"
        />
      ))}
    </div>
  ) : (
    <span className="text-gray-400 italic">No images</span>
  )}
</td>

{/* Actions column */}
<td className="border px-2 py-2">
  <div className="flex gap-2 justify-center flex-wrap">
    <button
      onClick={() => handleEdit(r)}
      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
    >
      Edit
    </button>
    <button
      onClick={() => softDelete(r._id)}
      className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition"
    >
      Soft Delete
    </button>
    <button
      onClick={() => hardDelete(r._id)}
      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
    >
      Hard Delete
    </button>
  </div>
</td>

          </tr>
        ))}
    </tbody>
  </table>

  {/* Inactive Rooms */}
  <h2 className="font-semibold text-lg text-red-700 mb-2">Inactive Rooms</h2>
  <input
    value={searchInactive}
    onChange={(e) => setSearchInactive(e.target.value)}
    placeholder="Search room"
    className="border px-3 py-2 rounded w-full max-w-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
  <table className="w-full border table-auto text-sm">
    <thead className="bg-gray-100">
      <tr>
        <th className="border px-3 py-2 font-medium">Room</th>
        <th className="border px-3 py-2 font-medium">Hotel</th>
        <th className="border px-3 py-2 font-medium">City</th>
        <th className="border px-3 py-2 font-medium">State</th>
        <th className="border px-3 py-2 font-medium">Images</th>
        <th className="border px-3 py-2 font-medium">Actions</th>
      </tr>
    </thead>
    <tbody>
      {inactiveData
        .filter(r => r.room.toLowerCase().includes(searchInactive.toLowerCase()))
        .map(r => (
          <tr key={r._id} className="text-center">
            <td className="border px-2 py-2">{r.room}</td>
            <td className="border px-2 py-2">{r.hotel?.hotel || hotels.find(h => h._id === r.hotel)?.hotel || "?"}</td>
            <td className="border px-2 py-2">{r.hotel?.city?.city || "?"}</td>
            <td className="border px-2 py-2">{r.hotel?.city?.state?.state || "?"}</td>
             <td className="border px-2 py-2 flex gap-2 justify-center flex-wrap">
              {r.image?.length > 0 ? (
                r.image.map((img, i) => (
                  <img key={i} src={img} alt={`room-${i}`} className="w-14 h-14 rounded object-cover shadow" />
                ))
              ) : "No images"}
            </td>
            
          

            <td className="border px-2 py-2">
  <div className="flex gap-2 justify-center flex-wrap">
  <button onClick={() => activateEntry(r._id)} className="text-green-600 hover:underline">Activate</button>
  <button onClick={() => hardDelete(r._id)} className="text-red-600 hover:underline">Hard Delete</button>
  </div>
</td>
          </tr>
        ))}
    </tbody>
  </table>
</div>

  );
};

export default AddRoom;

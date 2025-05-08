import React, { useState, useEffect } from "react";
import axios from "axios";
import { LuX, LuHotel, LuBedDouble, LuInfo, LuImage } from "react-icons/lu";
import { useNavigate } from "react-router";

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const navi = useNavigate();

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };


  const uniqueStates = [...new Set(rooms.map(room => room.hotel.city.state.state))];

const citiesByState = rooms.reduce((acc, room) => {
  const state = room.hotel.city.state.state;
  const city = room.hotel.city.city;
  if (!acc[state]) {
    acc[state] = new Set();
  }
  acc[state].add(city);
  return acc;
}, {});





  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomRes, stateRes, cityRes] = await Promise.all([
          axios.get("http://localhost:4545/roomroute/getallrooms", getAuthHeaders()),
          axios.get("http://localhost:4545/addingstate/showallstate", getAuthHeaders()),
          axios.get("http://localhost:4545/admin/getalldata", getAuthHeaders())
        ]);
  
        setRooms(roomRes.data.data);
        setStates(stateRes.data.data);
        setCities(cityRes.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);


  const filteredAndSortedRooms = rooms
  .filter((room) => {
    const hotelName = room?.hotel?.hotel?.toLowerCase() || "";
    const roomName = room?.room?.toLowerCase() || "";
    const stateName = room?.hotel?.city?.state?.state || "";
    const cityName = room?.hotel?.city?.city || "";

    const matchesSearch = hotelName.includes(searchTerm.toLowerCase()) || roomName.includes(searchTerm.toLowerCase());
    const matchesState = selectedState ? stateName === selectedState : true;
    const matchesCity = selectedCity ? cityName === selectedCity : true;

    return matchesSearch && matchesState && matchesCity;
  })
  .sort((a, b) => {
    if (sortBy === "asc") {
      return a?.hotel?.hotel?.localeCompare(b?.hotel?.hotel || "") || 0;
    } else if (sortBy === "desc") {
      return b?.hotel?.hotel?.localeCompare(a?.hotel?.hotel || "") || 0;
    } else {
      return 0;
    }
  });

  const handleBooking = (room) => {
    const isLoggedIn = localStorage.getItem("token");

    // if (isLoggedIn) {
    //   navi("/user-booking-form", {
    //     state: { selectedRoom, hotel: selectedRoom?.hotel }
    //   });
    if (isLoggedIn) {
      navi(`/user-booking-form/${room}`);
    } else {
      navi("/");
    }

  }


  const handleCardClick = (room) => {
    setSelectedRoom(room);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedRoom(null);
    setCurrentImage(null);
  };

  const handleImageClick = (img) => {
    setCurrentImage(img);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    // <div className="p-4">
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
<div className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/462014/pexels-photo-462014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
    <div className="absolute inset-0 bg-opacity-50"></div>

    {/* Site Name */}
    <div className="absolute top-4 left-6 z-10">
      <h1 className="text-3xl font-sans text-white">FindMyStay</h1>
    </div>

    {/* Filters & Search */}
    <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center">
      <div className="flex flex-wrap items-center gap-4 bg-opacity-40 p-6 rounded-xl ">
        {/* State Dropdown */}
        <select
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedCity("");
          }}
          className="p-2 border-gray-700 rounded-md w-36 bg-gray-800 text-white"
        >
          <option value="">State</option>
          {uniqueStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        {/* City Dropdown */}
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="p-2 border-gray-700 rounded-md w-36 bg-gray-800 text-white"
          disabled={!selectedState}
        >
          <option value="">City</option>
          {selectedState &&
            Array.from(citiesByState[selectedState] || []).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
        </select>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by hotel or room..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border-gray-700 rounded-md min-w-[200px] flex-1 bg-gray-800 text-white"
        />

        {/* Sorting */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border-gray-700 rounded-md w-48 bg-gray-800 text-white"
        >
          <option value="">Sort By</option>
          <option value="asc">Hotel Name (A-Z)</option>
          <option value="desc">Hotel Name (Z-A)</option>
        </select>
      </div>
    </div>
  </div>


      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {filteredAndSortedRooms.map((room) => (
          <div
  key={room._id}

  className="cursor-pointer border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transform transition duration-300"
  onClick={() => handleCardClick(room)}
>
  <div className="mb-2">
    {room.image.length > 0 ? (
      <img
        src={room.image[0]}
        alt={room.room}
        className="w-full h-48 object-cover rounded-xl border border-gray-700"
      />
    ) : (
      <div className="w-full h-48 bg-gray-700 rounded-xl"></div>
    )}
  </div>

  <div className="p-2 space-y-1">
    <h3 className="text-lg font-bold text-indigo-400">{room.hotel.hotel}</h3>
    <p className="text-sm text-gray-300">
      <span className="font-medium text-gray-400">State:</span> {room.hotel.city.state.state}
    </p>
    <p className="text-sm text-gray-300">
      <span className="font-medium text-gray-400">City:</span> {room.hotel.city.city}
    </p>
    <p className="text-sm text-gray-300">
      <span className="font-medium text-gray-400">Email:</span> {room.hotel.email}
    </p>
    <p className="text-sm text-gray-300">
      <span className="font-medium text-gray-400">Phone:</span> {room.hotel.phone}
    </p>
    <p className="text-sm text-gray-300">
      <span className="font-medium text-gray-400">Room No:</span> {room.room}
    </p>
  </div>
</div>

        ))}
      </div>

      {isPopupOpen && selectedRoom && (

   <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-opacity-95 flex items-center justify-center px-4">
  <div className="bg-gradient-to-br from-[#1f1f1f] to-[#2c2c2c] rounded-3xl shadow-2xl p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto relative text-white transition-all">

    <button
      onClick={handleClosePopup}
      className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
    >
      <LuX className="h-6 w-6" />
    </button>

    <div className="mb-6">
      <h2 className="text-3xl font-bold text-white flex items-center gap-2">
        <LuHotel className="text-blue-400" />
        {selectedRoom.hotel?.hotel}
      </h2>
      <p className="text-sm text-gray-300">
        {selectedRoom.hotel?.city?.city}, {selectedRoom.hotel?.city?.state?.state}
      </p>
    </div>

    {/* Info Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-5 rounded-2xl shadow hover:shadow-xl transition">
        <h3 className="text-lg font-semibold text-blue-300 mb-2 flex items-center gap-2">
          <LuInfo /> Hotel Info
        </h3>
        <ul className="text-sm text-gray-200 space-y-1">
          <li><strong>Email:</strong> {selectedRoom.hotel?.email}</li>
          <li><strong>Phone:</strong> {selectedRoom.hotel?.phone}</li>
          <li><strong>City:</strong> {selectedRoom.hotel?.city?.city}</li>
          <li><strong>State:</strong> {selectedRoom.hotel?.city?.state?.state}</li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-5 rounded-2xl shadow hover:shadow-xl transition">
        <h3 className="text-lg font-semibold text-green-300 mb-2 flex items-center gap-2">
          <LuBedDouble /> Room Details
        </h3>
        <ul className="text-sm text-gray-200 space-y-1">
          <li><strong>Room No:</strong> {selectedRoom.roomNumber}</li>
          <li><strong>Type:</strong> {selectedRoom.type}</li>
          <li><strong>Capacity:</strong> {selectedRoom.capacity}</li>
          <li><strong>Price:</strong> ₹{selectedRoom.price}</li>
          <li>
            <strong>Status:</strong>
            <span
              className={`ml-2 text-xs font-medium px-2 py-1 rounded-full ${
                selectedRoom.status === "available"
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {selectedRoom.status}
            </span>
          </li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-5 rounded-2xl shadow md:col-span-2 hover:shadow-xl transition">
        <h3 className="text-lg font-semibold text-yellow-300 mb-2 flex items-center gap-2">
          <LuInfo /> Description
        </h3>
        <p className="text-sm text-gray-300">
          {selectedRoom.description || "No description provided."}
        </p>
      </div>

      <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-5 rounded-2xl shadow md:col-span-2 hover:shadow-xl transition">
        <h3 className="text-lg font-semibold text-purple-300 mb-2 flex items-center gap-2">
          <LuInfo /> Amenities
        </h3>
        <p className="text-sm text-gray-300">
          {selectedRoom.amenities?.length > 0
            ? selectedRoom.amenities.join(", ")
            : "No amenities listed."}
        </p>
      </div>
    </div>

    {/* Image Grid with Custom Layout */}
    {selectedRoom.image?.length > 0 && (
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-indigo-300 mb-3 flex items-center gap-2">
          <LuImage /> Room Images
        </h3>
        <div className="grid grid-cols-7 grid-rows-6 gap-2 parent">
          {selectedRoom.image.slice(0, 5).map((img, index) => (
            <div
              key={index}
              className={`rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform cursor-pointer ${
                index === 0
                  ? "col-span-2 row-span-3"
                  : index === 1
                  ? "col-span-3 row-span-3"
                  : index === 2
                  ? "col-span-2 row-span-3"
                  : index === 3
                  ? "col-span-3 row-span-3"
                  : "col-span-2 row-span-6"
              }`}
            >
              <img
                src={img}
                alt={`Room ${index + 1}`}
                className="w-full h-full object-cover"
                onClick={() => handleImageClick(img)}
              />
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Book Now Button */}
    <div className="mt-8 flex justify-end">
      <button
        onClick={() => handleBooking(selectedRoom._id)}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-xl shadow-lg transition-all duration-300"
      >
        Book Now
      </button>
    </div>
  </div>
</div>

      )}

      {currentImage && (
  <div
    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999]"
    onClick={() => setCurrentImage(null)}
  >
    <div
      className="relative max-w-6xl w-full p-4"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setCurrentImage(null)}
        className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
      >
        &times;
      </button>
      <img
        src={currentImage}
        alt="Full View"
        className="w-full max-h-[90vh] object-contain rounded-lg shadow-xl transition-transform duration-300"
      />
    </div>
  </div>
)}

    </div>
  );
};

export default RoomsPage;

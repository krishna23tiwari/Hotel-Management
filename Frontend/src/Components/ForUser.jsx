import React, { useState, useEffect } from "react";
import axios from "axios";
import { LuX, LuHotel, LuBedDouble, LuInfo, LuImage, LuPhone, LuMail, LuMapPin } from "react-icons/lu";
import { useNavigate } from "react-router";
import {  useSelector } from "react-redux";
import baseurl from "../BaseUrl";


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
  const [showHotelPopup, setShowHotelPopup] = useState(false);

  // const dispatch = useDispatch()

  const darkMode = useSelector((state) => state.theme.darkMode)

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


const handleHotelClick = (hotel) => {
  setSelectedHotel(hotel);
  setShowHotelPopup(true); // first popup
};




  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [roomRes, stateRes, cityRes] = await Promise.all([
  //         axios.get("http://localhost:4545/roomroute/getallrooms", getAuthHeaders()),
  //         axios.get("http://localhost:4545/addingstate/showallstate", getAuthHeaders()),
  //         axios.get("http://localhost:4545/admin/getalldata", getAuthHeaders())
  //       ]);
  
  //       setRooms(roomRes.data.data);
  //       setStates(stateRes.data.data);
  //       setCities(cityRes.data.data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError(err.message);
  //       setLoading(false);
  //     } 
  //   };
  
  //   fetchData();
  // }, []);


  useEffect(() => {
  const fetchData = async () => {
    try {
      const [roomRes, stateRes, cityRes] = await Promise.all([
        axios.get(`${baseurl}roomroute/getallrooms`, getAuthHeaders()),
        axios.get(`${baseurl}addingstate/showallstate`, getAuthHeaders()),
        axios.get(`${baseurl}admin/getalldata`, getAuthHeaders())
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

  const mainBg = darkMode
  ? "bg-black bg-opacity-70 backdrop-blur-md"
  : "bg-white";
const textColor = darkMode ? "text-gray-100" : "text-gray-900";
const subText = darkMode ? "text-gray-400" : "text-gray-600";
const cardBg = darkMode
  ? "bg-white bg-opacity-5 border border-gray-700"
  : "bg-gray-50";
const shadow = "shadow-xl hover:shadow-2xl transition-all duration-300";

  return (
   
    

    <div className={`min-h-screen transition-all duration-300 ease-in
      ${darkMode 
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white" 
        : "bg-gradient-to-br from-blue-100 via-white to-blue-200 text-gray-900"
      }`}
    >
     
<div className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/462014/pexels-photo-462014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
    <div className="absolute inset-0 bg-opacity-50"></div>

    
    <div className="absolute top-4 left-6 z-10">

    </div>

    
    <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center">
      <div className="flex flex-wrap items-center gap-4 bg-opacity-40 p-6 rounded-xl ">
        
        <select
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedCity("");
          }}
          className={`p-2 rounded-md w-36 transition-all duration-300 ease-in
    ${darkMode 
      ? "bg-gray-800 text-white border-gray-700" 
      : "bg-white text-black border-gray-300"}`}

        >
          <option value="">State</option>
          {uniqueStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className={`p-2 rounded-md w-36 transition-all duration-300 ease-in
    ${darkMode 
      ? "bg-gray-800 text-white border-gray-700" 
      : "bg-white text-black border-gray-300"}`}

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

       
        <input
          type="text"
          placeholder="Search by hotel or room..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`p-2 rounded-md min-w-[200px] flex-1 transition-all duration-300 ease-in
    ${darkMode 
      ? "bg-gray-800 text-white border-gray-700"
      : "bg-white text-black border-gray-300"}`}
        />

        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={`p-2 rounded-md min-w-[200px] flex-1 transition-all duration-300 ease-in
    ${darkMode 
      ? "bg-gray-800 text-white border-gray-700"
      : "bg-white text-black border-gray-300"}`}
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
      onClick={() => handleCardClick(room)}
      className={`cursor-pointer rounded-2xl p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transform transition duration-300
        ${darkMode
          ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white border border-gray-700"
          : "bg-gradient-to-br from-white to-blue-100 text-gray-900 border border-gray-300"
        }`}
    >
      <div className="mb-2">
        {room.image.length > 0 ? (
          <img
            src={room.image[0]}
            alt={room.room}
            className={`w-full h-48 object-cover rounded-xl border 
              ${darkMode ? "border-gray-700" : "border-gray-300"}`}
          />
        ) : (
          <div className={`w-full h-48 rounded-xl 
            ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}></div>
        )}
      </div>

      <div className="p-2 space-y-1">
        <h3 className={`text-lg font-bold ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>
          {room.hotel.hotel}
        </h3>

        <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          <span className={`font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            State:
          </span> {room.hotel.city.state.state}
        </p>

        <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          <span className={`font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            City:
          </span> {room.hotel.city.city}
        </p>

        <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          <span className={`font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Email:
          </span> {room.hotel.email}
        </p>

        <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          <span className={`font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Phone:
          </span> {room.hotel.phone}
        </p>

        <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          <span className={`font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Room No:
          </span> {room.room}
        </p>
      </div>
    </div>
  ))}
</div>

      

      {isPopupOpen && selectedRoom && (

    
  <div
  className={`fixed inset-0 z-50 flex items-center justify-center px-4 
    ${darkMode ? "bg-black bg-opacity-70 backdrop-blur-md" : "bg-white bg-opacity-70 backdrop-blur-md"}`}>
  <div
    className={`rounded-3xl p-8 w-full max-w-6xl max-h-[90vh] overflow-y-auto relative shadow-2xl transition-all duration-300
      ${darkMode 
        ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white" 
        : "bg-gradient-to-br from-gray-100 to-white text-black"}`}>

    
    <button
      onClick={handleClosePopup}
      className="absolute top-5 right-5 text-gray-400 hover:text-red-500 transition"
    >
      <LuX className="h-6 w-6" />
    </button>

  
    <div className="mb-6 border-b border-gray-600 pb-4">
      <h2 className="text-4xl font-bold flex items-center gap-3 text-pink-400">
        <LuBedDouble />
        {selectedRoom?.hotel?.hotel}
      </h2>
      <p className={`text-sm flex items-center gap-2 mt-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
>
        <LuMapPin className="text-yellow-400" />
        {selectedRoom?.hotel?.city?.city}, {selectedRoom?.hotel?.city?.state?.state}
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-gray-700 shadow-md">
        <h3 className="text-xl font-semibold text-blue-400 mb-3 flex items-center gap-2">
          <LuInfo /> Hotel Info
        </h3>
        {/* <ul className="space-y-2 text-sm text-gray-800"> */}
        <ul className={`space-y-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>

          <li className="flex items-center gap-2"><LuMail /> {selectedRoom.hotel?.email}</li>
          <li className="flex items-center gap-2"><LuPhone /> {selectedRoom.hotel?.phone}</li>
          <li>City: {selectedRoom.hotel?.city?.city}</li>
          <li>State: {selectedRoom.hotel?.city?.state?.state}</li>
        </ul>
      </div>

      {/* <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-gray-700 shadow-md"> */}
      <div className={`${darkMode 
  ? "bg-white/5 border border-gray-700 text-gray-300" 
  : "bg-white border border-gray-200 text-gray-800"} 
  backdrop-blur-md p-5 rounded-2xl shadow-md`}>

        <h3 className="text-xl font-semibold text-green-400 mb-3 flex items-center gap-2">
          <LuBedDouble /> Room Info
        </h3>
        {/* <ul className="space-y-2 text-sm text-gray-300"> */}
        <ul className={`space-y-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>

          <li>Room #: {selectedRoom.roomNumber}</li>
          <li>Type: {selectedRoom.type}</li>
          <li>Capacity: {selectedRoom.capacity}</li>
          <li>Price: ₹{selectedRoom.price}</li>
          <li>
            Status:
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
              selectedRoom.status === "available"
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}>
              {selectedRoom.status}
            </span>
          </li>
        </ul>
      </div>

      <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-gray-700 shadow-md">
        <h3 className="text-xl font-semibold text-purple-400 mb-3 flex items-center gap-2">
          <LuInfo /> Amenities
        </h3>
        {/* <p className="text-sm text-gray-300"> */}
        <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>

          {selectedRoom.amenities?.length > 0
            ? selectedRoom.amenities.join(", ")
            : "No amenities listed."}
        </p>
      </div>
    </div>

  
    <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-gray-700 shadow-md mt-6">
      <h3 className="text-xl font-semibold text-yellow-400 mb-3 flex items-center gap-2">
        <LuInfo /> Description
      </h3>
      {/* <p className="text-sm text-gray-300"> */}
      <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>

        {selectedRoom.description || "No description provided."}
      </p>
    </div>

 
    {selectedRoom.image?.length > 0 && (
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-pink-400 mb-4 flex items-center gap-2">
          <LuImage /> Room Images
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {selectedRoom.image.slice(0, 5).map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl transform hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-700"
              onClick={() => handleImageClick(img)}
            >
              <img
                src={img}
                alt={`Room ${index + 1}`}
                className="w-full h-40 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    )}


    <div className="mt-10 flex justify-end">
      <button
        onClick={() => handleBooking(selectedRoom._id)}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold px-6 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
      >
        Book This Room
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

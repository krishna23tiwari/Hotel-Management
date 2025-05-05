import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { LuX, LuHotel, LuBedDouble, LuInfo, LuImage } from "react-icons/lu";

const RoomsPage = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [selectedRoom, setSelectedRoom] = useState(null); 
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState(''); 
 

    const getAuthHeaders = () => {
        const token = localStorage.getItem("token");
        return { headers: { Authorization: `Bearer ${token}` } };
    };

    
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:4545/roomroute/getallrooms', getAuthHeaders()); 
                setRooms(response.data.data);
                setLoading(false); 
            } catch (error) {
                setError(error.message); 
                setLoading(false); 
            }
        };

        fetchRooms();
    }, []);

    const filteredAndSortedRooms = rooms
  .filter((room) =>
    room.hotel.hotel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.room.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    if (sortBy === 'asc') {
      return a.hotel.hotel.localeCompare(b.hotel.hotel);
    } else if (sortBy === 'desc') {
      return b.hotel.hotel.localeCompare(a.hotel.hotel);
    } else {
      return 0;
    }
  });


  
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
        <div className="p-4">

<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
  {/* Search */}
  <input
    type="text"
    placeholder="Search by hotel or room..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="p-2 border rounded-md w-full md:w-1/2"
  />

  {/* Sort */}
  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="p-2 border rounded-md"
  >
    <option value="">Sort By</option>
    <option value="asc">Hotel Name (A-Z)</option>
    <option value="desc">Hotel Name (Z-A)</option>
  </select>
</div>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {filteredAndSortedRooms.map((room) => (
                    <div
                        key={room._id}
                        className="card cursor-pointer border p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={() => handleCardClick(room)}
                    >
                        
                        <div className="mb-2">
                            {room.image.length > 0 ? (
                                <img
                                    src={room.image[0]}
                                    alt={room.room}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-300 rounded-lg"></div>
                            )}
                        </div>

                        {/* Hotel Name */}
                       {/* <h3 className="text-xl font-semibold">{room.hotel.hotel}</h3> */}
                    
                            <div className="p-4 space-y-2 text-gray-800">
    <h3 className="text-lg font-bold text-blue-700">{room.hotel.hotel}</h3>
    <p className="text-sm">
      <span className="font-semibold text-gray-600">State:</span> {room.hotel.city.state.state}
    </p>
    <p className="text-sm">
      <span className="font-semibold text-gray-600">City:</span> {room.hotel.city.city}
    </p>
    <p className="text-sm">
      <span className="font-semibold text-gray-600">Email:</span> {room.hotel.email}
    </p>
    <p className="text-sm">
      <span className="font-semibold text-gray-600">Phone:</span> {room.hotel.phone}
    </p>
    <p className="text-sm">
      <span className="font-semibold text-gray-600">Room No:</span> {room.room}
    </p>
  </div>

                    </div>
                ))}
            </div>

            {/* Popup Modal */}
       
            {isPopupOpen && selectedRoom && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4">
    <div className="bg-gradient-to-br from-white to-gray-100 rounded-3xl shadow-2xl p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto relative transition-all">

      {/* Close Button */}
      <button
        onClick={handleClosePopup}
        className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
      >
        <LuX className="h-6 w-6" />
      </button>

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <LuHotel className="text-blue-600" />
          {selectedRoom.hotel?.hotel}
        </h2>
        <p className="text-gray-500">{selectedRoom.hotel?.city?.city}, {selectedRoom.hotel?.city?.state?.state}</p>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hotel Info */}
      {/* Hotel Info */}
<div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition">
  <h3 className="text-lg font-semibold text-blue-700 mb-2 flex items-center gap-1">
    <LuInfo /> Hotel Info
  </h3>
  <ul className="text-sm text-gray-700 space-y-1">
    <li><strong>Email:</strong> {selectedRoom.hotel?.email}</li>
    <li><strong>Phone:</strong> {selectedRoom.hotel?.phone}</li>
    <li><strong>City:</strong> {selectedRoom.hotel?.city?.city}</li>
    <li><strong>State:</strong> {selectedRoom.hotel?.city?.state?.state}</li>
  </ul>
</div>


        {/* Room Info */}
        <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-green-700 mb-2 flex items-center gap-1">
            <LuBedDouble /> Room Details
          </h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li><strong>Room No:</strong> {selectedRoom.roomNumber}</li>
            <li><strong>Type:</strong> {selectedRoom.type}</li>
            <li><strong>Capacity:</strong> {selectedRoom.capacity}</li>
            <li><strong>Price:</strong> ₹{selectedRoom.price}</li>
            <li>
              <strong>Status:</strong>
              <span className={`ml-2 text-xs font-medium px-2 py-1 rounded-full ${
                selectedRoom.status === "available"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}>
                {selectedRoom.status}
              </span>
            </li>
          </ul>
        </div>

        {/* Description */}
        <div className="bg-white p-5 rounded-2xl shadow-md md:col-span-2 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-yellow-700 mb-2 flex items-center gap-1">
            <LuInfo /> Description
          </h3>
          <p className="text-sm text-gray-700">{selectedRoom.description || "No description provided."}</p>
        </div>

        {/* Amenities */}
        <div className="bg-white p-5 rounded-2xl shadow-md md:col-span-2 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-purple-700 mb-2 flex items-center gap-1">
            <LuInfo /> Amenities
          </h3>
          <p className="text-sm text-gray-700">
            {selectedRoom.amenities?.length > 0
              ? selectedRoom.amenities.join(", ")
              : "No amenities listed."}
          </p>
        </div>
      </div>

      {/* Image Gallery */}
      {selectedRoom.image?.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-indigo-700 mb-3 flex items-center gap-1">
            <LuImage /> Room Images
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {selectedRoom.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Room image ${index + 1}`}
                className="rounded-xl w-full h-32 object-cover shadow-md hover:scale-105 transition-transform cursor-pointer"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
)}
            
            {/* {currentImage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-60">
                    <div className="relative">
                        <button
                            className="absolute top-2 right-2 text-4xl font-bold text-white"
                            onClick={() => setCurrentImage(null)} // Close the enlarged image
                        >
                            ×
                        </button>
                        <img
                            src={currentImage}
                            alt="Enlarged"
                            className="max-w-full max-h-screen object-contain"
                        />
                    </div>
                </div>
            )} */}

            {currentImage && (
  <div
    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[100]"
    onClick={() => setCurrentImage(null)}
  >
    <div className="relative max-w-6xl w-full p-4">
      {/* Close Button */}
      <button
        onClick={() => setCurrentImage(null)}
        className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
      >
        &times;
      </button>

      {/* Full-Screen Image */}
      <img
        src={currentImage}
        alt="Full View"
        className="w-full max-h-[90vh] object-contain rounded-lg shadow-xl transition-transform duration-300"
        onClick={(e) => e.stopPropagation()} // prevent click from closing
      />
    </div>
  </div>
)}

        </div>
    );
};

export default RoomsPage;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ForBookings = () => {
  const { selectedRoom } = useParams();

  const [formData, setFormData] = useState({
    userName: "",
    userPhone: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfGuests: 1,
    numberOfRooms: 1,
    anyChild: "no",
  });

  const [roomPrice, setRoomPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchRoomPrice = async () => {
    try {
      const res = await axios.get("http://localhost:4545/roomroute/getallrooms", getAuthHeaders());
      const rooms = res.data.data || [];
      const matchedRoom = rooms.find(room => room._id === selectedRoom);
      if (matchedRoom) {
        setRoomPrice(matchedRoom.price || 0);
      }
    } catch (err) {
      console.error("Failed to fetch rooms:", err.message);
    }
  };

  useEffect(() => {
    if (selectedRoom) {
      fetchRoomPrice();
    }
  }, [selectedRoom]);

  useEffect(() => {
    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    if (!isNaN(checkIn) && !isNaN(checkOut) && checkOut > checkIn) {
      const timeDiff = checkOut.getTime() - checkIn.getTime();
      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const total = roomPrice * dayDiff * formData.numberOfRooms;
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [formData.checkInDate, formData.checkOutDate, formData.numberOfRooms, roomPrice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, roomId: selectedRoom, totalAmount: totalPrice };

    try {
      const res = await axios.post("http://localhost:4545/userbooking/forbooking", payload, getAuthHeaders());
      alert("Booking Successful!");
      setFormData({
        userName: "",
        userPhone: "",
        checkInDate: "",
        checkOutDate: "",
        numberOfGuests: 1,
        numberOfRooms: 1,
        anyChild: "no",
      });
    } catch (err) {
      console.error("Booking failed:", err?.response?.data || err.message);
      alert("Booking Failed!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      
      <div className="w-full md:w-[70%] relative">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1950&q=80"
          alt="Room Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center items-start p-12 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
  Experience Luxury, Comfort & Serenity
</h1>
<p className="text-lg md:text-xl font-light text-white max-w-md">
  Discover your perfect getaway in the heart of elegance. Whether you're planning a romantic escape, a family vacation, or a solo retreat, our rooms offer a harmonious blend of comfort, style, and top-tier service — all at prices that won’t break the bank. Book now and turn your stay into a cherished memory.
</p>

        </div>
      </div>

    
      <div className="w-full md:w-[30%] bg-gradient-to-br from-indigo-100 to-indigo-200 p-6 md:p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6 text-center">Room Booking</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="text"
              name="userPhone"
              value={formData.userPhone}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Check-in Date</label>
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Check-out Date</label>
            <input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Number of Guests</label>
            <input
              type="number"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleChange}
              min="1"
              max="5"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Number of Rooms</label>
            <input
              type="number"
              name="numberOfRooms"
              value={formData.numberOfRooms}
              onChange={handleChange}
              min="1"
              max="5"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Any Children?</label>
            <select
              name="anyChild"
              value={formData.anyChild}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          
          <div className="bg-white p-4 rounded-md shadow text-center">
            <input 
                type = "text"
                name="Coupon Code"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Ener Coupon Code"
                required
                className="w-full p-2 border rounded"
                />
               <hr className="my-2 mb-3" /> 
            <p className="text-sm text-gray-600">Price per Night</p>
            <p className="text-xl font-bold text-indigo-700">₹ {roomPrice}</p>
            <hr className="my-2" />
            <p className="text-sm text-gray-600">Total Price</p>
            <p className="text-xl font-bold text-green-600">₹ {totalPrice}</p>
            
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-semibold transition-all"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForBookings;

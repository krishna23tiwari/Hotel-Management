import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaUsers, FaHotel, FaCity, FaBed, FaRupeeSign,
  FaClipboardList, FaMapMarkedAlt, FaMap
} from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // States for each metric
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0);
  const [totalStates, setTotalStates] = useState(0);
  const [totalCities, setTotalCities] = useState(0);
  const [totalHotels, setTotalHotels] = useState(0);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

 
  const fetchDashboardData = async () => {
    try {
      const bookingsRes = await axios.get('http://localhost:4545/userbooking/getbookingdataforadmin', getAuthHeaders());
      const bookings = bookingsRes.data.data;
      setTotalBookings(bookings.length);
    //   console.log(`>>>bookings>>>>`, bookings)

      
      const total = bookings.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
      setTotalRevenue(total);

      const usersRes = await axios.get('http://localhost:4545/user/getalluerinfo', getAuthHeaders());
      setTotalUsers(usersRes.data.users.length);
    //   console.log(`>>>>u>>>>>`, totalUsers)

      const roomsRes = await axios.get('http://localhost:4545/roomroute/getallrooms', getAuthHeaders());
      setTotalRooms(roomsRes.data.data.length);


      const statesRes = await axios.get('http://localhost:4545/addingstate/showallstate', getAuthHeaders());
      setTotalStates(statesRes.data.data.length);

      const citiesRes = await axios.get('http://localhost:4545/admin/getalldata', getAuthHeaders());
      setTotalCities(citiesRes.data.data.length);

      const hotelsRes = await axios.get('http://localhost:4545/hotelroute/getallhotels', getAuthHeaders());
      setTotalHotels(hotelsRes.data.data.length);

    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  console.log(`>>>users>>>>>`,totalUsers)

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const stats = [
    { label: 'Total Bookings', icon: <FaClipboardList />, path: '/user-admin-side-dash', value: totalBookings },
    { label: 'Total Users', icon: <FaUsers />, path: '/user-admin-side-dash', value: totalUsers },
    { label: 'Total Revenue', icon: <FaRupeeSign />, path: '/user-admin-side-dash', value: `₹${totalRevenue}` },
    { label: 'Total Rooms', icon: <FaBed />, path: '/add-room', value: totalRooms },
    { label: 'States', icon: <FaMapMarkedAlt />, path: '/add-state', value: totalStates },
    { label: 'Cities', icon: <FaMap />, path: '/add-city', value: totalCities },
    { label: 'Hotels', icon: <FaHotel />, path: '/add-hotel', value: totalHotels },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center px-8 py-12"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"
      }}
    >
      <h1 className="text-white text-4xl font-bold mb-10 backdrop-blur-md bg-black/30 p-4 rounded-xl w-fit">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            onClick={() => navigate(stat.path)}
            className="cursor-pointer bg-white/30 backdrop-blur-md hover:scale-105 transition transform shadow-lg rounded-2xl p-6 flex items-center justify-between text-gray-800 hover:bg-white/40"
          >
            <div className="text-5xl text-gray-300">{stat.icon}</div>
            <div className="text-right">
              <p className="text-xl font-semibold">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;


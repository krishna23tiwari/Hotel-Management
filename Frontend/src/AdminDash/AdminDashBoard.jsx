import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaUsers, FaHotel, FaCity, FaBed, FaRupeeSign,
  FaClipboardList, FaMapMarkedAlt, FaMap
} from 'react-icons/fa';
import CheckInCheckOutBarchart from '../Charts/CheckInCheckOutBarchart';
import RecentBookings from '../Charts/RecentBookings';
import DayWiseBookingStatus from '../Charts/DayWiseBookingStatus'
import Allusers from '../Charts/Allusers';
import baseurl from '../BaseUrl';


const AdminDashboard = () => {
  const navigate = useNavigate();

  
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

 
  // const fetchDashboardData = async () => {
  //   try {
  //     const bookingsRes = await axios.get('http://localhost:4545/userbooking/getbookingdataforadmin', getAuthHeaders());
  //     const bookings = bookingsRes.data.data;
  //     setTotalBookings(bookings.length);
  //   //   console.log(`>>>bookings>>>>`, bookings)

      
  //     const total = bookings.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
  //     setTotalRevenue(total);

  //     const usersRes = await axios.get('http://localhost:4545/user/getalluerinfo', getAuthHeaders());
  //     setTotalUsers(usersRes.data.users.length);
  //   //   console.log(`>>>>u>>>>>`, totalUsers)

  //     const roomsRes = await axios.get('http://localhost:4545/roomroute/getallrooms', getAuthHeaders());
  //     setTotalRooms(roomsRes.data.data.length);


  //     const statesRes = await axios.get('http://localhost:4545/addingstate/showallstate', getAuthHeaders());
  //     setTotalStates(statesRes.data.data.length);

  //     const citiesRes = await axios.get('http://localhost:4545/admin/getalldata', getAuthHeaders());
  //     setTotalCities(citiesRes.data.data.length);

  //     const hotelsRes = await axios.get('http://localhost:4545/hotelroute/getallhotels', getAuthHeaders());
  //     setTotalHotels(hotelsRes.data.data.length);

  //   } catch (error) {
  //     console.error("Dashboard fetch error:", error);
  //   }
  // };


  const fetchDashboardData = async () => {
  try {
    const bookingsRes = await axios.get(`${baseurl}userbooking/getbookingdataforadmin`, getAuthHeaders());
    const bookings = bookingsRes.data.data;
    setTotalBookings(bookings.length);

    const total = bookings.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
    setTotalRevenue(total);

    const usersRes = await axios.get(`${baseurl}user/getalluerinfo`, getAuthHeaders());
    setTotalUsers(usersRes.data.users.length);

    const roomsRes = await axios.get(`${baseurl}roomroute/getallrooms`, getAuthHeaders());
    setTotalRooms(roomsRes.data.data.length);

    const statesRes = await axios.get(`${baseurl}addingstate/showallstate`, getAuthHeaders());
    setTotalStates(statesRes.data.data.length);

    const citiesRes = await axios.get(`${baseurl}admin/getalldata`, getAuthHeaders());
    setTotalCities(citiesRes.data.data.length);

    const hotelsRes = await axios.get(`${baseurl}hotelroute/getallhotels`, getAuthHeaders());
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
    // { label: 'Hotels', icon: <FaHotel />, path: '/add-hotel', value: totalHotels },
  ];

  return (
    // <div
    //   className="min-h-screen bg-cover bg-center px-2 sm:px-4 md:px-8 py-6 sm:py-8 md:py-12"
    //   style={{
    //     backgroundImage:
    //       "url('https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"
    //   }}
    // >

    <div
  className="min-h-screen bg-cover bg-center px-0 sm:px-2 md:px-4 py-4 sm:py-6 md:py-8"
  style={{
    backgroundImage:
      "url('https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat'
  }}
>

      <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 backdrop-blur-md bg-black/30 p-2 sm:p-4 rounded-xl w-fit">
        Admin Dashboard
      </h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            onClick={() => navigate(stat.path)}
            className="cursor-pointer bg-white/30 backdrop-blur-md hover:scale-105 transition transform shadow-lg rounded-2xl p-4 sm:p-6 flex items-center justify-between text-gray-800 hover:bg-white/40"
          >
            <div className="text-3xl sm:text-4xl md:text-5xl text-gray-300">{stat.icon}</div>
            <div className="text-right">
              <p className="text-base sm:text-lg md:text-xl font-semibold">{stat.label}</p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full px-0 mx-0 overflow-hidden">
        <div className="text-black"></div>
        <DayWiseBookingStatus />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 mb-6 sm:mb-8">
        <div
          className="w-full lg:w-1/2 cursor-pointer bg-white/30 backdrop-blur-md hover:scale-105 transition transform rounded-2xl shadow-xl p-4 sm:p-6 flex flex-col justify-between"
          style={{ minHeight: '200px' }}
        >
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-4 text-center">
            User Booking Status
          </h2>
          <div className="flex-grow">
            <CheckInCheckOutBarchart />
          </div>
        </div>

        <div className="w-full lg:w-1/2 cursor-pointer bg-white/30 backdrop-blur-md hover:scale-105 transition transform rounded-2xl shadow-xl p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-black mb-2 sm:mb-4 text-center">
            Recent 5 Bookings
          </h2>
          <RecentBookings />
        </div>
      </div>

      <div>
        <Allusers />
      </div>
    </div>
  );
};

export default AdminDashboard;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseurl from '../BaseUrl';

const SelectedBookingsShow = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedType, setSelectedType] = useState(''); // 'Users' or 'Bookings'
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // useEffect(() => {
  //   axios.get('http://localhost:4545/user/getalluerinfo', getAuthHeaders())
  //     .then(res => setUsers(res.data.users))
  //     .catch(err => console.error(err));
  // }, []);

  // useEffect(() => {
  //   axios.get('http://localhost:4545/userbooking/getbookingdataforadmin', getAuthHeaders())
  //     .then(res => setBookings(res.data.data))
  //     .catch(err => console.error(err));
  // }, []);


  useEffect(() => {
  axios.get(`${baseurl}user/getalluerinfo`, getAuthHeaders())
    .then(res => setUsers(res.data.users))
    .catch(err => console.error(err));
}, []);

useEffect(() => {
  axios.get(`${baseurl}userbooking/getbookingdataforadmin`, getAuthHeaders())
    .then(res => setBookings(res.data.data))
    .catch(err => console.error(err));
}, []);
  useEffect(() => {
    if (!fromDate || !toDate || !selectedType) return;

    const from = new Date(fromDate);
    const to = new Date(toDate);

    const filtered = bookings.filter(booking => {
      const checkIn = new Date(booking.checkInDate);
      const checkOut = new Date(booking.checkOutDate);
      return checkIn >= from && checkOut <= to;
    });

    if (selectedType === 'Users') {

      const uniqueUsers = [];
      const emailsSet = new Set();

      filtered.forEach(booking => {
        if (!emailsSet.has(booking.userEmail)) {
          emailsSet.add(booking.userEmail);
          uniqueUsers.push({
            name: booking.userName,
            email: booking.userEmail,
            phone: booking.userPhone
          });
        }
      });

      setFilteredData(uniqueUsers);
    } else if (selectedType === 'Bookings') {
      
      setFilteredData(filtered);
    }
  }, [selectedType, fromDate, toDate, bookings]);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Booking Reports Panel</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="p-2 border rounded w-full md:w-1/3"
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
        >
          <option value="">Select View</option>
          <option value="Users">Users</option>
          <option value="Bookings">Bookings</option>
        </select>

        <input
          type="date"
          className="p-2 border rounded w-full md:w-1/4"
          value={fromDate}
          onChange={e => setFromDate(e.target.value)}
        />

        <input
          type="date"
          className="p-2 border rounded w-full md:w-1/4"
          value={toDate}
          onChange={e => setToDate(e.target.value)}
        />
      </div>

      
      {selectedType === 'Users' && filteredData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-100 rounded shadow text-sm">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">User Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user, index) => (
                <tr key={index} className="hover:bg-white">
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : selectedType === 'Bookings' && filteredData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-100 rounded shadow text-sm">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">User Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Guests</th>
                <th className="p-2 border">Rooms</th>
                <th className="p-2 border">Child</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Check</th>
                <th className="p-2 border">Coupon</th>
                <th className="p-2 border">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((booking, index) => (
                <tr key={index} className="hover:bg-white">
                  <td className="p-2 border">{booking.userName}</td>
                  <td className="p-2 border">{booking.userEmail}</td>
                  <td className="p-2 border">{booking.userPhone}</td>
                  <td className="p-2 border">{booking.numberOfGuests}</td>
                  <td className="p-2 border">{booking.numberOfRooms}</td>
                  <td className="p-2 border">{booking.anyChild ? 'Yes' : 'No'}</td>
                  <td className="p-2 border capitalize">{booking.status}</td>
                  <td className="p-2 border capitalize">{booking.ischecking}</td>
                  <td className="p-2 border">{booking.couponName || '-'}</td>
                  <td className="p-2 border font-bold">₹{booking.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 text-center mt-8">No data found for selected option and date range.</p>
      )}
    </div>
  );
};

export default SelectedBookingsShow;

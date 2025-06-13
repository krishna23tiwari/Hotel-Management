import React, { useEffect, useState } from "react";
import axios from "axios";
import baseurl from "../BaseUrl";

const RecentBookings = () => {
  const [bookings, setBookings] = useState([]);

//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get("http://localhost:4545/userbooking/getbookingdataforadmin", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       const allBookings = res.data.data;

//       // Get top 5 recent bookings (sorted by createdAt or just slice if already ordered)
//       const topFive = allBookings.slice(0, 5);
//       setBookings(topFive);
//     } catch (error) {
//       console.error("Failed to fetch bookings", error);
//     }
//   };




// const fetchBookings = async () => {
//     try {
//       const res = await axios.get("http://localhost:4545/userbooking/getbookingdataforadmin", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
  
//       const allBookings = res.data.data;
  
//       // Sort bookings by createdAt (or another date field) in descending order
//       const sortedBookings = allBookings.sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//       );
  
//       // Take the top 5 most recent
//       const topFive = sortedBookings.slice(0, 5);
  
//       setBookings(topFive);
//     } catch (error) {
//       console.error("Failed to fetch bookings", error);
//     }
//   };

const fetchBookings = async () => {
  try {
    const res = await axios.get(`${baseurl}userbooking/getbookingdataforadmin`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const allBookings = res.data.data;

    // Sort bookings by createdAt (or another date field) in descending order
    const sortedBookings = allBookings.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Take the top 5 most recent
    const topFive = sortedBookings.slice(0, 5);

    setBookings(topFive);
  } catch (error) {
    console.error("Failed to fetch bookings", error);
  }
};

    useEffect(() => {
    fetchBookings();
  }, []);
  

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-black">
        <thead className="bg-gray-400 text-black">
          <tr>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Guests</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{booking.userName}</td>
              <td className="px-4 py-2">{booking.userPhone}</td>
              <td className="px-4 py-2">{booking.numberOfGuests}</td>
              <td className="px-4 py-2">₹{booking.totalAmount}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    booking.ischecking === "checkIn"
                      ? "bg-green-200 text-green-700"
                      : booking.ischecking === "cancel"
                      ? "bg-red-200 text-red-700"
                      : "bg-yellow-200 text-yellow-700"
                  }`}
                >
                  {booking.ischecking}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentBookings;

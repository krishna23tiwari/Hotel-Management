import React, { useEffect, useState } from "react";
import axios from "axios";

const ForUserBookingAdminSide = () => {
  const [bookings, setBookings] = useState([]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4545/userbooking/getbookingdataforadmin",
        getAuthHeaders()
      );
      setBookings(res.data.data || []);
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };

  const approveBooking = async (id) => {
    try {
      await axios.put(
        `http://localhost:4545/userbooking/updatebookingstatus/${id}`,
        { status: "approved" },
        getAuthHeaders()
      );
      fetchBookings();
    } catch (error) {
      console.error("Approval error:", error.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] p-10 text-white">
      <h1 className="text-5xl font-bold text-center mb-12 tracking-widest">Admin Bookings Panel</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-200">No bookings available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-[#1f2937] rounded-xl shadow-xl p-6 hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
            >
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-cyan-300">{booking.userName}</h2>
                <p className="text-gray-400 text-sm">📞 {booking.userPhone}</p>
              </div>

              <div className="text-gray-300 space-y-2 text-sm">
                <p><strong>Room ID:</strong> {booking.roomId}</p>
                <p><strong>Check-In:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
                <p><strong>Check-Out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                <p><strong>Guests:</strong> {booking.numberOfGuests}</p>
                <p><strong>Rooms:</strong> {booking.numberOfRooms}</p>
                <p><strong>Child:</strong> {booking.anyChild ? "Yes" : "No"}</p>
                <p><strong>Total Amount:</strong> ₹{booking.totalAmount}</p>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => approveBooking(booking._id)}
                  disabled={booking.status === "approved"}
                  className={`w-full py-2 rounded-lg text-white font-semibold tracking-wider transition duration-300 ${
                    booking.status === "approved"
                      ? "bg-green-600 cursor-not-allowed"
                      : "bg-yellow-500 hover:bg-yellow-400"
                  }`}
                >
                  {booking.status === "approved" ? "Approved" : "Pending"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ForUserBookingAdminSide;

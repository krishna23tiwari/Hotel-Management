import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle, FaBan } from "react-icons/fa";
import baseurl from "../BaseUrl";

const ForUserBookingAdminSide = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filter, setFilter] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [ischeckindata, setischeckindata] = useState([])
  const [checkinout ,setcheckinout] = useState([])



  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // const fetchBookings = async () => {
  //   try {
  //     const res = await axios.get(
  //       "http://localhost:4545/userbooking/getbookingdataforadmin",
  //       getAuthHeaders()
  //     );
  //     setBookings(res.data.data || []);
  //   } catch (error) {
  //     console.error("Fetch error:", error.message);
  //   }
  // };

  const fetchBookings = async () => {
  try {
    const res = await axios.get(
      `${baseurl}userbooking/getbookingdataforadmin`,
      getAuthHeaders()
    );
    setBookings(res.data.data || []);
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
};
  console.log(`>>>bookings>>>>>>`, bookings)

  // const approveBooking = async (id) => {
  //   try {
  //     await axios.put(
  //       `http://localhost:4545/userbooking/approveuser/${id}`,
  //       { status: "approved" },
  //       getAuthHeaders()
  //     );
  //     fetchBookings();
  //   } catch (error) {
  //     console.error("Approval error:", error.message);
  //   }
  // };


  const approveBooking = async (id) => {
  try {
    await axios.put(
      `${baseurl}userbooking/approveuser/${id}`,
      { status: "approved" },
      getAuthHeaders()
    );
    fetchBookings();
  } catch (error) {
    console.error("Approval error:", error.message);
  }
};


  // const deleteBooking = async (id) => {
  //   try {
  //     const res = await axios.delete(
  //       `http://localhost:4545/userbooking/harddelete/${id}`,
        
  //       getAuthHeaders()
  //     );

  //     console.log(`>>>id delete>>>`, res.data)
  //     fetchBookings();
  //   } catch (error) {
  //     console.error("Cancel error:", error.message);
  //   }
  // };

const deleteBooking = async (id) => {
  try {
    const res = await axios.delete(
      `${baseurl}userbooking/harddelete/${id}`,
      getAuthHeaders()
    );

    console.log(`>>>id delete>>>`, res.data);
    fetchBookings();
  } catch (error) {
    console.error("Cancel error:", error.message);
  }
};


  // const fetchBookingsByStatus = async (status) => {
  //   setLoading(true);
  //   try {
  //     const res = await axios.get(
  //       'http://localhost:4545/userbooking/status',
  //       {
  //         params: { ischecking: status },
  //         ...getAuthHeaders(),
  //       }
  //     );
  //     setischeckindata(res.data.data || []);
  //   } catch (error) {
  //     console.error("Fetch error:", error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  // const StatusCheckInCheckOut = async() => {
  //   const res = await axios.get('http://localhost:4545/userbooking/checkstatus', getAuthHeaders())
  //   setcheckinout(res)
  // }

 const fetchBookingsByStatus = async (status) => {
  setLoading(true);
  try {
    const res = await axios.get(
      `${baseurl}userbooking/status`,
      {
        params: { ischecking: status },
        ...getAuthHeaders(),
      }
    );
    setischeckindata(res.data.data || []);
  } catch (error) {
    console.error("Fetch error:", error.message);
  } finally {
    setLoading(false);
  }
};


  // const StatusCheckInCheckOut = async () => {
  //   const res = await axios.get(
  //     'http://localhost:4545/userbooking/checkstatus',
  //     {
  //       params: { ischecking: ischecking }, // or 'checkOut' or 'waiting'
  //       ...getAuthHeaders()
  //     }
  //   );
  //   setcheckinout(res.data.data);
  // }


  const StatusCheckInCheckOut = async () => {
  const res = await axios.get(
    `${baseurl}userbooking/checkstatus`,
    {
      params: { ischecking: ischecking }, // or 'checkOut' or 'waiting'
      ...getAuthHeaders()
    }
  );
  setcheckinout(res.data.data);
}
   console.log(`>>>>res----->>>`, checkinout)
  



  // const checkIn = async (id) => {
  //   const res = await axios.get(
  //     `http://localhost:4545/userbooking/checkin/${id}`,
  //     {
  //       params: { ischecking: "checkIn" },
  //       ...getAuthHeaders(),
  //     }
  //   );
  //   console.log(`>>>res>>>>`,res.data.ischecking)
  //   setLoading(res.data);
  //   setischeckindata(res.data)
  // };


  const checkIn = async (id) => {
  const res = await axios.get(
    `${baseurl}userbooking/checkin/${id}`,
    {
      params: { ischecking: "checkIn" },
      ...getAuthHeaders(),
    }
  );
  console.log(`>>>res>>>>`, res.data.ischecking);
  setLoading(res.data);
  setischeckindata(res.data);
};


  console.log(`>>>>>checkindata>>>>`, ischeckindata)
  
  // const checkOut = async (id) => {
  //   const res = await axios.get(
  //     `http://localhost:4545/userbooking/checkout/${id}`,
  //     {
  //       params: { ischecking: "checkOut" },
  //       ...getAuthHeaders(),
  //     }
  //   );  
  //   setischeckindata(res.data)
  //   setLoading(res.data);
  // };
  
  const checkOut = async (id) => {
  const res = await axios.get(
    `${baseurl}userbooking/checkout/${id}`,
    {
      params: { ischecking: "checkOut" },
      ...getAuthHeaders(),
    }
  );  
  setischeckindata(res.data);
  setLoading(res.data);
};
  useEffect(() => {
    console.log("Updated check-in data:", ischeckindata);
  }, [ischeckindata]);
  

  

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = bookings
    .filter((booking) => {
      if (filter === "all") return true;
      if (filter === "pending" || filter === "approved") return booking.status === filter;
      if (filter === "checkIn" || filter === "checkOut"  || filter === "cancel") return booking.ischecking === filter;
      return booking.status === filter;
    })
    .filter((booking) =>
      booking.userName.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.checkInDate) - new Date(a.checkInDate);
      } else if (sortBy === "amount") {
        return b.totalAmount - a.totalAmount;
      }else if (sortBy === "name") {
        return a.userName.localeCompare(b.userName);
      
      }
    });

  return (
    <div className="min-h-screen bg-white text-gray-800 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-4xl font-bold text-center mb-6 sm:mb-10">Admin Bookings Panel</h1>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full shadow-md ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-100"}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("approved")}
          className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full shadow-md ${filter === "approved" ? "bg-green-500 text-white" : "bg-gray-200 hover:bg-green-100"}`}
        >
          Approved
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full shadow-md ${filter === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200 hover:bg-yellow-100"}`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("checkIn")}
          className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full shadow-md ${filter === "checkIn" ? "bg-purple-500 text-white" : "bg-gray-200 hover:bg-purple-100"}`}
        >
          Checked-In
        </button>
        <button
          onClick={() => setFilter("checkOut")}
          className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full shadow-md ${filter === "checkOut" ? "bg-gray-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          Checked-Out
        </button>
        <button
          onClick={() => setFilter("cancel")}
          className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full shadow-md ${filter === "cancel" ? "bg-red-500 text-white" : "bg-gray-200 hover:bg-red-100"}`}
        >
          Cancel
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4 sm:mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded-md w-full sm:w-1/2 shadow"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border rounded-md shadow w-full sm:w-auto"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      {filteredBookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-gradient-to-br from-gray-50 to-blue-100 border border-blue-200 rounded-xl shadow p-4 sm:p-6 transition-transform hover:scale-[1.02]"
            >
              <div className="mb-2">
                <h2 className="text-lg sm:text-xl font-semibold text-blue-700">{booking.userName}</h2>
                <p className="text-sm text-gray-600">📞 {booking.userPhone}</p>
              </div>

              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Room ID:</strong> {booking.roomId}</p>
                <p><strong>Check-In:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
                <p><strong>Check-Out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                <p><strong>Guests:</strong> {booking.numberOfGuests}</p>
                <p><strong>Rooms:</strong> {booking.numberOfRooms}</p>
                <p><strong>Child:</strong> {booking.anyChild ? "Yes" : "No"}</p>
                <p><strong>Total Amount:</strong> ₹{booking.totalAmount}</p>
                <p><strong>isChecking:</strong><span className={`font-semibold ${booking.ischecking === "checkIn" ? "text-green-600" : booking.ischecking === "checkOut" ? "text-yellow-600" : booking.ischecking === "cancel" ? "text-red-600" : ""}`}>{booking.ischecking}</span></p>
                <p><strong>Status:</strong> <span className={`font-semibold ${booking.status === "approved" ? "text-green-600" : booking.status === "pending" ? "text-yellow-600" : "text-red-600"}`}>{booking.status}</span></p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => approveBooking(booking._id)}
                  disabled={booking.status === "approved"}
                  className={`flex items-center gap-2 px-2 py-2 rounded-lg text-sm font-medium transition shadow ${booking.status === "approved" ? "bg-green-400 cursor-not-allowed text-white" : "bg-green-600 text-white hover:bg-green-500"}`}
                >
                  <FaCheckCircle /> Approve
                </button>
                <button
                  onClick={() => deleteBooking(booking._id)}
                  className="flex items-center gap-2 px-2 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-400 transition shadow"
                >
                  <FaBan /> Cancel
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

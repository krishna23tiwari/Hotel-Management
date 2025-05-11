import React, { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaBook,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { MdPassword, MdCancel } from "react-icons/md";
import axios from "axios";

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [data, setdata] = useState([]);
  const [resetPopupOpen, setResetPopupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchallinfo = async () => {
    const res = await axios.get(
      "http://localhost:4545/userbooking/showallbooking",
      getAuthHeaders()
    );
    console.log(res.data);
    setdata(res.data);
  };

  console.log(`>>>Data>>>>`, data);

  const handleCheckIn = async (bookingId) => {
    const res = await axios.put(
      `http://localhost:4545/userbooking/checkin/${bookingId}`,
      {},
      getAuthHeaders()
    );

    console.log(`>>>>checkIn>>>>`, res.data);
    fetchallinfo();
  };

  const handleCacel = async (bookingId) => {
    const res = await axios.patch(
      `http://localhost:4545/userbooking/handlecancel/${bookingId}`,
      {},
      getAuthHeaders()
    );

    console.log(`>>>>res-cancel>>>>`, res.data);
    fetchallinfo();
  };

  const handleCheckOut = async (bookingId) => {
    const res = await axios.put(
      `http://localhost:4545/userbooking/checkOut/${bookingId}`,
      {},
      getAuthHeaders()
    );

    console.log(`>>>>checkIn>>>>`, res.data);
    fetchallinfo();
  };

  // const handleResetPassword = async () => {
  //   try {
  //     const res = await axios.put(
  //       "http://localhost:4545/user/reset-password",
  //       {
          
  //         oldPassword,
  //         newPassword,
  //       },
  //       getAuthHeaders()
  //     );

  //     alert(res.data.message || "Password reset successful");
  //     setResetPopupOpen(false);
  //     setEmail("");
  //     setOldPassword("");
  //     setNewPassword("");
  //   } catch (err) {
  //     alert(err.response?.data?.message || "Password reset failed");
  //   }
  // };

  const handleResetPassword = async () => {
    try {
      const res = await axios.put(
        "http://localhost:4545/user/reset-password",
        {
          oldPassword,
          newPassword,
        },
        getAuthHeaders()
      );
  
      alert(res.data.message || "Password reset successful");
      setResetPopupOpen(false);
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Password reset failed");
    }
  };
  

  useEffect(() => {
    fetchallinfo();
  }, []);

  return (
    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white shadow-md">
      <h1 className="text-xl font-extralight text-white font-serif">
        FindMyStay
      </h1>

      <div className="flex items-center gap-4 relative">
        <button
          onClick={() => setPopupOpen(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition ease-in"
        >
          <FaBook /> All Bookings
        </button>

        <div className="relative">
         
          <img
    src="https://i.pravatar.cc/150?img=12" 
    alt="Profile"
    className="w-8 h-8 rounded-full cursor-pointer hover:opacity-80"
    onClick={() => setDropdownOpen(!dropdownOpen)}
  />

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-lg z-50 text-white">
              <ul>
                <li
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setDropdownOpen(false);
                    setResetPopupOpen(true);
                  }}
                >
                  <MdPassword /> Reset Password
                </li>

                <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  <IoSettingsSharp /> Settings
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {popupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-40">
          <div className="bg-gray-700 p-6 rounded-xl shadow-2xl max-w-6xl w-full overflow-y-auto max-h-[80vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">All Bookings</h2>
              <button
                className="text-red-400 hover:text-red-600 font-bold"
                onClick={() => setPopupOpen(false)}
              >
                Close
              </button>
            </div>

            <table className="w-full text-sm border mb-6">
              <thead>
                <tr className="bg-gray-300 text-gray-800">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Phone</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Check-In</th>
                  <th className="border p-2">Check-Out</th>
                  <th className="border p-2">Coupon</th>
                  <th className="border p-2">City</th>
                  <th className="border p-2">State</th>
                  <th className="border p-2">Amount</th>
                  <th className="border p-2">Guests</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {data?.data?.map((b, idx) => (
                  <tr key={idx} className="text-center text-white">
                    <td className="border p-2">{b.userName}</td>
                    <td className="border p-2">{b.userPhone}</td>
                    <td className="border p-2">{b.userEmail}</td>
                    <td className="border p-2">
                      {new Date(b.checkInDate).toLocaleDateString()}
                    </td>
                    <td className="border p-2">
                      {new Date(b.checkOutDate).toLocaleDateString()}
                    </td>
                    <td className="border p-2">{b.couponName || "N/A"}</td>
                    <td className="border p-2">
                      {b.roomId?.hotel?.city?.city || "N/A"}
                    </td>
                    <td className="border p-2">
                      {b.roomId?.hotel?.city?.state?.state || "N/A"}
                    </td>
                    <td className="border p-2">₹{b.totalAmount || "N/A"}</td>
                    <td className="border p-2">{b.numberOfGuests}</td>

                    <td className="border p-2">
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleCheckIn(b._id)}
                          disabled={
                            b.ischecking === "checkIn" ||
                            b.ischecking === "cancel"
                          }
                          className={`flex items-center justify-center gap-1 px-3 py-1 rounded text-sm ${
                            b.ischecking === "checkIn" ||
                            b.ischecking === "cancel"
                              ? "bg-gray-500 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700"
                          } text-white`}
                        >
                          <FaSignInAlt />{" "}
                          {b.ischecking === "checkIn"
                            ? "Checked In"
                            : "Check-In"}
                        </button>

                        <button
                          onClick={() => handleCheckOut(b._id)}
                          disabled={
                            b.ischecking === "checkOut" ||
                            b.ischecking === "cancel"
                          }
                          className={`flex items-center justify-center gap-1 px-3 py-1 rounded text-sm ${
                            b.ischecking === "checkOut" ||
                            b.ischecking === "cancel"
                              ? "bg-gray-500 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700"
                          } text-white`}
                        >
                          <FaSignInAlt />{" "}
                          {b.ischecking === "checkOut"
                            ? "Checked Out"
                            : "Check-Out"}
                        </button>

                        <button
                          onClick={() => handleCacel(b._id)}
                          disabled={b.ischecking === "cancel"}
                          className={`flex items-center justify-center gap-1 px-3 py-1 rounded text-sm ${
                            b.ischecking === "cancel"
                              ? "bg-gray-500 cursor-not-allowed"
                              : "bg-red-600 hover:bg-red-700"
                          } text-white`}
                        >
                          <MdCancel />{" "}
                          {b.ischecking === "cancel" ? "Cancelled" : "Cancel"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {resetPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Reset Password
              </h2>
              <button
                className="text-red-500 hover:text-red-700 font-bold"
                onClick={() => setResetPopupOpen(false)}
              >
                X
              </button>
            </div>

            <div className="space-y-4">
  <div>
    <label className="block mb-1 text-sm font-medium text-gray-700">
      Email
    </label>
    <input
      type="email"
      placeholder="Enter Email"
      className="w-full p-2 border text-black border-gray-300 rounded"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>

  <div>
    <label className="block mb-1 text-sm font-medium text-gray-700">
      Old Password
    </label>
    <input
      type="password"
      placeholder="Enter Old Password"
      className="w-full p-2 text-black border border-gray-300 rounded"
      value={oldPassword}
      onChange={(e) => setOldPassword(e.target.value)}
    />
  </div>

  <div>
    <label className="block mb-1 text-sm font-medium text-gray-700">
      New Password
    </label>
    <input
      type="password"
      placeholder="Enter New Password"
      className="w-full p-2 border text-black border-gray-300 rounded"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
    />
  </div>

  <button
    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition ease-in w-full"
    onClick={handleResetPassword}
  >
    Reset Password
  </button>
</div>

          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;

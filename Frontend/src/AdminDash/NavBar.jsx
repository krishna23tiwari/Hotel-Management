import React, { useEffect, useState, useRef } from "react";
import {
  FaUserCircle,
  FaBook,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import {
  Mail, Phone, User, CalendarCheck, CalendarX, MapPin,
  Hotel, IndianRupee, Users, CheckCircle, LogIn, LogOut, XCircle
} from "lucide-react"
import { CiEdit } from "react-icons/ci";
import { IoSettingsSharp } from "react-icons/io5";
import { MdPassword, MdCancel } from "react-icons/md";
import axios from "axios";

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [data, setdata] = useState([]);
  const [resetPopupOpen, setResetPopupOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [emailinfield, setEmailinfield] = useState("");
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editImage, setEditImage] = useState(null)
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [userName, setUserName] = useState("")

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchallinfo = async () => {
    const res = await axios.get(
      "http://localhost:4545/userbooking/showuserbooking",
      getAuthHeaders()
    );
    // console.log(res.data);
    setdata(res.data);
    
  };


  // console.log(`>>>Data>>>>`, data);
  // console.log(`image>>>>`, profileImage)

  const handleCheckIn = async (bookingId) => {
    const res = await axios.put(
      `http://localhost:4545/userbooking/checkin/${bookingId}`,
      {},
      getAuthHeaders()
    );

    // console.log(`>>>>checkIn>>>>`, res.data);
    fetchallinfo();
  };

  const openResetPopup = () => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmailinfield(savedEmail);
    }
    setResetPopupOpen(true);
  };

  const handleCacel = async (bookingId) => {
    const res = await axios.patch(
      `http://localhost:4545/userbooking/handlecancel/${bookingId}`,
      {},
      getAuthHeaders()
    );

    // console.log(`>>>>res-cancel>>>>`, res.data);
    fetchallinfo();
  };

  const handleCheckOut = async (bookingId) => {
    const res = await axios.put(
      `http://localhost:4545/userbooking/checkOut/${bookingId}`,
      {},
      getAuthHeaders()
    );

    // console.log(`>>>>checkIn>>>>`, res.data);
    fetchallinfo();
  };

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

      openResetPopup();
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Password reset failed");
    }
  };




  const updateNameAgePhone = async () => {
    const email = localStorage.getItem("email");
  
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", editName);
    formData.append("age", editAge);
    formData.append("phone", editPhone);
    if (editImage) {
      formData.append("image", editImage);
    }
  
    const res = await axios.patch(
      "http://localhost:4545/user/editnamephonegenderage",
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // or from getAuthHeaders()
          "Content-Type": "multipart/form-data",
        },
      }
    );
  
    alert(res.data.message || "Profile updated");
  };
  

  useEffect(() => {
    fetchallinfo();
  }, []);


  

  const fetchUserProfile = async () => {
    const email = localStorage.getItem("email");
  
    try {
      const res = await axios.post(
        "http://localhost:4545/user/profile",
        { email },
        getAuthHeaders()
      );
  
      // console.log("response>>>>>>>", res.data.user);
  
      if (res.data.user && res.data.user.image) {
        setProfileImage(res.data.user.image);
        setUserName(res.data.user.name)
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [profileImage, userName]);
  
    // console.log(">>>image find>>>>>", profileImage);
    // console.log(`>>>>name>>>>>`, userName)
 
  
  
  return (
    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white shadow-md">
      <h1 className="text-xl font-extralight text-white font-serif">
        FindMyStay
      </h1>

      {userName && (
  <p className="text-white font-light text-base ml-4">
    Hello, <span className="font-semibold">{userName} !!</span> 👋
  </p>
)}

      <div className="flex items-center gap-4 relative">
        <button
          onClick={() => setPopupOpen(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition ease-in"
        >
          <FaBook /> All Bookings
        </button>

        <div className="relative" ref={dropdownRef}>
         

          <img
  src={profileImage || "https://i.pravatar.cc/150?img=12"} // fallback if no image yet
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
                    openResetPopup();
                  }}
                >
                  <MdPassword /> Reset Password
                </li>

                <li
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    const savedEmail = localStorage.getItem("email");
                    setEmailinfield(savedEmail || "");
                    setEditProfileOpen(true);
                    setDropdownOpen(false);
                  }}
                >
                  <CiEdit /> Edit Profile
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
        {/* <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-40">
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
                  <th className="border p-2">Hotel</th>
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
                    <td className="border p-2">
                      {b.roomId?.hotel?.hotel || "N/A"}
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
        </div> */},

        <div className="fixed inset-0 bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] flex justify-center items-center z-40 px-4 py-6">
  <div className="w-full max-w-7xl max-h-[90vh] overflow-y-auto space-y-8">

    {/* Header */}
    <div className="flex justify-between items-center px-4">
      <h2 className="text-4xl font-bold text-[#333] tracking-wide">🏨 Booking Details</h2>
      <button
        className="text-gray-700 hover:text-red-500 text-xl font-semibold transition"
        onClick={() => setPopupOpen(false)}
      >
        ✖ Close
      </button>
    </div>

    {/* Grid of Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 pb-6">
      {data?.data?.map((b, idx) => (
        <div
          key={idx}
          className="bg-white/70 backdrop-blur-md rounded-3xl p-5 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300"
        >
          {/* Info section */}
          <div className="space-y-3 text-sm text-gray-800 leading-relaxed">
            <div className="flex items-center gap-2"><User size={18} /> <span className="font-medium">Name:</span> {b.userName}</div>
            <div className="flex items-center gap-2"><Phone size={18} /> <span className="font-medium">Phone:</span> {b.userPhone}</div>
            <div className="flex items-center gap-2"><Mail size={18} /> <span className="font-medium">Email:</span> {b.userEmail}</div>
            <div className="flex items-center gap-2"><CalendarCheck size={18} /> <span className="font-medium">Check-In:</span> {new Date(b.checkInDate).toLocaleDateString()}</div>
            <div className="flex items-center gap-2"><CalendarX size={18} /> <span className="font-medium">Check-Out:</span> {new Date(b.checkOutDate).toLocaleDateString()}</div>
            <div className="flex items-center gap-2"><Users size={18} /> <span className="font-medium">Guests:</span> {b.numberOfGuests}</div>
            <div className="flex items-center gap-2"><Hotel size={18} /> <span className="font-medium">Hotel:</span> {b.roomId?.hotel?.hotel || "N/A"}</div>
            <div className="flex items-center gap-2"><MapPin size={18} /> <span className="font-medium">City:</span> {b.roomId?.hotel?.city?.city}, {b.roomId?.hotel?.city?.state?.state}</div>
            <div className="flex items-center gap-2"><IndianRupee size={18} /> <span className="font-medium">Amount:</span> ₹{b.totalAmount}</div>
            {b.couponName && (
              <div className="flex items-center gap-2"><CheckCircle size={18} /> <span className="font-medium">Coupon:</span> {b.couponName}</div>
            )}
          </div>

          {/* Buttons or Cancelled */}
          {b.ischecking !== "cancel" ? (
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={() => handleCheckIn(b._id)}
                disabled={b.ischecking === "checkIn"}
                className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-semibold transition ${
                  b.ischecking === "checkIn"
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-400 text-white"
                }`}
              >
                <LogIn size={16} /> {b.ischecking === "checkIn" ? "Checked In" : "Check-In"}
              </button>

              <button
                onClick={() => handleCheckOut(b._id)}
                disabled={b.ischecking === "checkOut"}
                className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-semibold transition ${
                  b.ischecking === "checkOut"
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-400 text-white"
                }`}
              >
                <LogOut size={16} /> {b.ischecking === "checkOut" ? "Checked Out" : "Check-Out"}
              </button>

              <button
                onClick={() => handleCacel(b._id)}
                className="flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-semibold bg-red-500 hover:bg-red-400 text-white"
              >
                <XCircle size={16} /> Cancel
              </button>
            </div>
          ) : (
            <div className="mt-4 text-center text-red-500 font-semibold">
              ❌ Booking Cancelled
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</div>

        

        
      )}

      {editProfileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Email 
              </label>
              <input
                type="email"
                value={emailinfield}
                readOnly
                className="w-full px-3 py-2 rounded bg-gray-600 text-white outline-none cursor-not-allowed"
              />
            </div>

            <div className="mb-4">
  <label className="block text-sm font-medium mb-1">Profile Image</label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setEditImage(e.target.files[0])}
    className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none"
  />
</div>


            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none"
                placeholder="Enter Name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Age</label>
              <input
                type="number"
                value={editAge}
                onChange={(e) => setEditAge(e.target.value)}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none"
                placeholder="Enter Age"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none"
                placeholder="Enter Phone Number"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 transition ease-in"
                onClick={() => {
                  updateNameAgePhone();
                  setEditProfileOpen(false);
                }}
              >
                Save
              </button>
              <button
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 transition ease-in"
                onClick={() => setEditProfileOpen(false)}
              >
                Cancel
              </button>
            </div>
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
                  value={emailinfield}
                  readOnly
                  className="w-full p-2 border text-black border-gray-300 rounded bg-gray-100 cursor-not-allowed"
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

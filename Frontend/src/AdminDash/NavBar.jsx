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
import { useSelector, useDispatch } from "react-redux";
import { BsSun, BsMoon } from "react-icons/bs";
import axios from "axios";
import {toggleTheme} from '../Slice/Theme'
import { Link } from "react-router";

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

  const dispatch = useDispatch();

  const dropdownRef = useRef(null);
  const darkMode = useSelector((state) => state.theme.darkMode);

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

    <div className={`flex justify-between items-center p-4 shadow-md transition-all duration-300 ease-in
      ${darkMode 
        ? "bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white" 
        : "bg-gradient-to-r from-blue-100 via-white to-blue-200 text-gray-900"
      }`}
    >
    
    <h1 className={`text-xl font-extralight font-serif transition-all ease-in duration-300 ${darkMode ? "text-white" : "text-gray-900"}`}>
  FindMyStay
</h1>


      {userName && (
        <p className={`font-light text-base ml-4 transition-all ease-in duration-300 ${darkMode ? "text-white" : "text-gray-800"}`}>
  Hello, <span className="font-semibold">{userName} !!</span> 👋
</p>

)}

<div className="flex items-center gap-4 relative">
  <button
    onClick={() => dispatch(toggleTheme())}
    className="text-xl hover:text-yellow-400 transition ease-in"
    title="Toggle Theme"
  >
    {darkMode ? <BsSun /> : <BsMoon />}
  </button>

</div>



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
            {/* <div className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-lg z-50 text-white"> */},
            <div className={`absolute right-0 mt-2 w-48 shadow-lg rounded-lg z-50 transition duration-300 ease-in
  ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900 border border-gray-300"}`}>

              <ul>
                <li
                  className={`flex items-center gap-2 px-4 py-2 cursor-pointer transition
                    ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                  onClick={() => {
                    setDropdownOpen(false);
                    openResetPopup();
                  }}
                >
                  <MdPassword /> Reset Password
                </li>

                <li
                  className={`flex items-center gap-2 px-4 py-2 cursor-pointer transition
                    ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                  onClick={() => {
                    const savedEmail = localStorage.getItem("email");
                    setEmailinfield(savedEmail || "");
                    setEditProfileOpen(true);
                    setDropdownOpen(false);
                  }}
                >
                  <CiEdit /> Edit Profile
                </li>

                <Link to={'/user-setting'} className={`flex items-center gap-2 px-4 py-2 cursor-pointer transition
    ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
                  <IoSettingsSharp /> Settings
                </Link>
              </ul>
            </div>
          )}
        </div>
      </div>

      {popupOpen && (

<div className="fixed inset-0 bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] flex flex-col z-40 overflow-y-auto">
  
  <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-blue-800 p-4 shadow-lg">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        Booking Details
      </h2>
      <button
        className="text-white hover:text-red-200 text-lg font-semibold transition flex items-center gap-1 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full"
        onClick={() => setPopupOpen(false)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        Close
      </button>
    </div>
  </div>

  
  <div className="flex-grow p-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.data?.map((b, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
          >
          
            <div className={`self-end mb-2 px-3 py-1 rounded-full text-xs font-bold ${
              b.ischecking === "checkIn" ? "bg-green-100 text-green-800" :
              b.ischecking === "checkOut" ? "bg-blue-100 text-blue-800" :
              b.ischecking === "cancel" ? "bg-red-100 text-red-800" :
              "bg-yellow-100 text-yellow-800"
            }`}>
              {b.ischecking === "checkIn" ? "Checked In" :
               b.ischecking === "checkOut" ? "Checked Out" :
               b.ischecking === "cancel" ? "Cancelled" : "Pending"}
            </div>

            
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed flex-grow">
              <div className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div>
                  <h3 className="font-bold text-gray-900">{b.userName}</h3>
                  <div className="text-gray-600">{b.userPhone}</div>
                  <div className="text-gray-600 truncate">{b.userEmail}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <span className="font-medium">Dates:</span> {new Date(b.checkInDate).toLocaleDateString()} - {new Date(b.checkOutDate).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div>
                  <span className="font-medium">Guests:</span> {b.numberOfGuests}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <div className="truncate">
                  <span className="font-medium">Hotel:</span> {b.roomId?.hotel?.hotel || "N/A"}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <span className="font-medium">Location:</span> {b.roomId?.hotel?.city?.city}, {b.roomId?.hotel?.city?.state?.state}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <span className="font-medium">Amount:</span> ₹{b.totalAmount}
                </div>
              </div>

              {b.couponName && (
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  <div>
                    <span className="font-medium">Coupon:</span> {b.couponName}
                  </div>
                </div>
              )}
            </div>

            
            {b.ischecking !== "cancel" ? (
              <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap justify-between gap-2">
                <button
                  onClick={() => handleCheckIn(b._id)}
                  disabled={b.ischecking === "checkIn"}
                  className={`flex-1 min-w-[100px] flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
                    b.ischecking === "checkIn"
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  {b.ischecking === "checkIn" ? "Checked In" : "Check-In"}
                </button>

                <button
                  onClick={() => handleCheckOut(b._id)}
                  disabled={b.ischecking === "checkOut"}
                  className={`flex-1 min-w-[100px] flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
                    b.ischecking === "checkOut"
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  {b.ischecking === "checkOut" ? "Checked Out" : "Check-Out"}
                </button>

                <button
                  onClick={() => handleCacel(b._id)}
                  className="flex-1 min-w-[100px] flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-red-500 hover:bg-red-600 text-white transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
              </div>
            ) : (
              <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Booking Cancelled
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
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

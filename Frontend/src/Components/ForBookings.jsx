import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import baseurl from "../BaseUrl";

const ForBookings = () => {
  const { selectedRoom } = useParams();

  const [formData, setFormData] = useState({
    userName: "",
    userPhone: "",
    userEmail:"",
    checkInDate: "",
    checkOutDate: "",
    numberOfGuests: 1,
    numberOfRooms: 1,
    anyChild: "no",
    couponName:""
  });

  const [roomPrice, setRoomPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [coupons, setcoupons] = useState([])
  const [userInfo, setUserInfo] = useState(null);
  const [status, setStatus] = useState(""); // Default is pending


  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

//  console.log(`>>>totalprice>>>`, totalPrice)

  // const fetchCoupons = async() =>{
  //       const res = await axios.get('http://localhost:4545/coupon/getallcoupon', getAuthHeaders())
  //       if(res.status === 200){
  //           // alert(res.data.message)
  //           // console.log(`>>>>resforcoupon>>>`,res.data)
  //           setcoupons(res.data.showallcoupon)
            
  //       }
  // }

  // Make sure this is at the top with your imports

const fetchCoupons = async () => {
  const res = await axios.get(`${baseurl}coupon/getallcoupon`, getAuthHeaders());
  if (res.status === 200) {
    // alert(res.data.message)
    // console.log(`>>>>resforcoupon>>>`,res.data)
    setcoupons(res.data.showallcoupon);
  }
};

//   console.log(`>>>coupons>>>`, coupons)



  // const fetchRoomPrice = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:4545/roomroute/getallrooms", getAuthHeaders());
  //     const rooms = res.data.data || [];
  //     const matchedRoom = rooms.find(room => room._id === selectedRoom);
  //     if (matchedRoom) {
  //       setRoomPrice(matchedRoom.price || 0);
  //     }
  //   } catch (err) {
  //     console.error("Failed to fetch rooms:", err.message);
  //   }
  // };

  const fetchRoomPrice = async () => {
  try {
    const res = await axios.get(`${baseurl}roomroute/getallrooms`, getAuthHeaders());
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
    fetchCoupons();
  }, [])

  useEffect(() => {
    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
  
    if (!isNaN(checkIn) && !isNaN(checkOut)) {
      if (checkOut <= checkIn) {

        alert("Check-out date must be later than Check-in date.");
        setFormData(prevData => ({
          ...prevData,
          checkOutDate: "" 
        }));
        setTotalPrice(0); 
      } else {
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        let total = roomPrice * dayDiff * formData.numberOfRooms;
        
    
        if (userInfo?.role === "admin") {
          const adminDiscount = (total * 20) / 100;
          total -= adminDiscount;
        }
        
        if (formData.couponName) {
          const selectedCoupon = coupons.find(c => c.couponName === formData.couponName);
          if (selectedCoupon) {
            const couponDiscount = (total * selectedCoupon.discount) / 100;
            total -= couponDiscount;
          }
        }
        
        setTotalPrice(total);
      }
    } else {
      setTotalPrice(0);
    }
  }, [formData.checkInDate, formData.checkOutDate, formData.numberOfRooms, roomPrice, formData.couponName, coupons, userInfo]);
  


//   useEffect(() => {
//     const checkIn = new Date(formData.checkInDate);
//     const checkOut = new Date(formData.checkOutDate);
  
//     if (!isNaN(checkIn) && !isNaN(checkOut) && checkOut > checkIn && roomPrice > 0) {
//       const timeDiff = checkOut.getTime() - checkIn.getTime();
//       const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
//       let total = roomPrice * dayDiff * formData.numberOfRooms;
  
      
//       if (userInfo?.role === "admin") {
//         const adminDiscount = (total * 20) / 100;
//         total -= adminDiscount;
//       }
  
//       if (formData.couponName) {
//         const selectedCoupon = coupons.find(c => c.couponName === formData.couponName);
//         if (selectedCoupon) {
//           const couponDiscount = (total * selectedCoupon.discount) / 100;
//           total -= couponDiscount;
//         }
//       }
  
//       setTotalPrice(total);
//     } else {
//       setTotalPrice(0);
//     }
//   }, 
//     [formData.checkInDate, formData.checkOutDate, formData.numberOfRooms, roomPrice, formData.couponName, coupons, userInfo]);
  

    console.log(`>>>>userInfo>>>>>`, userInfo)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

// const userinfo = async() => {
//     const res = await axios.get('http://localhost:4545/user/getuserinfo', getAuthHeaders())

//     if(res.status === 200 && res.data.user){
//         setUserInfo(res.data.user)
//     }else{
//         console.log("failed to fetch info")
//     }
// }

const userinfo = async () => {
  const res = await axios.get(`${baseurl}user/getuserinfo`, getAuthHeaders());

  if (res.status === 200 && res.data.user) {
    setUserInfo(res.data.user);
  } else {
    console.log("failed to fetch info");
  }
};

useEffect(() => {
    userinfo()
},[])

// const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const checkInDate = new Date(formData.checkInDate);
//     const checkOutDate = new Date(formData.checkOutDate);
  
//     if (checkOutDate <= checkInDate) {
//       alert("Check-out date must be later than Check-in date.");
//       return; 
//     }
  
//     const payload = { ...formData, roomId: selectedRoom, totalAmount: totalPrice, status: "pending" };
  
//     try {
//       const res = await axios.post("http://localhost:4545/userbooking/forbooking", payload, getAuthHeaders());
//       alert("Booking Successful!");
//       setFormData({
//         userName: "",
//         userPhone: "",
//         userEmail: "",
//         checkInDate: "",
//         checkOutDate: "",
//         numberOfGuests: 1,
//         numberOfRooms: 1,
//         anyChild: "no",
//         couponName: ""
//       });
  
//       setStatus(res.data);
//     } catch (err) {
//       console.error("Booking failed:", err?.response?.data || err.message);
//       alert("Booking Failed!");
//     }
//   };
  


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = { ...formData, roomId: selectedRoom, totalAmount: totalPrice,  status: "pending" };

//     try {
//       const res = await axios.post("http://localhost:4545/userbooking/forbooking", payload, getAuthHeaders());
//       alert("Booking Successful!");
//       setFormData({
//         userName: "",
//         userPhone: "",
//         userEmail: "",
//         checkInDate: "",
//         checkOutDate: "",
//         numberOfGuests: 1,
//         numberOfRooms: 1,
//         anyChild: "no",
//         couponName: ""
//       });

//       setStatus(res.data)
//     } catch (err) {
//       console.error("Booking failed:", err?.response?.data || err.message);
//       alert("Booking Failed!");
//     }
//   };

//   console.log(`>>>status>>>>`, status)
const handleSubmit = async (e) => {
  e.preventDefault();

  const checkInDate = new Date(formData.checkInDate);
  const checkOutDate = new Date(formData.checkOutDate);

  if (checkOutDate <= checkInDate) {
    alert("Check-out date must be later than Check-in date.");
    return; 
  }

  const payload = { ...formData, roomId: selectedRoom, totalAmount: totalPrice, status: "pending" };

  try {
    const res = await axios.post(
      `${baseurl}userbooking/forbooking`,
      payload,
      getAuthHeaders()
    );
    alert("Booking Successful!");
    setFormData({
      userName: "",
      userPhone: "",
      userEmail: "",
      checkInDate: "",
      checkOutDate: "",
      numberOfGuests: 1,
      numberOfRooms: 1,
      anyChild: "no",
      couponName: ""
    });

    setStatus(res.data);
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


        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-start items-start pt-12 px-12 text-white space-y-8">
  <div>
    <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
      Experience Luxury, Comfort & Serenity
    </h1>
    <p className="text-lg md:text-xl font-light max-w-md">
      Discover your perfect getaway in the heart of elegance. Whether you're planning a romantic escape, a family vacation, or a solo retreat, our rooms offer a harmonious blend of comfort, style, and top-tier service — all at prices that won’t break the bank. Book now and turn your stay into a cherished memory.
    </p>
  </div>

  <div>
    <h2 className="text-3xl md:text-4xl font-semibold mb-3 drop-shadow-lg">
      Seamless Booking & Unmatched Service
    </h2>
    <p className="text-lg md:text-xl font-light max-w-md">
      Our user-friendly platform ensures a smooth booking experience from start to finish. Enjoy personalized service, real-time availability, and instant confirmation — because your comfort starts with convenience.
    </p>
  </div>

  <div>
    <h2 className="text-3xl md:text-4xl font-semibold mb-3 drop-shadow-lg">
      Explore Destinations That Inspire
    </h2>
    <p className="text-lg md:text-xl font-light max-w-md">
      From vibrant cityscapes to tranquil retreats, we connect you with destinations that ignite your spirit. Browse through a curated selection of top-rated hotels and discover stays that match your taste and budget.
    </p>
  </div>
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
            <label className="block font-medium">Enter Email</label>
            <input
              type="email"
              name="userEmail"
              value={formData.userEmail}
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
              min={new Date().toISOString().split("T")[0]}
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
              min={new Date().toISOString().split("T")[0]}
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

          <div>
            <label className="block font-medium">Available Coupons !!</label>
            <select
              name="couponName"
              value={formData.couponName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a Coupon</option>
              {coupons.map((coupon) => (
    <option key={coupon._id} value={coupon.couponName}>
      {coupon.couponName}
    </option>
  ))}

            </select>


          </div>

    
          <div className="bg-white p-4 rounded-md shadow text-center">
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

          {/* <button
  type="button"
  className={`w-full mt-2 ${
    status === "approved" ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
  } text-white py-2 rounded font-semibold transition-all`}
  disabled={status !== "approved"}
  onClick={() => alert("Check-In Successful!")} // Replace with actual logic
>
  Check In
</button> */}





        </form>
      </div>
    </div>
  );
};

export default ForBookings;

// src/components/Charts/DayWiseBookingStatus.jsx
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import baseurl from "../BaseUrl";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Helper to get day name and group data
const getDaywiseStats = (bookings) => {
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const stats = {
    count: Array(7).fill(0),
    revenue: Array(7).fill(0),
  };

  bookings.forEach((booking) => {
    const date = new Date(booking.createdAt);
    const day = date.getDay(); // 0 = Sunday, etc.
    stats.count[day]++;
    stats.revenue[day] += booking.totalAmount || 0;
  });

  return {
    labels: weekdays,
    countData: stats.count,
    revenueData: stats.revenue,
  };
};

const DayWiseBookingStatus = () => {
  const [bookings, setBookings] = useState([]);

// const apifetch = async() =>{
//     const res = await axios.get('http://localhost:4545/userbooking/getbookingdataforadmin', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`
//         }
//     })
//     setBookings(res.data.data)
// }

// Make sure this is at the top with your imports

const apifetch = async () => {
  const res = await axios.get(`${baseurl}userbooking/getbookingdataforadmin`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  setBookings(res.data.data);
};

useEffect(() => {
    apifetch()
}, [])

// console.log(`>>>>booking>>>>`,bookings)



  const { labels, countData, revenueData } = getDaywiseStats(bookings);

  const data = {
    labels,
    datasets: [
      {
        label: "Bookings",
        data: countData,
        borderColor: "#3B82F6",
        backgroundColor: "#93C5FD",
        tension: 0.4,
        fill: false,
        pointRadius: 5,
        borderWidth: 2,
      },
      {
        label: "Revenue (₹)",
        data: revenueData,
        borderColor: "#10B981",
        backgroundColor: "#6EE7B7",
        tension: 0.4,
        fill: false,
        pointRadius: 5,
        borderWidth: 2,
      },
    ],
  };

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //       labels: { color: "#ffffff" },
  //     },
  //     title: {
  //       display: true,
  //       text: "Bookings & Revenue by Day of Week",
  //       color: "#ffffff",
  //       font: {
  //         size: 18,
  //       },
  //     },
  //   },
  //   scales: {
  //     x: {
  //       ticks: { color: "#ffffff" },
  //       grid: { color: "rgba(255,255,255,0.1)" },
  //     },
  //     y: {
  //       ticks: { color: "#ffffff" },
  //       grid: { color: "rgba(255,255,255,0.1)" },
  //     },
  //   },
  // };


  const options = {
    responsive: true,
    maintainAspectRatio: false, // ✅ Important
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#ffffff" },
      },
      title: {
        display: true,
        text: "Bookings & Revenue by Day of Week",
        color: "#ffffff",
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        ticks: { color: "#ffffff" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: {
        ticks: { color: "#ffffff" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };
  

  return (
    
    // <div className=" h-[400px] cursor-pointer bg-white/30 backdrop-blur-md hover:scale-105 transition transform rounded-2xl p-6 shadow-lg mt-8 mb-8">
    // <div className="w-full max-w-full h-[400px] bg-white/30 backdrop-blur-md hover:scale-105 transition transform rounded-2xl p-6 shadow-lg mt-8 mb-8 overflow-hidden">

    // <Line data={data} options={options} />
    // </div>

    <div className="w-full max-w-full h-[400px] bg-white/30 backdrop-blur-md hover:scale-95 transition transform rounded-2xl p-6 shadow-lg mt-8 mb-8 overflow-hidden">
    <div className="h-full w-full">
      <Line data={data} options={options} />
    </div>
  </div>

  );
};

export default DayWiseBookingStatus;

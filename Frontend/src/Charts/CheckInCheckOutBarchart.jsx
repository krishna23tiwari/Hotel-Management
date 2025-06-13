import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import baseurl from '../BaseUrl';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CheckInCheckOutBarchart = () => {
  const [checkInCount, setCheckInCount] = useState(0);
  const [cancelCount, setCancelCount] = useState(0);
  const [waitingCount, setWaitingCount] = useState(0);

  // const fetchBookingData = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:4545/userbooking/getbookingdataforadmin", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`
  //       }
  //     });

  //     const bookings = res.data.data;

  //     let checkIn = 0;
  //     let cancelled = 0;
  //     let waiting = 0;

  //     bookings.forEach(booking => {
  //       const status = booking.ischecking?.toLowerCase();

  //       if (status === 'checkin') {
  //         checkIn++;
  //       } else if (status === 'cancel') {
  //         cancelled++;
  //       } else if (status === 'waiting') {
  //         waiting++;
  //       }
  //     });

  //     setCheckInCount(checkIn);
  //     setCancelCount(cancelled);
  //     setWaitingCount(waiting);
  //   } catch (err) {
  //     console.error("Failed to fetch booking data", err);
  //   }
  // };

// Make sure this is at the top with your imports

const fetchBookingData = async () => {
  try {
    const res = await axios.get(`${baseurl}userbooking/getbookingdataforadmin`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const bookings = res.data.data;

    let checkIn = 0;
    let cancelled = 0;
    let waiting = 0;

    bookings.forEach(booking => {
      const status = booking.ischecking?.toLowerCase();

      if (status === 'checkin') {
        checkIn++;
      } else if (status === 'cancel') {
        cancelled++;
      } else if (status === 'waiting') {
        waiting++;
      }
    });

    setCheckInCount(checkIn);
    setCancelCount(cancelled);
    setWaitingCount(waiting);
  } catch (err) {
    console.error("Failed to fetch booking data", err);
  }
};
  useEffect(() => {
    fetchBookingData();
  }, []);

  const data = {
    labels: ['Checked In', 'Cancelled', 'Waiting'],
    datasets: [
      {
        label: 'Booking Status',
        data: [checkInCount, cancelCount, waitingCount],
        backgroundColor: ['#4CAF50', '#F44336', '#FFC107'], // Green, Red, Yellow
        borderRadius: 5
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'User Booking Status'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 }
      }
    }
  };

  return (
    <div className="bg-gray-300 backdrop-blur-md p-3 h-[250px]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default CheckInCheckOutBarchart;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

// const BookingDayChart = () => {
//   const [bookingData, setBookingData] = useState([]);
//   const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// //   useEffect(() => {
// //     axios
// //       .get("http://localhost:4545/userbooking/getbookingdataforadmin")
// //       .then((res) => {
// //         setBookingData(res.data); // Adjust if your API response is wrapped
// //       })
// //       .catch((err) => {
// //         console.error("Error fetching booking data:", err);
// //       });
// //   }, []);

//     const dataset = async() => {
//         const res = await axios.get('http://localhost:4545/userbooking/getbookingdataforadmin')
//         setBookingData(res.data.data)
//     }

//     useEffect(() => {
//         dataset()
//     })

//   console.log(`>>>booking`, bookingData)

//   const countBookingsAndAmountByDay = () => {
//     const bookingsCount = Array(7).fill(0); // Sunday to Saturday
//     const totalAmount = Array(7).fill(0);

//     bookingData.forEach((booking) => {
//       const date = new Date(booking.date); // or use booking.createdAt if that's the date
//       const dayIndex = date.getDay(); // Sunday = 0, Monday = 1, ...
//       bookingsCount[dayIndex] += 1;
//       totalAmount[dayIndex] += booking.totalAmount;
//     });

//     return { bookingsCount, totalAmount };
//   };

//   const { bookingsCount, totalAmount } = countBookingsAndAmountByDay();

//   const data = {
//     labels: daysOfWeek,
//     datasets: [
//       {
//         label: "Bookings Count",
//         data: bookingsCount,
//         borderColor: "rgba(75,192,192,1)",
//         backgroundColor: "rgba(75,192,192,0.2)",
//         tension: 0.4,
//       },
//       {
//         label: "Total Amount (₹)",
//         data: totalAmount,
//         borderColor: "rgba(255,99,132,1)",
//         backgroundColor: "rgba(255,99,132,0.2)",
//         tension: 0.4,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       tooltip: {
//         mode: "index",
//         intersect: false,
//       },
//       legend: {
//         position: "top",
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           callback: (value) => `₹${value}`,
//         },
//       },
//     },
//   };

//   return (
//     <div className="p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Bookings & Amount by Day of Week</h2>
//       <Line data={data} options={options} />
//     </div>
//   );
// };

// export default BookingDayChart;

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





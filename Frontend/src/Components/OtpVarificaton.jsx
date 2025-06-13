import React, { useState,useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseurl from '../BaseUrl';

const OtpVarificaton = () => {
    const [otp, setOtp] = useState('');
    const navi = useNavigate();
    const email = localStorage.getItem('signupEmail'); 


    // const handleSubmit = async(e) => {
    //     e.preventDefault()

    //     if (!email) {
    //         alert('No email found. Please signup again.');
    //         navigate('/signup');
    //         return;
    //     }

    //     try{
    //     const res = await axios.post('http://localhost:4545/user/verifyOtp', {email, otp})

    //     if(res.status === 200){
    //         alert(res.data.message)
    //         localStorage.removeItem('signupEmail')
    //         navi('/login')
    //     }
    //     }catch(err){
    //         alert(err.response.data.message || 'something is wrong')
    //     }
    // }


    const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email) {
    alert('No email found. Please signup again.');
    navigate('/signup');
    return;
  }

  try {
    const res = await axios.post(`${baseurl}user/verifyOtp`, { email, otp });

    if (res.status === 200) {
      alert(res.data.message);
      localStorage.removeItem('signupEmail');
      navi('/login');
    }
  } catch (err) {
    alert(err.response?.data?.message || 'something is wrong');
  }
};
    

  return (

    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#1f1f47] via-[#2c2c5e] to-[#1a1a2e]">
    <form onSubmit={handleSubmit} className="bg-[#2b2b55] text-white relative flex items-center flex-col max-w-md w-full mx-4 px-8 py-10 rounded-2xl shadow-lg">
      <img
        className="h-16 w-16 absolute -top-8"
        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/otp/privacyIcon.png"
        alt="privacyIcon"
      />
      <h2 className="text-2xl font-semibold mb-2 text-center text-gray-300 mt-6">
        OTP Verification
      </h2>
      <p className="mb-6 text-center text-sm text-gray-400">
        Please enter the 6-digit code sent to your email
      </p>

      <input
        type="text"
        maxLength="6"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full text-center text-lg tracking-widest bg-[#1e1e3f] text-white border border-gray-600 rounded-md py-3 mb-6 outline-none focus:border-purple-500"
      />

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition duration-300"
      >
        Verify OTP
      </button>
    </form>
  </div>
  );
};

export default OtpVarificaton;

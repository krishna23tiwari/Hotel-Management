import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import {FaUser,FaEnvelope,FaLock,FaPhone,FaCalendarAlt,FaIdBadge} from 'react-icons/fa';
import baseurl from '../BaseUrl';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '', gender: '', age: ''
  });

  const navi = useNavigate()

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  // const handleSubmit = async(e) => {
  //   e.preventDefault();

  //   try{
  //     const res = await axios.post('http://localhost:4545/user/signup', formData)
  //     if (res.status === 201) {
  //       alert(res.data.message, "jjk");
  //       localStorage.setItem('signupEmail', formData.email);
  //       navi('/otp');
  //     } else {
  //       alert(res.data.message, "hello" || 'Signup failed');
  //     }
  //   } catch (error) {
  //     alert(error?.response?.data?.message || 'Something went wrong');
  //   }
    
  // };
// Make sure this is at the top with your imports

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(`${baseurl}user/signup`, formData);
    if (res.status === 201) {
      alert(res.data.message, "jjk");
      localStorage.setItem('signupEmail', formData.email);
      navi('/otp');
    } else {
      alert(res.data.message, "hello" || 'Signup failed');
    }
  } catch (error) {
    alert(error?.response?.data?.message || 'Something went wrong');
  }
};
  const fields = [
    { name: 'name', type: 'text', placeholder: 'Full Name', Icon: FaUser },
    { name: 'email', type: 'email', placeholder: 'Email Address', Icon: FaEnvelope },
    { name: 'password', type: 'password', placeholder: 'Password', Icon: FaLock },
    { name: 'phone', type: 'text', placeholder: 'Phone Number', Icon: FaPhone },
    { name: 'gender', type: 'text', placeholder: 'Gender', Icon: FaIdBadge },
    { name: 'age', type: 'number', placeholder: 'Age', Icon: FaCalendarAlt },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-2xl shadow-2xl p-8"
      >
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {fields.map(({ name, type, placeholder, Icon }) => (
            <motion.div
              key={name}
              whileFocus={{ scale: 1.02 }}
              className="flex items-center bg-gray-700 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-purple-500 transition"
            >
              <Icon className="h-5 w-5 text-gray-400 mr-3" />
              <input
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-500"
                required={['name', 'email', 'password', 'age'].includes(name)}
              />
            </motion.div>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full font-semibold shadow-lg transition"
          >
            Sign Up
          </motion.button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-purple-400 hover:text-purple-300 underline">
            Log In
          </a>
        </p>
      </motion.div>
    </div>
  );
}

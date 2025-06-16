import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaCalendarAlt, FaIdBadge } from 'react-icons/fa';
import baseurl from '../BaseUrl';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '', gender: '', age: ''
  });

  const navi = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${baseurl}user/signup`, formData);
      if (res.status === 201) {
        alert(res.data.message);
        localStorage.setItem('signupEmail', formData.email);
        navi('/otp');
      } else {
        alert(res.data.message || 'Signup failed');
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-500 via-slate-600 to-yellow-700 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full bg-white rounded-xl shadow-lg p-6 sm:p-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(({ name, type, placeholder, Icon }) => (
            <div key={name} className="flex items-center border border-gray-300 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-500 transition">
              <Icon className="h-5 w-5 text-gray-500 mr-3" />
              <input
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                required={['name', 'email', 'password', 'age'].includes(name)}
              />
            </div>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
          >
            Sign Up
          </motion.button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 hover:text-indigo-500 underline">
            Log In
          </a>
        </p>
      </motion.div>
    </div>
  );
}

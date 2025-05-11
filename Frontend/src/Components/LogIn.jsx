import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const [step, setStep] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const navi = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4545/user/login', { email, password });
      alert(res.data.message);
      localStorage.setItem('token', res.data.token);


      if (res.data.role === 'admin') {
        navi('/add-state');
      } else {
        navi('/user-board');
      }
    } catch (err) {
      alert(err.response.data.message || 'Login failed');
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending OTP to email:", email);

      const res = await axios.post('http://localhost:4545/user/sendOtpOnLogin', { email });
      alert(res.data.message);
      setStep('otp');
    } catch (err) {
      alert(err.response.data.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    console.log(`>>>>forresetpwdotp>>>>`,email,otp )
    try {
      const res = await axios.post('http://localhost:4545/user/verifyResetOtp', { email, otp });
      alert(res.data.message);
      setStep('reset');
    } catch (err) {
      alert(err.response?.data?.message || 'OTP verification failed');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPass !== confirmPass) return alert("Passwords don't match");

    try {
      const res = await axios.post('http://localhost:4545/user/resetPassword', { email, newPass });
      alert(res.data.message);
      setStep('login');
      setPassword('');
      setNewPass('');
      setConfirmPass('');
      setOtp('');
    } catch (err) {
      alert(err.response?.data?.message || 'Password reset failed');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#1a1a2e] text-white">
      <div className="bg-[#2b2b55] p-8 rounded-xl shadow-md w-full max-w-md">
        {step === 'login' && (
          <>
            <h2 className="text-2xl mb-4 text-center">Login</h2>
            <form onSubmit={handleLogin}>
              <input name='email' type="email" placeholder="Email" className="w-full mb-4 p-3 rounded bg-[#1e1e3f]" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder="Password" className="w-full mb-4 p-3 rounded bg-[#1e1e3f]" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="submit" className="w-full bg-indigo-600 py-2 rounded font-semibold">Login</button>
            </form>
            <div className="mt-4 flex justify-between text-sm">
              <button onClick={() => setStep('forgot')} className="text-indigo-300 hover:underline">Forgot Password?</button>
              <button onClick={() => navi('/signup')} className="text-purple-300 hover:underline">Signup</button>
            </div>
          </>
        )}

        {step === 'forgot' && (
          <>
            <h2 className="text-2xl mb-4 text-center">Forgot Password</h2>
            <form onSubmit={handleSendOtp}>
              <input type="email" placeholder="Enter your email" className="w-full p-3 rounded bg-[#1e1e3f] mb-4" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <button type="submit" className="w-full bg-indigo-600 py-2 rounded">Send OTP</button>
              <button type="button" onClick={() => setStep('login')} className="mt-3 text-sm text-gray-400 hover:underline">Back to Login</button>
            </form>
          </>
        )}

        {step === 'otp' && (
          <>
            <h2 className="text-2xl mb-4 text-center">Verify OTP</h2>
            <form onSubmit={handleVerifyOtp}>
              <input type="text" placeholder="Enter OTP" className="w-full p-3 rounded bg-[#1e1e3f] mb-4" value={otp} onChange={(e) => setOtp(e.target.value)} required />
              <button type="submit" className="w-full bg-indigo-600 py-2 rounded">Verify</button>
            </form>
          </>
        )}

        {step === 'reset' && (
          <>
            <h2 className="text-2xl mb-4 text-center">Reset Password</h2>
            <form onSubmit={handleResetPassword}>
              <input type="password" placeholder="New Password" className="w-full p-3 rounded bg-[#1e1e3f] mb-4" value={newPass} onChange={(e) => setNewPass(e.target.value)} required />
              <input type="password" placeholder="Confirm Password" className="w-full p-3 rounded bg-[#1e1e3f] mb-4" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} required />
              <button type="submit" className="w-full bg-indigo-600 py-2 rounded">Update Password</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LogIn;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseurl from '../BaseUrl';

const Allusers = () => {
  const [users, setUsers] = useState([]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };
  
  // useEffect(() => {
  //   axios
  //     .get('http://localhost:4545/user/getalluerinfo', getAuthHeaders())
  //     .then((res) => {
  //       setUsers(res.data.users); 
  //     })
  //     .catch((err) => {
  //       console.error('Error fetching users:', err);
  //     });
  // }, []);

// Make sure this is at the top with your imports

useEffect(() => {
  axios
    .get(`${baseurl}user/getalluerinfo`, getAuthHeaders())
    .then((res) => {
      setUsers(res.data.users); 
    })
    .catch((err) => {
      console.error('Error fetching users:', err);
    });
}, []);
  console.log(`>>>user>>>`, users)

  return (
    <div className="p-4 cursor-pointer bg-white/30 backdrop-blur-md hover:scale-105 transition transform shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">User Information</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded shadow">
          <thead>
            <tr className="bg-gray-400 text-left">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Age</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user.phone}</td>
                <td className="px-4 py-2 border">{user.age}</td>
                <td className="px-4 py-2 border capitalize">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Allusers;


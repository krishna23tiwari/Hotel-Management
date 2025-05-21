import React, { useState } from 'react';
import axios from 'axios';
import photo1 from "../assets/photo1.avif";
import photo2 from "../assets/photo2.avif";
import photo3 from "../assets/photo3.avif";

const designs = [
  { id: 1, image: photo1, name: 'Design One' },
  { id: 2, image: photo2, name: 'Design Two' },
  { id: 3, image: photo3, name: 'Design Three' },
];

const UserSettings = () => {
  const [selectedBg, setSelectedBg] = useState(null);
  const email = localStorage.getItem('email');
  
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const handleDesignSelect = async (value) => {
    setSelectedBg(value.image);
  
    const res = await fetch(value.image);
    const blob = await res.blob();
    const file = new File([blob], `${value.name}.jpg`, { type: blob.type });
  
    const formData = new FormData();
    formData.append("email", email);
    formData.append("files", file);
  
    await axios.post("http://localhost:4545/user/backgroundimage", formData, getAuthHeaders());
  
    alert(`${value.name} saved as background!`);
  };
  

  return (
    <div
      className="p-6 min-h-screen transition-all duration-500"
      style={{
        backgroundImage: selectedBg ? `url(${selectedBg})` : '',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white bg-opacity-80 backdrop-blur-md p-4 rounded-xl shadow-xl">
        <h1 className="text-3xl font-semibold mb-6 text-center">🎨 Choose Your Design</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {designs.map((value) => (
            <div
              key={value.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-transform duration-300 hover:scale-105"
              onClick={() => handleDesignSelect(value)}
            >
              <img
                src={value.image}
                alt={value.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-medium text-center">{value.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSettings;

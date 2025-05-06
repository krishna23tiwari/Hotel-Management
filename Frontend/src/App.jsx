import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './Components/SignUp';
import OtpVarificaton from './Components/OtpVarificaton';
import LogIn from './Components/LogIn';
import ForUser from './Components/ForUser';
import ForAdmin from './AdminDash/ForAdmin';
import AddState from './AdminDash/AddState';
import SideBarMenuAdmin from './AdminDash/SideBarMenuAdmin';
import AddHotel from './AdminDash/AddHotel';
import AddRoom from './AdminDash/AddRoom';
import ForBookings from './Components/ForBookings';



const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <SideBarMenuAdmin />
      <div className="flex-1 p-4 ml-64"> 
        {children}
      </div>
    </div>
  );
};


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<SignUp />} />
        <Route path="/otp" element={<OtpVarificaton />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/user-board" element={<ForUser />} />
        <Route path="/user-booking-form/:selectedRoom" element={<ForBookings />} />

        {/* Admin Routes with Sidebar */}
        <Route
          path="/add-state"
          element={
            <AdminLayout>
              <AddState />
            </AdminLayout>
          }
        />
        <Route
          path="/add-city"
          element={
            <AdminLayout>
              <ForAdmin />
            </AdminLayout>
          }
        />

          <Route
          path="/add-hotel"
          element={
            <AdminLayout>
              <AddHotel />
            </AdminLayout>
          }
        />

          <Route
          path="/add-room"
          element={
            <AdminLayout>
              <AddRoom />
            </AdminLayout>
          }
        />
        {/* Add other admin routes similarly */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

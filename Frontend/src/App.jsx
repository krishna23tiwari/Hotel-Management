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
import ForUserBookingAdminSide from './Components/UserBookingAdminSide';
import AddCoupon from './AdminDash/AddCoupon';
import NavBar from './AdminDash/NavBar';
import UserSettings from './AdminDash/UserSettings';
import AdminDashBoard from './AdminDash/AdminDashBoard';
import CheckInCheckOutBarchart from './Charts/CheckInCheckOutBarchart';
import DayWiseBookingStatus from './Charts/DayWiseBookingStatus';



const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <SideBarMenuAdmin />
      <div className="flex-1 ml-64"> 
        {children}
      </div>
    </div>
  );
};

const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </div>
      <div className="pt-18"> {/* Add top padding to prevent overlap */}
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
        {/* <Route path="/user-board" element={<ForUser />} 
        <Route path="/user-booking-form/:selectedRoom" element={<ForBookings />} /> */}
        <Route path="/user-setting" element={<UserSettings />} />

        
<Route
  path="/user-board"
  element={
    <UserLayout>
      <ForUser />
    </UserLayout>
  }
/>
<Route
  path="/user-booking-form/:selectedRoom"
  element={
    <UserLayout>
      <ForBookings />
    </UserLayout>
  }
/>
        <Route path="/navbar" element={<NavBar/>} />

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

        <Route
          path="/user-admin-side-dash"
          element={
            <AdminLayout>
              <ForUserBookingAdminSide />
            </AdminLayout>
          }
          />

          <Route
          path="/coupons"
          element={
            <AdminLayout>
              <AddCoupon />
            </AdminLayout>
          }
          />

          <Route
          path="/admindash"
          element={
            <AdminLayout>
              <AdminDashBoard />
            </AdminLayout>
          }
          />

          <Route
          path="/charts"
          element={
            <AdminLayout>
              <CheckInCheckOutBarchart />
            </AdminLayout>
          }
          />

          
<Route
          path="/line-chart"
          element={
            <AdminLayout>
              <DayWiseBookingStatus />
            </AdminLayout>
          }
          />
        {/* Add other admin routes similarly */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

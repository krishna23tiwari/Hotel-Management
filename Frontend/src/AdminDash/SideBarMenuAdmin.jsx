// import { NavLink, useNavigate } from 'react-router-dom';

// const Sidebar = () => {
//   const navigate = useNavigate();

//   const menu = [
//     { name: 'Add State', path: '/add-state' },
//     { name: 'Add City', path: '/add-city' },
//     { name: 'Add Hotel', path: '/add-hotel' },
//     { name: 'Add Rooms', path: '/add-room' },
//     { name: 'View', path: '/user-board' },
//     { name: 'user-admin-side', path: '/user-admin-side-dash' },
//     { name: 'Admin coupons', path: '/coupons'},
//     { name: 'Admin-Dashboard', path: '/admindash'},
//     { name: 'Bookings-data', path: '/selected-booking-show'},
    
//   ]

//   const handleLogout = () => {
//     localStorage.clear(); 
//     navigate('/login');  
//   };

//   return (
// <div className="w-64 h-screen fixed bg-gray-900 text-white flex flex-col justify-between overflow-y-auto">

//       <div>
//         <h2 className="text-2xl font-bold p-6 border-b border-gray-700">Admin Panel</h2>
//         <nav className="p-4 flex flex-col gap-4">
//           {menu.map(item => (
//             <NavLink
//               key={item.path}
//               to={item.path}
//               className={({ isActive }) =>
//                 `p-2 rounded hover:bg-gray-700 transition ${isActive ? 'bg-blue-600' : ''}`
//               }
//             >
//               {item.name}
//             </NavLink>
//           ))}
//         </nav>
//       </div>

//       {/* Logout button */}
//       <div className="p-4 border-t border-gray-700">
//         <button
//           onClick={handleLogout}
//           className="w-full text-center p-2 rounded hover:bg-blue-600 transition bg-blue-500"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { HiMenu } from 'react-icons/hi';

const SideBarMenuAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menu = [
    { name: 'Add State', path: '/add-state' },
    { name: 'Add City', path: '/add-city' },
    { name: 'Add Hotel', path: '/add-hotel' },
    { name: 'Add Rooms', path: '/add-room' },
    { name: 'View', path: '/user-board' },
    { name: 'User Admin Side', path: '/user-admin-side-dash' },
    { name: 'Admin Coupons', path: '/coupons' },
    { name: 'Admin Dashboard', path: '/admindash' },
    { name: 'Bookings Data', path: '/selected-booking-show' },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      {/* Hamburger Button (Always visible on small screens) */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded text-white"
      >
        <HiMenu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-gray-900 text-white flex flex-col justify-between
          transition-transform duration-300 ease-in-out
          z-40 w-64
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:flex
        `}
        style={{ margin: 0, padding: 0, overflowY: 'auto' }} // <-- Add overflowY: 'auto'
      >
        <div>
          <h2 className="text-2xl font-bold p-6 border-b border-gray-700">
            Admin Panel
          </h2>
          <nav className="p-4 flex flex-col gap-4">
            {menu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `p-2 rounded hover:bg-gray-700 transition ${
                    isActive ? 'bg-blue-600' : ''
                  }`
                }
                onClick={() => setIsOpen(false)} // Close on mobile after clicking
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full text-center p-2 rounded hover:bg-blue-600 transition bg-blue-500"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBarMenuAdmin;


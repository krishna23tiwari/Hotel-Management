// import { NavLink } from 'react-router-dom';

// const Sidebar = () => {
//   const menu = [
//     { name: 'Add State', path: '/add-state' },
//     { name: 'Add City', path: '/add-city' },
//     { name: 'Add Hotel', path: '/add-hotel' },
//     { name: 'Add Rooms', path: '/add-room' }
//   ];

//   return (
//     <div className="w-64 min-h-screen fixed bg-gray-900 text-white">
//       <h2 className="text-2xl font-bold p-6 border-b border-gray-700">Admin Panel</h2>
//       <nav className="p-4 flex flex-col gap-4">
//         {menu.map(item => (
//           <NavLink
//             key={item.path}
//             to={item.path}
//             className={({ isActive }) =>
//               `p-2 rounded hover:bg-gray-700 transition ${isActive ? 'bg-blue-600' : ''}`
//             }
//           >
//             {item.name}
//           </NavLink>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;


import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const menu = [
    { name: 'Add State', path: '/add-state' },
    { name: 'Add City', path: '/add-city' },
    { name: 'Add Hotel', path: '/add-hotel' },
    { name: 'Add Rooms', path: '/add-room' },
    { name: 'for user', path: '/user-board' },
    { name: 'practice', path: '/user-board' }
  ]

  const handleLogout = () => {
    localStorage.clear(); // Clear token or all stored items
    navigate('/login');   // Navigate to login
  };

  return (
    <div className="w-64 min-h-screen fixed bg-gray-900 text-white flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold p-6 border-b border-gray-700">Admin Panel</h2>
        <nav className="p-4 flex flex-col gap-4">
          {menu.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `p-2 rounded hover:bg-gray-700 transition ${isActive ? 'bg-blue-600' : ''}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full text-center p-2 rounded hover:bg-blue-600 transition bg-blue-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;


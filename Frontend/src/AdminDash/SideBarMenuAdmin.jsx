import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menu = [
    { name: 'Add State', path: '/add-state' },
    { name: 'Add City', path: '/add-city' },
    { name: 'Add Hotel', path: '/add-hotel' },
    { name: 'Add Rooms', path: '/add-room' }
  ];

  return (
    <div className="w-64 min-h-screen fixed bg-gray-900 text-white">
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
  );
};

export default Sidebar;

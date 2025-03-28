import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiCheckSquare, FiUser, FiSettings } from 'react-icons/fi';
import ThemeToggle from '../ui/ThemeToggle';

type MainLayoutProps = {
  children: ReactNode;
};

type NavItem = {
  path: string;
  label: string;
  icon: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  
  const navItems: NavItem[] = [
    { path: '/', label: 'Dashboard', icon: <FiHome size={20} /> },
    { path: '/tasks', label: 'Tasks', icon: <FiCheckSquare size={20} /> },
    { path: '/profile', label: 'Profile', icon: <FiUser size={20} /> },
    { path: '/settings', label: 'Settings', icon: <FiSettings size={20} /> },
  ];

  return (
    <div className="drawer lg:drawer-open">
      <input id="main-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label htmlFor="main-drawer" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div> 
          <div className="flex-1 px-2 mx-2 text-xl font-bold">ZenTask</div>
          <div className="flex-none flex items-center gap-2">
            <ThemeToggle />
            <button className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://api.dicebear.com/6.x/avataaars/svg?seed=user123" alt="avatar" />
              </div>
            </button>
          </div>
        </div>
        
        {/* Page content */}
        <main className="flex-1 p-4 overflow-y-auto">
          {children}
        </main>
      </div>
      
      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="main-drawer" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-64 h-full bg-base-200 text-base-content">
          <li className="mb-4">
            <h1 className="text-xl font-bold">ZenTask</h1>
          </li>
          {navItems.map((item) => (
            <li key={item.path} className="mb-1">
              <Link 
                to={item.path} 
                className={location.pathname === item.path ? 'active' : ''}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainLayout; 
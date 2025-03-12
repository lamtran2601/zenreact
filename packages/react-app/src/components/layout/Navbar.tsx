import { FC, useState } from 'react';
import { useFilters, useTicketActions } from '../../store/ticketStore';

/**
 * @pattern LayoutComponent
 * @rule StableReferences
 * Navigation component with optimized event handlers
 */
export const Navbar: FC = () => {
  const filters = useFilters();
  const { applyFilters } = useTicketActions();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    applyFilters({ team: searchTerm });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="navbar bg-primary text-primary-content shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Home</a></li>
            <li><a>Matches</a></li>
            <li><a>My Bookings</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Football Tickets</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a>Home</a></li>
          <li><a>Matches</a></li>
          <li><a>My Bookings</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="form-control">
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Search teams..." 
              className="input input-bordered" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="btn btn-square" onClick={handleSearch}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link to="/">JAMES Lottery Admin</Link>
        </div>

        <div className="space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">
            Dashboard
          </Link>
          <Link to="/lotteries" className="text-gray-300 hover:text-white">
            Lotteries
          </Link>
          <Link to="/users" className="text-gray-300 hover:text-white">
            Users
          </Link>
          <Link to="/results" className="text-gray-300 hover:text-white">
            Results
          </Link>
          <Link to="/reports" className="text-gray-300 hover:text-white">
            Reports
          </Link>
        </div>

        <div>
          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

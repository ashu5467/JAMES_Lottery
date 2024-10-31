import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-300 to-purple-300 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold hover:scale-105 transition-transform duration-300 ease-in-out">
          <Link to="/">JAMES Lottery Admin</Link>
        </div>

        <div className="space-x-6">
          {['Dashboard', 'Lotteries', 'Users', 'Results', 'Reports'].map((option, index) => (
            <Link
              key={index}
              to={`/${option.toLowerCase()}`}
              className="text-gray-200 font-bold hover:text-white transition duration-300 ease-in-out"
            >
              {option}
            </Link>
          ))}
        </div>

        <div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-300 ease-in-out transform hover:scale-105">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

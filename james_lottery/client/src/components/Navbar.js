import { Link } from "react-router-dom";
import { FaHome, FaTicketAlt, FaTrophy, FaShoppingCart, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-4xl font-bold flex items-center transition duration-300 hover:text-yellow-300 font-poppins transform hover:scale-105">
          <FaTicketAlt className="mr-2 animate-pulse" /> JAMES Lottery 
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={28} className="text-yellow-300" /> : <FaBars size={28} className="text-yellow-300" />}
        </div>

        {/* Desktop Menu */}
        <div className={`md:flex space-x-6 items-center ${isOpen ? "block" : "hidden"} md:block`}>
          {[
            { to: "/", label: "Home", icon: <FaHome /> },
            { to: "/lotteries", label: "Lotteries", icon: <FaTicketAlt /> },
            { to: "/results", label: "Results", icon: <FaTrophy /> },
            { to: "/winners", label: "Winners", icon: <FaTrophy /> },
            { to: "/login", label: "Login / Register", icon: <FaUser /> },
            { to: "/cart", label: "Cart", icon: <FaShoppingCart /> },
          ].map(({ to, label, icon }, index) => (
            <Link
              key={index}
              to={to}
              className="flex items-center text-lg font-semibold transition duration-300 hover:scale-105 transform font-poppins relative overflow-hidden"
            >
              <span className="mr-2 text-2xl">{icon}</span>
              <span className="relative z-10">{label}</span>
              <span className="absolute inset-0 bg-white bg-opacity-20 rounded-lg transition duration-300 transform scale-0 hover:scale-100" />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

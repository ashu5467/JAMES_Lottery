import { Link } from "react-router-dom";
import { FaHome, FaTicketAlt, FaTrophy, FaShoppingCart, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from '../context/AuthContext'; // Import the Auth context
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { isLoggedIn, username } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  // const toggleLanguage = () => {
  //   const newLanguage = i18n.language === 'bn' ? 'en' : 'bn';
  //   i18n.changeLanguage(newLanguage);
  // };

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'bn' ? 'en' : 'bn';
    i18n.changeLanguage(newLanguage);
    console.log("Language changed to:", newLanguage);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-4xl font-bold flex items-center transition duration-300 hover:text-yellow-300 font-poppins transform hover:scale-105">
          <FaTicketAlt className="mr-2 animate-pulse" /> {t('JAMES Lottery')}
        </Link>

        {/* Language Toggle Button */}
        <button
          onClick={toggleLanguage}
          className="text-sm bg-transparent text-white px-3 py-1 rounded-lg font-semibold hover:bg-yellow-400 hover:bg-opacity-20"
        >
          {i18n.language === 'bn' ? 'English' : 'বাংলা'}
        </button>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={28} className="text-yellow-300" /> : <FaBars size={28} className="text-yellow-300" />}
        </div>

        {/* Desktop Menu */}
        <div className={`hidden md:flex space-x-6 items-center`}>
          {[
            { to: "/", label: t("Home"), icon: <FaHome /> },
            { to: "/lotteries", label: t("Lotteries"), icon: <FaTicketAlt /> },
            { to: "/results", label: t("Results"), icon: <FaTrophy /> },
            { to: "/winners", label: t("Winners"), icon: <FaTrophy /> },
            { to: "/cart", label: t("Cart"), icon: <FaShoppingCart /> },
            isLoggedIn 
              ? { to: "/profile", label: username, icon: <FaUser /> }
              : { to: "/login", label: t("Login / Register"), icon: <FaUser /> },
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2">
          {[
            { to: "/", label: t("Home"), icon: <FaHome /> },
            { to: "/lotteries", label: t("Lotteries"), icon: <FaTicketAlt /> },
            { to: "/results", label: t("Results"), icon: <FaTrophy /> },
            { to: "/winners", label: t("Winners"), icon: <FaTrophy /> },
            { to: "/cart", label: t("Cart"), icon: <FaShoppingCart /> },
            isLoggedIn 
              ? { to: "/profile", label: username, icon: <FaUser /> }
              : { to: "/login", label: t("Login / Register"), icon: <FaUser /> },
          ].map(({ to, label, icon }, index) => (
            <Link
              key={index}
              to={to}
              className="flex items-center text-lg font-semibold p-2 transition duration-300 hover:scale-105 transform font-poppins relative overflow-hidden"
            >
              <span className="mr-2 text-2xl">{icon}</span>
              <span className="relative z-10">{label}</span>
              <span className="absolute inset-0 bg-white bg-opacity-20 rounded-lg transition duration-300 transform scale-0 hover:scale-100" />
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

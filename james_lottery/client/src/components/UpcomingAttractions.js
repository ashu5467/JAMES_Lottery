// UpcomingAttractions.js
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaTicketAlt } from 'react-icons/fa';
import { CartContext } from '../context/CartContext'; // Import the CartContext
import { useNavigate } from 'react-router-dom'; 

const UpcomingAttractions = () => {
  const { addToCart } = useContext(CartContext); // Access addToCart from context

const navigate = useNavigate();

  const attractions = [
    {
      id: 1, // Add unique ID for each attraction
      title: "Mega Lottery",
      date: "15th October",
      price: 10, // Change to number for calculations
      label: "Hot",
      labelColor: "bg-green-400",
    },
    {
      id: 2,
      title: "Super Jackpot",
      date: "20th October",
      price: 15,
      label: "New",
      labelColor: "bg-yellow-400",
    },
    {
      id: 3,
      title: "Daily Lottery",
      date: "Tomorrow",
      price: 5,
      label: "Last Chance",
      labelColor: "bg-red-400",
    },
  ];

  // Function to add ticket to cart
  const handleAddToCart = (attraction) => {
    addToCart(attraction);
    navigate('/lottery-selection');
  };

  return (
    <section className="mb-16">
      <h2 className="text-4xl font-extrabold text-yellow-300 mb-8 text-center">
        Upcoming Attractions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
        {attractions.map((attraction, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-6 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl relative border-2 border-yellow-300"
          >
            <h3 className="text-2xl font-bold mb-2 text-blue-800">{attraction.title}</h3>
            <p className="text-gray-600 mb-4">Next draw: {attraction.date}</p>
            <p className="text-xl font-bold mb-4 text-green-600">${attraction.price}</p>
            <div className="flex space-x-2">
              <Link
                to="/cart"
                className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-lg inline-block hover:opacity-90 transition"
              >
                <FaTicketAlt className="inline mr-2" /> Buy Now
              </Link>
              <button
                onClick={() => handleAddToCart(attraction)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
              >
                Add to Cart
              </button>
            </div>
            <div className="absolute top-0 right-0 p-2">
              <span className={`${attraction.labelColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                {attraction.label}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
              <p className="text-xs font-semibold text-gray-500">Good Luck!</p>
            </div>
          </div>
        ))}
      </div>
      {/* View All Button */}
      <div className="text-center mt-8">
        <Link
          to="/lotteries"
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg inline-block text-lg font-bold hover:opacity-90 transition"
        >
          View All
        </Link>
      </div>
    </section>
  );
};

export default UpcomingAttractions;

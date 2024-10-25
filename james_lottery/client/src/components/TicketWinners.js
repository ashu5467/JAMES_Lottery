import React, { useEffect, useState } from 'react';
import { BanknotesIcon } from '@heroicons/react/24/outline'; // Importing BanknotesIcon
import { CurrencyDollarIcon } from '@heroicons/react/24/outline'; // Importing CurrencyDollarIcon for coins
import { Link } from 'react-router-dom'; 
import profilePic from '../assets/profile-icon.png'


// TicketWinners Component
const TicketWinners = ({ winners }) => {
  const [moneyDrops, setMoneyDrops] = useState([]);

  // Function to add a new money drop
  const addMoneyDrop = () => {
    const isCoin = Math.random() > 0.5; // Randomly choose between coin and banknote
    const newDrop = {
      id: Date.now() + Math.random(), // Unique ID
      left: `${Math.random() * 100}vw`, // Random horizontal position
      animationDuration: `${3 + Math.random() * 2}s`, // Random speed
      animationDelay: `${Math.random() * 2}s`, // Staggered start
      type: isCoin ? 'coin' : 'banknote', // Determine the type of drop
    };
    setMoneyDrops((prevDrops) => [...prevDrops, newDrop]);
  };

  // Effect to add money drops continuously
  useEffect(() => {
    const interval = setInterval(addMoneyDrop, 500); // Add a new drop every 500ms
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <section className="relative mb-16 text-center py-16 bg-gradient-to-r from-yellow-400 to-red-500 overflow-hidden rounded-lg">
      {/* Dropping Money Elements */}
      {moneyDrops.map((drop) => (
        <div
          key={drop.id}
          className={`absolute w-12 h-12 rounded-full flex items-center justify-center`} // Adjusted size and centering
          style={{
            top: `-${Math.random() * 50}px`, // Start slightly above view
            left: drop.left, // Random horizontal position
            animation: `fall ${drop.animationDuration} linear forwards`,
            animationDelay: drop.animationDelay, // Staggered drops
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light background for contrast
          }}
        >
          {/* Render either the coin or banknote icon */}
          {drop.type === 'coin' ? (
            <CurrencyDollarIcon className="w-8 h-8 text-yellow-600" /> // Adjusted color
          ) : (
            <BanknotesIcon className="w-8 h-8 text-green-600" />
          )}
        </div>
      ))}

      <h2 className="text-5xl font-extrabold text-white mb-8 uppercase tracking-wider">
        Lottery Winners
      </h2>
      <div className="flex flex-wrap justify-center gap-8 px-4">
        {/* Winner Cards */}
        {winners.map((winner, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl shadow-2xl w-72 transform transition-transform duration-700 ease-in-out hover:-translate-x-2 hover:-translate-y-2 hover:scale-105 hover:shadow-xl animate-slideIn"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
              animationDelay: `${index * 0.3}s`,
            }}
          >
            <div className="relative overflow-hidden rounded-full h-28 w-28 mx-auto mb-4">
              <img
                src={winner.profilePic} // Replace with actual image URL
                alt={`${winner.name} profile`}
                className="w-full h-full object-cover"
              />
              {/* Overlay effect on image hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black opacity-0 hover:opacity-60 transition-opacity duration-500"></div>
            </div>
            <h3 className="text-2xl font-bold text-blue-900 mb-2">{winner.name}</h3>
            <p className="text-gray-700 text-lg mb-2">
              Prize: <span className="font-semibold text-green-600">{winner.prize}</span>
            </p>
            <p className="text-lg font-medium text-pink-600">Ticket No: {winner.ticketNumber}</p>
          </div>
        ))}
      </div>

      {/* View Winners Button */}
      <Link
        to="/winners" // Navigate to winners page
        className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-blue-700 transition"
      >
        View Winners
      </Link>

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh); // Drop to the bottom of the viewport
          }
        }
      `}</style>
    </section>
  );
};

export default TicketWinners;

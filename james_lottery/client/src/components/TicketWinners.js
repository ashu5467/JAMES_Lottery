import React from 'react';
import w1 from '../assets/w1.jpeg';
import w2 from '../assets/w2.jpeg';
import w3 from '../assets/w3.jpeg';
import w4 from '../assets/w4.jpeg';

// Sample data for winners (this could come from an API or context)
const winners = [
  { id: 1, name: "John Doe", prize: "5 Lakh", photo: w1 },
  { id: 2, name: "Jane Smith", prize: "1 Lakh", photo: w2 },
  { id: 3, name: "Sam Wilson", prize: "10 Lakh", photo: w3 },
  { id: 4, name: "Alex Johnson", prize: "10 Lakh", photo: w4 },
];

const TicketWinners = () => {
  return (
    <div className="min-h-screen py-10" style={{ backgroundColor: 'transparent' }}>
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-10 text-center drop-shadow-lg">
          Winners
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {winners.map(winner => (
            <div
              key={winner.id}
              className="card bg-white bg-opacity-70 border border-yellow-300 p-6 shadow-lg rounded-lg flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              style={{ borderRadius: '0px 30px 30px 0px', height: '300px', width: '200px' }} // Adjust height and width as needed
            >
              <h3 className="text-2xl font-bold text-center mb-2 text-blue-600 drop-shadow-md">
                Won {winner.prize}
              </h3>
              <img
                src={winner.photo}
                alt={`${winner.name} photo`}
                className="mb-4 w-32 h-32 rounded-full object-cover border-2 border-yellow-200"
              />
              <p className="text-lg text-center font-semibold text-gray-800 drop-shadow-md">
                {winner.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketWinners;

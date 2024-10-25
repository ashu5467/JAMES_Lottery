import React from 'react';
import { Link } from 'react-router-dom';
import { FaTicketAlt } from 'react-icons/fa';

const MonthlyLotteries = () => {
  const lotteries = [
    {
      title: "Mega Monthly Lottery",
      drawDate: "31st October",
      ticketPrice: "$25",
      status: "Monthly",
      statusColor: "bg-blue-400",
    },
    {
      title: "Super Jackpot",
      drawDate: "30th November",
      ticketPrice: "$30",
      status: "Upcoming",
      statusColor: "bg-yellow-400",
    },
    {
      title: "Special Monthly Draw",
      drawDate: "15th November",
      ticketPrice: "$20",
      status: "Limited Time",
      statusColor: "bg-red-400",
    },
  ];

  return (
    <section className="mb-16">
      <h2 className="text-4xl font-extrabold text-yellow-300 mb-8 text-center">
        Monthly Lotteries
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
        {lotteries.map((lottery, index) => (
          <div key={index} className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-6 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl relative border-2 border-yellow-300">
            <h3 className="text-2xl font-bold mb-2 text-blue-800">{lottery.title}</h3>
            <p className="text-gray-600 mb-4">Draw: {lottery.drawDate}</p>
            <p className="text-xl font-bold mb-4 text-green-600">{lottery.ticketPrice} per ticket</p>
            <div className="flex space-x-2">
              <Link
                to="/cart"
                className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-lg inline-block hover:opacity-90 transition"
              >
                <FaTicketAlt className="inline mr-2" /> Buy Now
              </Link>
            </div>
            <div className="absolute top-0 right-0 p-2">
              <span className={`${lottery.statusColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                {lottery.status}
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

export default MonthlyLotteries;

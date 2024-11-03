import { useState, useEffect, useContext } from "react";
import { fetchLotteries } from "../services/lotteryService";
import { FaTicketAlt } from "react-icons/fa";
import { CartContext } from "../context/CartContext"; // Import CartContext
import LotterySelectionPage from './LotterySelectionPage'; // Import the new LotterySelectionPage
import { Link } from 'react-router-dom'; // Import Link for navigation

const LotteriesPage = () => {
  const { addToCart } = useContext(CartContext); // Use context to manage cart
  const [lotteries, setLotteries] = useState([]); // Initialize lotteries state
  const [filteredLotteries, setFilteredLotteries] = useState([]); // State for filtered lotteries
  const [filter, setFilter] = useState("all"); // State for filter selection
  const [selectedLotteries, setSelectedLotteries] = useState([]);
  const [showSelectionPage, setShowSelectionPage] = useState(false);

  // Fetch lotteries on component mount
  useEffect(() => {
    fetchLotteries().then((data) => {
      setLotteries(data);
      setFilteredLotteries(data); // Set initial filtered lotteries
    });
  }, []);

  // Update filtered lotteries based on selected filter
  useEffect(() => {
    if (filter === "weekly") {
      setFilteredLotteries(lotteries.filter((lottery) => lottery.frequency === "weekly"));
    } else if (filter === "monthly") {
      setFilteredLotteries(lotteries.filter((lottery) => lottery.frequency === "monthly"));
    } else {
      setFilteredLotteries(lotteries); // Show all if filter is 'all'
    }
  }, [filter, lotteries]);

  const handleSelectLottery = (lottery) => {
    setSelectedLotteries((prev) => [...prev, lottery]); // Add to selected lotteries
    setShowSelectionPage(true); // Show selection page
  };

  return (
    <>
      {showSelectionPage ? (
        <LotterySelectionPage selectedLotteries={selectedLotteries} addToCart={addToCart} />
      ) : (
        <div className="bg-gradient-to-b from-blue-100 to-purple-200 min-h-screen py-10">

          <div className="container mx-auto px-4">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-10 text-center drop-shadow-lg">
              Available Lotteries
            </h1>
            <p className="text-lg text-gray-800 text-center mb-8">
              Join the excitement and stand a chance to win amazing prizes! Check out our latest lotteries below.
            </p>

            {/* Filter Options */}
            <div className="mb-6 text-center">
            <label className="text-gray-800 font-semibold mr-2" htmlFor="filter">Filter by:</label>
              <select
                id="filter"
                className="bg-white text-gray-700 p-2 rounded"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Lotteries</option>
                <option value="daily">Daily Lotteries</option>
                <option value="weekly">Weekly Lotteries</option>
                <option value="monthly">Monthly Lotteries</option>
              </select>
            </div>

            <div className="relative flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredLotteries.length > 0 ? (
                  filteredLotteries.map((lottery) => (
                    <div
                      key={lottery._id}
                      className="card bg-yellow-50 border-2 border-yellow-500 p-4 shadow-lg"
                      style={{ borderRadius: '30px 30px 0 0', margin: '0 8px' }} // Add margin for spacing
                    >
                      <h3 className="text-2xl font-bold text-center mb-2 text-blue-800" style={{ fontFamily: 'Cinzel, serif' }}>
                        {lottery.name}
                      </h3>
                      <p className="text-lg text-center mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
                        Win First Prize!
                      </p>
                      <p className="text-3xl font-bold text-green-600 text-center mb-4">{`$${lottery.prize}`}</p>
                      <button
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white w-full px-4 py-2 rounded-lg transform transition-transform duration-200 hover:scale-105"
                        onClick={() => handleSelectLottery(lottery)}
                      >
                        Add to Cart
                      </button>
                      <div className="border-t-2 border-dashed my-4 border-gray-300"></div>
                      <Link
                        to="/cart"
                        className="bg-gradient-to-r from-green-400 to-green-600 text-white w-full px-4 py-2 rounded-lg inline-block transform transition-transform duration-200 hover:scale-105"
                      >
                        <FaTicketAlt className="inline mr-2" /> Buy Now
                      </Link>
                      <p className="text-xs text-center text-gray-600 mt-2" style={{ fontFamily: 'Cinzel, serif' }}>
                        Draw Date: {lottery.startDate} <br />
                        End Date: {lottery.endDate} <br />
                        Frequency: {lottery.frequency}<br />
                        Price: <span className="font-bold text-green-600">{lottery.price}</span> <br />
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-lg text-white text-center col-span-3">
                    No lotteries available at the moment. Please check back later!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LotteriesPage;

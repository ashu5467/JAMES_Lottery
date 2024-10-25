import { useState, useEffect, useContext } from "react";
import { fetchLotteries } from "../services/lotteryService";
import { FaTicketAlt } from "react-icons/fa";
import { CartContext } from "../context/CartContext"; // Import CartContext
import LotterySelectionPage from './LotterySelectionPage'; // Import the new LotterySelectionPage

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
        <div className="bg-gradient-to-b from-blue-500 to-purple-500 min-h-screen py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-extrabold text-white mb-10 text-center drop-shadow-lg">
              Available Lotteries
            </h1>
            <p className="text-lg text-white text-center mb-8">
              Join the excitement and stand a chance to win amazing prizes! Check out our latest lotteries below.
            </p>

            {/* Filter Options */}
            <div className="mb-6 text-center">
              <label className="text-white font-semibold mr-2" htmlFor="filter">Filter by:</label>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLotteries.length > 0 ? (
                filteredLotteries.map((lottery) => (
                  <div
                    key={lottery.id}
                    className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-6 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl relative border-2 border-yellow-300"
                  >
                    <h3 className="text-2xl font-bold mb-2 text-blue-800">{lottery.name}</h3>
                    <p className="text-gray-600 mb-4">
                      Price: <span className="text-green-600 font-bold">${lottery.price}</span>
                    </p>
                    <p className="text-md text-gray-500 mb-4">
                      Draw Date: <span className="font-semibold">{lottery.drawDate}</span>
                    </p>
                    <p className="text-md text-gray-500 mb-4">
                      Draw Time: <span className="font-semibold">{lottery.drawTime}</span>
                    </p>
                    <p className="text-md text-gray-500 mb-4">
                      Frequency: <span className="font-semibold">{lottery.frequency}</span>
                    </p>
                    <p className="text-md text-gray-500 mb-4">
                      Description: <span className="font-semibold">{lottery.description}</span>
                    </p>
                    <button
                      className="bg-gradient-to-r from-green-400 to-green-600 text-white p-3 rounded-lg mt-4 flex items-center justify-center hover:opacity-90 transition"
                      onClick={() => handleSelectLottery(lottery)}
                    >
                      <FaTicketAlt className="mr-2" /> Add to Cart
                    </button>
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
      )}
    </>
  );
};

export default LotteriesPage;

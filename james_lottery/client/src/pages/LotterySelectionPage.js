import { useState, useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import bannerImage from '../assets/cartImg.jpeg';
import axios from 'axios'; // Make sure you have axios installed

// Helper function to calculate days until the draw date
const calculateDaysUntilDraw = (drawDate) => {
  const today = new Date();
  const draw = new Date(drawDate);
  const diffTime = Math.abs(draw - today);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const LotterySelectionPage = ({ selectedLotteries, addToCart }) => {
  const [quantities, setQuantities] = useState(selectedLotteries.map(() => 1));
  const [selectedNumbers, setSelectedNumbers] = useState(selectedLotteries.map(() => []));
  const [selectionMode, setSelectionMode] = useState("number");
  const [bulkQuantity, setBulkQuantity] = useState(5);
  const [showBulkSelection, setShowBulkSelection] = useState(false);
  const [summary, setSummary] = useState([]);
  const [ticketsToShow, setTicketsToShow] = useState(20); 
  const [tickets, setTickets] = useState({}); // State to store fetched tickets

  // Fetch tickets from backend based on selected lotteries
 // Fetch tickets from backend based on selected lotteries
useEffect(() => {
  const fetchTickets = async () => {
    try {
      const promises = selectedLotteries.map(lottery => {
        console.log(`Fetching tickets for lottery ID: ${lottery._id}`);
        return axios.get(`http://localhost:5000/api/tickets/${lottery._id}`);
      });
      const results = await Promise.all(promises);

      // Create a new state object for tickets
      const newTickets = {};
      results.forEach((result, index) => {
        console.log(`Tickets for lottery ${selectedLotteries[index].name}:`, result.data);
        newTickets[selectedLotteries[index]._id] = result.data; // Store tickets by lottery ID
      });

      setTickets(newTickets); // Update the state with fetched tickets
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  fetchTickets();
}, [selectedLotteries]);

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
    updateSummary(); // Update summary when quantity changes
  };

  const handleNumberSelect = (lotteryIndex, number) => {
    const newSelectedNumbers = [...selectedNumbers];
    if (newSelectedNumbers[lotteryIndex].includes(number)) {
      newSelectedNumbers[lotteryIndex] = newSelectedNumbers[lotteryIndex].filter((n) => n !== number);
    } else {
      newSelectedNumbers[lotteryIndex].push(number);
    }
    setSelectedNumbers(newSelectedNumbers);
    updateSummary(); // Update summary when a number is selected/deselected
  };

  const updateSummary = () => {
    const newSummary = [];

    selectedLotteries.forEach((lottery, index) => {
      const quantity = quantities[index];
      const selectedNums = selectedNumbers[index];

      selectedNums.forEach((num) => {
        newSummary.push({
          name: lottery.name,
          ticketNumber: num,
          quantity,
          price: lottery.price,
          total: quantity * lottery.price,
        });
      });
    });

    setSummary(newSummary);
  };

  const calculateTotalPrice = () => {
    return summary.reduce((total, item) => total + item.total, 0);
  };
  
  const handleAddToCart = () => {
    summary.forEach(item => {
      addToCart({
        id: `${item.id}-${item.ticketNumber}`,
        name: item.name,
        ticketNumber: item.ticketNumber,
        quantity: item.quantity,
        price: item ? item.price : 0,
      });
    });

    alert(`Added ${summary.length} items to cart!`);
  };

  const handleRemoveFromSummary = (ticketNumber) => {
    const newSummary = summary.filter(item => item.ticketNumber !== ticketNumber);
    setSummary(newSummary);
  };

  const handleLoadMoreTickets = () => {
    setTicketsToShow((prev) => prev + 20); // Increase tickets to show by 20
  };

  return (
    <div className="bg-gradient-to-b from-blue-200 to-purple-300 min-h-screen py-10">
      <section className="mb-8">
        <img src={bannerImage} alt="Lottery Banner" className="w-full h-auto object-cover rounded-lg" />
      </section>
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-yellow-400 text-center mb-8" style={{ fontFamily: 'Luckiest Guy, cursive' }}>Selected Lotteries</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Lottery Selection */}
          <div className="bg-opacity-75">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
              {selectedLotteries.map((lottery, index) => (
                <div key={lottery._id} className="bg-transparent p-6 rounded-lg shadow-xl border-2 border-gray-300">
                  <h3 className="text-2xl font-bold mb-2 text-blue-800">{lottery.name}</h3>
                  <p className="text-gray-600 mb-4">Price: <span className="text-green-600 font-bold">${lottery.price}</span></p>
                  <p className="text-md text-gray-500 mb-4">Draw Date: <span className="font-semibold">{lottery.drawDate}</span></p>
                  <p className="text-md text-gray-500 mb-4">
                    Quantity:
                    <input
                      type="number"
                      min="1"
                      value={quantities[index]}
                      onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
                      className="ml-2 w-16 p-2 border border-gray-300 rounded"
                    />
                  </p>

                  {/* Display ticket number selection */}
                  <div className="mb-4">
                    <p className="text-md text-gray-500 font-semibold mb-2">Select Ticket Numbers:</p>
                    <div className="grid grid-cols-5 gap-2">
                      {tickets[lottery._id]?.slice(0, ticketsToShow).map((ticket) => (
                        
                        <button
                          key={ticket._id}
                          className={`p-2 rounded border ${selectedNumbers[index].includes(ticket.number) ? "bg-green-500 text-white" : "bg-white text-gray-700"}`}
                          onClick={() => handleNumberSelect(index, ticket.number)}
                        >
                          {ticket.number}
                        </button>
                      ))}
                    </div>
                    {tickets[lottery._id]?.length > ticketsToShow && ( // Show "Load More" button if there are more tickets to load
                      <button
                        onClick={handleLoadMoreTickets}
                        className="mt-4 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                      >
                        Load More
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Summary of Selected Products */}
          <div className="p-6 rounded-lg shadow-xl border-2 border-gray-300">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Ticket Purchase Summary</h2>

            {/* Summary Display */}
            {summary.length > 0 ? (
              <div className="mt-5">
                <h3 className="text-lg font-bold text-blue-800">Summary</h3>
                <table className="min-w-full mt-2 bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="py-2 px-4 border">Lottery Name</th>
                      <th className="py-2 px-4 border">Ticket Number</th>
                      <th className="py-2 px-4 border">Quantity</th>
                      <th className="py-2 px-4 border">Total</th>
                      <th className="py-2 px-4 border">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border">{item.name}</td>
                        <td className="py-2 px-4 border">{item.ticketNumber}</td>
                        <td className="py-2 px-4 border">{item.quantity}</td>
                        <td className="py-2 px-4 border">${item.total}</td>
                        <td className="py-2 px-4 border">
                          <button onClick={() => handleRemoveFromSummary(item.ticketNumber)} className="text-red-500 hover:text-red-700">
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-right mt-4">
                  <strong className="text-lg">Total Price: ${calculateTotalPrice()}</strong>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="mt-4 w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
                >
                  Add to Cart <FaCartPlus className="inline ml-2" />
                </button>
              </div>
            ) : (
              <p className="text-gray-500">No tickets selected.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LotterySelectionPage;

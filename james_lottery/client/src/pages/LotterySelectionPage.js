import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import bannerImage from '../assets/cartImg.jpeg'

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

  const generateTickets = (frequency, maxTickets = 20) => {
    let tickets = [];
    for (let j = 0; j < maxTickets; j++) {
      let prefix, number;
      if (frequency === "Daily") {
        prefix = "D";
        number = 4500 + j;
      } else if (frequency === "Weekly") {
        prefix = "W";
        number = 48000 + j;
      } else if (frequency === "Monthly") {
        prefix = "M";
        number = 21500 + j;
      }
      const ticket = `${prefix}-${number}`;
      tickets.push(ticket);
    }
    return tickets;
  };

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
      // const lottery = selectedLotteries.find(l => l.name === item.name);
      addToCart({
        name: item.name,
        ticketNumber: item.ticketNumber,
        quantity: item.quantity,
        price:  item ? item.price : 0,
      });
    });

    alert(`Added ${summary.length} items to cart!`);
  };

  const handleRemoveFromSummary = (ticketNumber) => {
    const newSummary = summary.filter(item => item.ticketNumber !== ticketNumber);
    setSummary(newSummary);
  };

  // New function to handle bulk purchase
  const handleBulkPurchase = (lottery, frequency) => {
    const tickets = generateTickets(frequency, bulkQuantity); // Generate tickets based on frequency
    const totalPrice = bulkQuantity * lottery.price; // Calculate total price for the bulk tickets

    // Update summary with bulk purchase
    tickets.forEach((ticket) => {
      setSummary((prevSummary) => [
        ...prevSummary,
        {
          name: lottery.name,
          ticketNumber: ticket,
          price:lottery.price,
          quantity: bulkQuantity,
          total: totalPrice,
        },
      ]);
    });

    alert(`Added ${bulkQuantity} tickets to cart!`); // Notify user
  };

  return (
    <div className="bg-gradient-to-b from-blue-200 to-purple-300 min-h-screen py-10">
        {/* Banner Section */}
      <section className="mb-8">
        <img src={bannerImage} alt="Lottery Banner" className="w-full h-auto object-cover rounded-lg" />
      </section>
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-yellow-400 text-center mb-8 shadow-lg" style={{ fontFamily: 'Luckiest Guy, cursive' }}>Selected Lotteries</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Lottery Selection */}
          <div className="bg-opacity-75">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
              {selectionMode === "quantity" && showBulkSelection ? (
                <div className="bg-white p-6 rounded-lg shadow-xl border-2 border-gray-300">
                  <h3 className="text-2xl font-bold mb-2 text-blue-800">Bulk Ticket Purchase</h3>
                  <p className="text-md text-gray-500 font-semibold mb-2">Choose Quantity of Tickets:</p>
                  <div className="grid grid-cols-2 gap-4">
                    {[5, 10, 50, 100].map((qty) => (
                      <button
                        key={qty}
                        className={`p-3 rounded-lg border ${bulkQuantity === qty ? "bg-green-500 text-white" : "bg-white text-gray-700"}`}
                        onClick={() => setBulkQuantity(qty)}
                      >
                        {qty} Tickets
                      </button>
                    ))}
                  </div>
                  {selectedLotteries.map((lottery) => (
                    <button
                      key={lottery.id}
                      className="bg-gradient-to-r from-green-400 to-green-600 text-white p-3 rounded-lg mt-4 flex items-center justify-center hover:opacity-90 transition"
                      onClick={() => handleBulkPurchase(lottery, lottery.frequency)} // Call the new bulk purchase handler
                    >
                      <FaCartPlus className="mr-2" /> Buy {bulkQuantity} Tickets
                    </button>
                  ))}
                </div>
              ) : (
                selectedLotteries.map((lottery, index) => {
                  const tickets = generateTickets(lottery.frequency);

                  return (
                    <div key={lottery.id} className="bg-white p-6 rounded-lg shadow-xl border-2 border-gray-300">
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
                          {tickets.slice(0, 20).map((number) => (
                            <button
                              key={number}
                              className={`p-2 rounded border ${
                                selectedNumbers[index].includes(number) ? "bg-green-500 text-white" : "bg-white text-gray-700"
                              }`}
                              onClick={() => handleNumberSelect(index, number)}
                            >
                              {number}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right side - Summary of Selected Products */}
          <div className="p-6 rounded-lg shadow-xl border-2 border-gray-300">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Ticket Purchase Summary</h2>
            
            <div className="flex space-x-4 mb-4">
              <button
                className={`px-4 py-2 rounded-lg ${selectionMode === "quantity" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}
                onClick={() => {
                  setSelectionMode("quantity");
                  setShowBulkSelection(true);
                }}
              >
                Select by Quantity
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${selectionMode === "number" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}
                onClick={() => {
                  setSelectionMode("number");
                  setShowBulkSelection(false);
                }}
              >
                Select by Number
              </button>
            </div>

            {selectionMode === "number" && !showBulkSelection ? (
              <p className="text-md text-gray-500 mt-4">Please select tickets by clicking numbers on the left.</p>
            ) : null}

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
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleRemoveFromSummary(item.ticketNumber)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="3" className="py-2 px-4 border text-right font-bold">Grand Total:</td>
                      <td className="py-2 px-4 border text-green-600 font-bold">${calculateTotalPrice()}</td>
                      <td className="py-2 px-4 border"></td>
                    </tr>
                  </tbody>
                </table>
                <button
                  
                  className="bg-gradient-to-r from-green-400 to-green-600 text-white p-3 rounded-lg mt-4 flex items-center justify-center hover:opacity-90 transition"
                  

                  onClick={handleAddToCart}
                >
                  <FaCartPlus className="mr-2" /> Add All to Cart
                </button>
              </div>
            ) : (
              <p className="text-md text-gray-500 mt-4">No tickets selected.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LotterySelectionPage;

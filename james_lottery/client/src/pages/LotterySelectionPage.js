import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";

const LotterySelectionPage = ({ selectedLotteries, addToCart }) => {
  // Initialize state for selected numbers and quantities
  const [quantities, setQuantities] = useState(
    selectedLotteries.map(() => 1)
  );
  const [selectedNumbers, setSelectedNumbers] = useState(
    selectedLotteries.map(() => [])
  );

  // Generate available ticket numbers (assuming from 1 to 100 for simplicity)
  const generateTicketNumbers = (totalNumbers = 100) => {
    return Array.from({ length: totalNumbers }, (_, i) => i + 1);
  };

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  const handleNumberSelect = (lotteryIndex, number) => {
    const newSelectedNumbers = [...selectedNumbers];
    if (newSelectedNumbers[lotteryIndex].includes(number)) {
      // Deselect number
      newSelectedNumbers[lotteryIndex] = newSelectedNumbers[lotteryIndex].filter(
        (n) => n !== number
      );
    } else {
      // Select number
      newSelectedNumbers[lotteryIndex].push(number);
    }
    setSelectedNumbers(newSelectedNumbers);
  };

  const handleAddToCart = (lottery, index) => {
    if (selectedNumbers[index].length === 0) {
      alert("Please select at least one number.");
      return;
    }
    addToCart({
      ...lottery,
      quantity: quantities[index],
      selectedNumbers: selectedNumbers[index],
    });
    alert(
      `${lottery.name} with ${quantities[index]} tickets and numbers [${selectedNumbers[index].join(
        ", "
      )}] added to cart!`
    );
  };

  return (
    <div className="bg-gradient-to-b from-blue-500 to-purple-500 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Selected Lotteries
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedLotteries.map((lottery, index) => (
            <div
              key={lottery.id}
              className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-6 rounded-lg shadow-xl border-2 border-yellow-300"
            >
              <h3 className="text-2xl font-bold mb-2 text-blue-800">
                {lottery.name}
              </h3>
              <p className="text-gray-600 mb-4">
                Price: <span className="text-green-600 font-bold">${lottery.price}</span>
              </p>
              <p className="text-md text-gray-500 mb-4">
                Draw Date: <span className="font-semibold">{lottery.drawDate}</span>
              </p>
              <p className="text-md text-gray-500 mb-4">
                Quantity:
                <input
                  type="number"
                  min="1"
                  value={quantities[index]}
                  onChange={(e) =>
                    handleQuantityChange(index, parseInt(e.target.value, 10))
                  }
                  className="ml-2 w-16 p-2 border border-gray-300 rounded"
                />
              </p>

              {/* Display ticket number selection */}
              <div className="mb-4">
                <p className="text-md text-gray-500 font-semibold mb-2">Select Ticket Numbers:</p>
                <div className="grid grid-cols-10 gap-2">
                  {generateTicketNumbers().map((number) => (
                    <button
                      key={number}
                      className={`p-2 rounded border ${
                        selectedNumbers[index].includes(number)
                          ? "bg-green-500 text-white"
                          : "bg-white text-gray-700"
                      }`}
                      onClick={() => handleNumberSelect(index, number)}
                    >
                      {number}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="bg-gradient-to-r from-green-400 to-green-600 text-white p-3 rounded-lg mt-4 flex items-center justify-center hover:opacity-90 transition"
                onClick={() => handleAddToCart(lottery, index)}
              >
                <FaCartPlus className="mr-2" /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LotterySelectionPage;

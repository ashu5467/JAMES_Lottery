const ResultsPage = () => {
  // Sample lottery results data
  const lotteryResults = [
    {
      name: "Mega Lottery",
      winningNumbers: "12, 34, 56, 78, 90",
      date: "October 15, 2024",
      prize: "$1,000,000",
      description: "Congratulations to the winners! Claim your prize at your nearest lottery office.",
      image: "https://via.placeholder.com/400x200/FF6347/FFFFFF?text=Mega+Lottery" // Placeholder for Mega Lottery image
    },
    {
      name: "Super Jackpot",
      winningNumbers: "3, 9, 18, 27, 45",
      date: "October 10, 2024",
      prize: "$500,000",
      description: "Winners will be notified via email. Good luck next time!",
      image: "https://via.placeholder.com/400x200/4682B4/FFFFFF?text=Super+Jackpot" // Placeholder for Super Jackpot image
    },
    {
      name: "Daily Lottery",
      winningNumbers: "5, 10, 15, 20, 25",
      date: "October 16, 2024",
      prize: "$10,000",
      description: "Check your numbers! You might be a lucky winner.",
      image: "https://via.placeholder.com/400x200/32CD32/FFFFFF?text=Daily+Lottery" // Placeholder for Daily Lottery image
    },
  ];

  return (
    <div className="bg-gradient-to-r from-purple-100 to-blue-200 min-h-screen py-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-gradient bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
          Lottery Results
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Result Cards */}
          {lotteryResults.map((lottery, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-blue-50"
            >
              <img
                src={lottery.image}
                alt={`${lottery.name}`}
                className="w-full h-32 object-cover rounded-md mb-4 border-b-4 border-blue-600 transition-all duration-300 ease-in-out"
              />
              <h3 className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-200">{lottery.name}</h3>
              <p className="text-gray-700">
                Winning Numbers: <span className="font-semibold">{lottery.winningNumbers}</span>
              </p>
              <p className="text-gray-500">
                Date: <span className="font-semibold">{lottery.date}</span>
              </p>
              <p className="text-lg font-bold text-green-600">
                Prize: <span>{lottery.prize}</span>
              </p>
              <p className="text-gray-600 mt-2">{lottery.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;

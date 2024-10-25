import React, { useState } from 'react';

const ResultsPage = () => {
  const [results, setResults] = useState([
    {
      id: 1,
      lotteryName: 'Christmas Special',
      resultDate: '2024-12-25',
      winners: [
        { name: 'John Doe', ticketNumber: '1234', prize: '$5000' },
        { name: 'Jane Smith', ticketNumber: '5678', prize: '$2000' },
      ],
    },
    {
      id: 2,
      lotteryName: 'Halloween Spooktacular',
      resultDate: '2024-10-31',
      winners: [
        { name: 'Sam Green', ticketNumber: '4321', prize: '$7000' },
      ],
    },
    // Add more results here
  ]);

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Results Management</h1>

      {/* Declare New Result Button */}
      <div className="mb-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400">
          Declare New Result
        </button>
      </div>

      {/* Results Table */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">All Results</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Lottery Name</th>
              <th className="px-4 py-2">Result Date</th>
              <th className="px-4 py-2">Winners</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id} className="border-t">
                <td className="px-4 py-2">{result.lotteryName}</td>
                <td className="px-4 py-2">{result.resultDate}</td>
                <td className="px-4 py-2">
                  {result.winners.map((winner, index) => (
                    <div key={index} className="mb-2">
                      <p>{winner.name}</p>
                      <p className="text-sm text-gray-500">Ticket: {winner.ticketNumber}</p>
                      <p className="text-sm text-gray-500">Prize: {winner.prize}</p>
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2">
                  <button className="text-blue-500 hover:underline mr-2">Edit</button>
                  <button className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Placeholder for Future Enhancements */}
      <div className="bg-white p-4 rounded-lg shadow mt-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity (Coming Soon)</h2>
        <p>Details about recent result-related activities will appear here.</p>
      </div>
    </div>
  );
};

export default ResultsPage;

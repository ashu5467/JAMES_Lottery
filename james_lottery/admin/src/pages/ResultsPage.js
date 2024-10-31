import React, { useState, useEffect } from 'react';

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [newResult, setNewResult] = useState({
    lotteryName: '',
    resultDate: '',
    winners: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/results');
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        } else {
          console.error('Failed to fetch results');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchResults();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewResult((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWinnersChange = (e, index) => {
    const { name, value } = e.target;
    const updatedWinners = [...newResult.winners];
    updatedWinners[index] = { ...updatedWinners[index], [name]: value };
    setNewResult((prev) => ({ ...prev, winners: updatedWinners }));
  };

  const addWinner = () => {
    setNewResult((prev) => ({
      ...prev,
      winners: [...prev.winners, { name: '', ticketNumber: '', prize: '' }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isEditing
        ? await fetch(`http://localhost:5000/api/results/${currentResult._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newResult),
          })
        : await fetch('http://localhost:5000/api/results', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newResult),
          });

      if (response.ok) {
        const resultData = await response.json();
        if (isEditing) {
          setResults((prev) =>
            prev.map((result) => (result._id === currentResult._id ? resultData : result))
          );
          setIsEditing(false);
        } else {
          setResults((prev) => [...prev, resultData]);
        }
        setNewResult({ lotteryName: '', resultDate: '', winners: [] });
      } else {
        console.error('Failed to add or update result');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (result) => {
    setCurrentResult(result);
    setNewResult(result);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/results/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setResults((prev) => prev.filter((result) => result._id !== id));
      } else {
        console.error('Failed to delete result');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Results Management</h1>

      {/* Declare New Result Button */}
      <div className="mb-6">
        <button onClick={() => { setIsEditing(false); setNewResult({ lotteryName: '', resultDate: '', winners: [] }); }} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400">
          Declare New Result
        </button>
      </div>

      {/* New Result Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Result' : 'New Result'}</h2>

        <label className="block mb-1" htmlFor="lotteryName">Lottery Name:</label>
        <input
          type="text"
          name="lotteryName"
          value={newResult.lotteryName}
          onChange={handleChange}
          placeholder="Enter lottery name"
          required
          className="border rounded p-2 mb-2 w-full"
        />

        <label className="block mb-1" htmlFor="resultDate">Result Date:</label>
        <input
          type="date"
          name="resultDate"
          value={newResult.resultDate}
          onChange={handleChange}
          required
          className="border rounded p-2 mb-2 w-full"
        />

        <h3 className="mt-4 mb-2">Winners:</h3>
        {newResult.winners.map((winner, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              name="name"
              value={winner.name}
              onChange={(e) => handleWinnersChange(e, index)}
              placeholder="Winner's Name"
              required
              className="border rounded p-2 mb-1 mr-2"
            />
            <input
              type="text"
              name="ticketNumber"
              value={winner.ticketNumber}
              onChange={(e) => handleWinnersChange(e, index)}
              placeholder="Ticket Number"
              required
              className="border rounded p-2 mb-1 mr-2"
            />
            <input
              type="text"
              name="prize"
              value={winner.prize}
              onChange={(e) => handleWinnersChange(e, index)}
              placeholder="Prize"
              required
              className="border rounded p-2 mb-1"
            />
          </div>
        ))}
        <button type="button" onClick={addWinner} className="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-400">
          Add Winner
        </button>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 mt-4">
          {isEditing ? 'Update Result' : 'Add Result'}
        </button>
      </form>

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
              <tr key={result._id} className="border-t">
                <td className="px-4 py-2">{result.lotteryName}</td>
                <td className="px-4 py-2">{result.resultDate}</td>
                <td className="px-4 py-2">
                  {result.winners && Array.isArray(result.winners) && result.winners.length > 0 ? (
                    result.winners.map((winner, index) => (
                      <div key={index} className="mb-2">
                        <p>{winner.name}</p>
                        <p className="text-sm text-gray-500">Ticket: {winner.ticketNumber}</p>
                        <p className="text-sm text-gray-500">Prize: {winner.prize}</p>
                      </div>
                    ))
                  ) : (
                    <p>No winners</p>
                  )}
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => handleEdit(result)} className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-400 mr-2">Edit</button>
                  <button onClick={() => handleDelete(result._id)} className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-400">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsPage;

import React, { useState, useEffect } from 'react';

const LotteriesPage = () => {
  const [lotteries, setLotteries] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentLottery, setCurrentLottery] = useState(null);
  const [newLottery, setNewLottery] = useState({
    name: '',
    startDate: '',
    endDate: '',
    status: 'Upcoming',
    participants: 0,
    sales: '$0',
    price: 0,
    prize: 0,
  });

  // Fetch lotteries from the database on component mount
  useEffect(() => {
    const fetchLotteries = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/lotteries');
        if (response.ok) {
          const data = await response.json();
          setLotteries(data); // Set the fetched lotteries to state
        } else {
          console.error('Failed to fetch lotteries');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchLotteries();
  }, []); // Empty dependency array to run once on mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLottery((prev) => ({
      ...prev,
      [name]: name === 'participants' || name === 'price' || name === 'prize' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isEditing
        ? await fetch(`http://localhost:5000/api/lotteries/${currentLottery._id}`, { // Change to _id
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newLottery),
          })
        : await fetch('http://localhost:5000/api/lotteries', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newLottery),
          });
  
      if (response.ok) {
        const lotteryData = await response.json();
        if (isEditing) {
          setLotteries((prev) => prev.map((lottery) => (lottery._id === currentLottery._id ? lotteryData : lottery))); // Change id to _id
          setIsEditing(false);
        } else {
          setLotteries((prev) => [...prev, lotteryData]);
        }
        setNewLottery({ name: '', startDate: '', endDate: '', status: 'Upcoming', participants: 0, sales: '$0', price: 0, prize: 0 });
        setIsCreating(false);
      } else {
        console.error('Failed to add or update lottery');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleEdit = (lottery) => {
    setCurrentLottery({ id: lottery._id, ...lottery }); // Ensure you include the ID here
    setNewLottery(lottery);
    setIsCreating(true);
    setIsEditing(true);
  };
  

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/lotteries/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setLotteries((prev) => prev.filter((lottery) => lottery._id !== id)); // Use _id here as well
      } else {
        console.error('Failed to delete lottery');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Lotteries Management</h1>

      <div className="mb-6">
        <button onClick={() => { setIsCreating(!isCreating); setIsEditing(false); }} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400">
          {isCreating ? 'Cancel' : 'Create New Lottery'}
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Lottery' : 'New Lottery'}</h2>
          
          <label className="block mb-1" htmlFor="name">Lottery Name:</label>
          <input
            type="text"
            name="name"
            value={newLottery.name}
            onChange={handleChange}
            placeholder="Enter lottery name"
            required
            className="border rounded p-2 mb-2 w-full"
          />
          
          <label className="block mb-1" htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={newLottery.startDate}
            onChange={handleChange}
            required
            className="border rounded p-2 mb-2 w-full"
          />
          
          <label className="block mb-1" htmlFor="endDate">End Date:</label>
          <input
            type="date"
            name="endDate"
            value={newLottery.endDate}
            onChange={handleChange}
            required
            className="border rounded p-2 mb-2 w-full"
          />
          
          <label className="block mb-1" htmlFor="participants">Participants:</label>
          <input
            type="number"
            name="participants"
            value={newLottery.participants}
            onChange={handleChange}
            placeholder="Enter number of participants"
            required
            className="border rounded p-2 mb-2 w-full"
          />
          
          <label className="block mb-1" htmlFor="price">Lottery Price:</label>
          <input
            type="number"
            name="price"
            value={newLottery.price}
            onChange={handleChange}
            placeholder="Enter lottery price (e.g., 10)"
            required
            className="border rounded p-2 mb-2 w-full"
          />
          
          <label className="block mb-1" htmlFor="prize">Lottery Prize:</label>
          <input
            type="number"
            name="prize"
            value={newLottery.prize}
            onChange={handleChange}
            placeholder="Enter lottery prize (e.g., 1000)"
            required
            className="border rounded p-2 mb-2 w-full"
          />
          
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400">
            {isEditing ? 'Update Lottery' : 'Add Lottery'}
          </button>
        </form>
      )}

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">All Lotteries</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">End Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Participants</th>
              <th className="px-4 py-2">Total Sales</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Prize</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lotteries.map((lottery) => (
              <tr key={lottery._id} className="border-t">
                <td className="px-4 py-2">{lottery.name}</td>
                <td className="px-4 py-2">{lottery.startDate}</td>
                <td className="px-4 py-2">{lottery.endDate}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      lottery.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : lottery.status === 'Upcoming'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {lottery.status}
                  </span>
                </td>
                <td className="px-4 py-2">{lottery.participants}</td>
                <td className="px-4 py-2">{lottery.sales}</td>
                <td className="px-4 py-2">{lottery.price}</td>
                <td className="px-4 py-2">{lottery.prize}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(lottery)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-400 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(lottery._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LotteriesPage;

import React, { useState, useEffect } from 'react';

const LotteriesPage = () => {
  const [lotteries, setLotteries] = useState([]);
  const [filteredLotteries, setFilteredLotteries] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentLottery, setCurrentLottery] = useState(null);
  
  const [newLottery, setNewLottery] = useState({
    id: null,
    name: '',
    price: '',
    description: '',
    drawDate: '',
    drawTime: '',
    frequency: 'Weekly', 
    status: 'Upcoming',
    startNumber: '',
    endNumber: '',
    type: '', // New field for type
    prefix: '', // New field for prefix
  });
  
  const [filter, setFilter] = useState('All'); // New filter state

  // Fetch lotteries from the database on component mount
  useEffect(() => {
    const fetchLotteries = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/lotteries');
        if (response.ok) {
          const data = await response.json();
          setLotteries(data); // Set the fetched lotteries to state
          setFilteredLotteries(data); // Initialize filtered lotteries
        } else {
          console.error('Failed to fetch lotteries');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchLotteries();
  }, []); // Empty dependency array to run once on mount

  useEffect(() => {
    filterLotteries();
  }, [filter, lotteries]); // Re-filter when the filter or lotteries change

  const filterLotteries = () => {
    const today = new Date();
    let filtered = lotteries;

    // Check frequency and filter based on it
    if (filter === 'Today') {
      filtered = lotteries.filter(lottery => {
        const startDate = new Date(lottery.startDate);
        return startDate.toDateString() === today.toDateString();
      });
    } else if (filter === 'This Week') {
      const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
      const endOfWeek = new Date(today.setDate(startOfWeek.getDate() + 6));
      filtered = lotteries.filter(lottery => {
        const startDate = new Date(lottery.startDate);
        return startDate >= startOfWeek && startDate <= endOfWeek && lottery.frequency === 'weekly';
      });
    } else if (filter === 'This Month') {
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      filtered = lotteries.filter(lottery => {
        const startDate = new Date(lottery.startDate);
        return startDate >= startOfMonth && lottery.frequency === 'monthly';
      });
    } else if (filter === 'All') {
      filtered = lotteries; // If 'All', show all lotteries
    }

    setFilteredLotteries(filtered);
  };

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
        ? await fetch(`http://localhost:5000/api/lotteries/${currentLottery._id}`, {
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
          setLotteries((prev) => prev.map((lottery) => (lottery._id === currentLottery._id ? lotteryData : lottery)));
          setIsEditing(false);
        } else {
          setLotteries((prev) => [...prev, lotteryData]);
        }
        // Reset form fields including type and prefix
        setNewLottery({ 
          id: null,
          name: '',
          price: '',
          description: '',
          drawDate: '',
          drawTime: '',
          frequency: 'Weekly', 
          status: 'Upcoming',
          startNumber: '',
          endNumber: '',
          type: '', // Reset type
          prefix: '', // Reset prefix
        });
        setIsCreating(false);
      } else {
        console.error('Failed to add or update lottery');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleEdit = (lottery) => {
    setCurrentLottery({ id: lottery._id, ...lottery });
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
        setLotteries((prev) => prev.filter((lottery) => lottery._id !== id));
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

      {/* Filter Options */}
      <div className="mb-6">
        <label htmlFor="filter" className="mr-2">Filter by:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-2"
        >
          <option value="All">All</option>
          <option value="Today">Today</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
        </select>
      </div>

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

          <label className="block mb-1" htmlFor="frequency">Frequency:</label>
          <select
            name="frequency"
            value={newLottery.frequency}
            onChange={handleChange}
            className="border rounded p-2 mb-2 w-full"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          
          <label className="block mb-1" htmlFor="participants">Participants:</label>
          <input
            type="number"
            name="participants"
            value={newLottery.participants}
            onChange={handleChange}
            required
            className="border rounded p-2 mb-2 w-full"
          />

          <label className="block mb-1" htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            value={newLottery.price}
            onChange={handleChange}
            required
            className="border rounded p-2 mb-2 w-full"
          />
          
          <label className="block mb-1" htmlFor="description">Description:</label>
          <textarea
            name="description"
            value={newLottery.description}
            onChange={handleChange}
            required
            className="border rounded p-2 mb-2 w-full"
          />
          
          <label className="block mb-1" htmlFor="drawDate">Draw Date:</label>
          <input
            type="date"
            name="drawDate"
            value={newLottery.drawDate}
            onChange={handleChange}
            required
            className="border rounded p-2 mb-2 w-full"
          />
          
          <label className="block mb-1" htmlFor="drawTime">Draw Time:</label>
          <input
            type="time"
            name="drawTime"
            value={newLottery.drawTime}
            onChange={handleChange}
            required
            className="border rounded p-2 mb-2 w-full"
          />

          <label className="block mb-1" htmlFor="type">Type:</label>
          <input
            type="text"
            name="type"
            value={newLottery.type}
            onChange={handleChange}
            placeholder="Enter lottery type"
            required
            className="border rounded p-2 mb-2 w-full"
          />
          
          <label className="block mb-1" htmlFor="prefix">Prefix:</label>
          <input
            type="text"
            name="prefix"
            value={newLottery.prefix}
            onChange={handleChange}
            placeholder="Enter lottery prefix"
            required
            className="border rounded p-2 mb-2 w-full"
          />

          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400">
            {isEditing ? 'Update Lottery' : 'Create Lottery'}
          </button>
        </form>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">Lottery List</h2>
        <ul>
          {filteredLotteries.map((lottery) => (
            <li key={lottery._id} className="flex justify-between items-center bg-white p-2 rounded-lg mb-2 shadow">
              <span>{lottery.name}</span>
              <div>
                <button onClick={() => handleEdit(lottery)} className="bg-yellow-500 text-white px-2 py-1 rounded-lg mr-2 hover:bg-yellow-400">
                  Edit
                </button>
                <button onClick={() => handleDelete(lottery._id)} className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-400">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LotteriesPage;

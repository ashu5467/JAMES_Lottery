import React, { useState, useEffect } from 'react';

const WinnersPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    prize: '',
    lotteryName: '',
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [winners, setWinners] = useState([]);

  // Fetch all winners on component mount
  useEffect(() => {
    fetchWinners();
  }, []);

  const fetchWinners = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/winners');
      if (response.ok) {
        const data = await response.json();
        setWinners(data);
      } else {
        setMessage('Failed to load winners');
      }
    } catch (error) {
      console.error('Error fetching winners:', error);
      setMessage('Error occurred while loading winners');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('prize', formData.prize);
    data.append('lotteryName', formData.lotteryName);
    if (image) data.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/api/winners/add', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        setMessage('Winner added successfully!');
        console.log('Added winner:', result);
        setFormData({ name: '', prize: '', lotteryName: '' });
        setImage(null);
        fetchWinners(); // Refresh winners list after adding
      } else {
        setMessage('Failed to add winner');
      }
    } catch (error) {
      setMessage('Error occurred while adding winner');
      console.error('Add winner error:', error);
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Winner</h2>
      {message && <p className="text-center text-green-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Winner Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="prize"
          value={formData.prize}
          onChange={handleChange}
          placeholder="Prize"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="lotteryName"
          value={formData.lotteryName}
          onChange={handleChange}
          placeholder="Lottery Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full p-2"
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Add Winner
        </button>
      </form>

      {/* Display the list of winners */}
      <h3 className="text-xl font-bold mt-8">All Winners</h3>
      <div className="mt-4 space-y-4">
        {winners.length > 0 ? (
          winners.map((winner) => (
            <div key={winner._id} className="p-4 border rounded shadow">
              <h4 className="text-lg font-semibold">{winner.name}</h4>
              <p>Prize: {winner.prize}</p>
              <p>Lottery: {winner.lotteryName}</p>
              {winner.image && (
                <img
                  src={`http://localhost:5000/${winner.image}`}
                  alt={`${winner.name}'s prize`}
                  className="w-full h-48 object-cover mt-2 rounded"
                />
              )}
            </div>
          ))
        ) : (
          <p className="text-center">No winners added yet.</p>
        )}
      </div>
    </div>
  );
};

export default WinnersPage;

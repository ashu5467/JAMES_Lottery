import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const WinnersPage = () => {
  const [winners, setWinners] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchWinners = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/winners'); 
      if (!response.ok) {
        setError('Failed to fetch winners.');
        setLoading(false);
        return;
      }
      const data = await response.json();
      setWinners(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching winners:', error);
      setError('An error occurred while fetching winners.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWinners();
  }, []);

  return (
    <div className="min-h-screen py-10" style={{ backgroundColor: 'transparent' }}>
      <div className="container mx-auto px-4">
      <h1
  className="text-5xl font-extrabold text-gray-800 mb-10 text-center drop-shadow-lg transition-all duration-500 transform hover:scale-105"
  style={{
    animation: 'fadeIn 1s ease-out, bounceIn 1.5s ease-in-out'
  }}
>
  Winners
</h1>

        {loading ? (
          <div className="text-center text-lg text-gray-600">Loading...</div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {winners.map((winner) => (
              <div
                key={winner._id}
                className="card bg-white bg-opacity-70 border border-yellow-300 p-6 shadow-lg rounded-lg flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                style={{ borderRadius: '0px 30px 30px 0px', height: '300px', width: '200px' }}
              >
                <h3 className="text-2xl font-bold text-center mb-2 text-blue-600 drop-shadow-md">
                  Won {winner.prize}
                </h3>
                <img
                  src={`http://localhost:5000/${winner.image}`}
                  alt={`${winner.name} photo`}
                  className="mb-4 w-32 h-32 rounded-full object-cover border-2 border-yellow-200"
                />
                <p className="text-lg text-center font-semibold text-gray-800 drop-shadow-md">
                  {winner.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WinnersPage;

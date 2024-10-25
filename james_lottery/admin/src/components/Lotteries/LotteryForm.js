import React, { useState } from 'react';

const LotteryForm = ({ onSubmit }) => {
  const [lotteryData, setLotteryData] = useState({
    name: '',
    price: '',
    ticketsAvailable: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLotteryData({ ...lotteryData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(lotteryData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Lottery Name:</label>
      <input type="text" name="name" value={lotteryData.name} onChange={handleChange} />
      
      <label>Price:</label>
      <input type="number" name="price" value={lotteryData.price} onChange={handleChange} />
      
      <label>Tickets Available:</label>
      <input type="number" name="ticketsAvailable" value={lotteryData.ticketsAvailable} onChange={handleChange} />
      
      <label>Start Date:</label>
      <input type="date" name="startDate" value={lotteryData.startDate} onChange={handleChange} />
      
      <label>End Date:</label>
      <input type="date" name="endDate" value={lotteryData.endDate} onChange={handleChange} />
      
      <button type="submit">Create Lottery</button>
    </form>
  );
};

export default LotteryForm;

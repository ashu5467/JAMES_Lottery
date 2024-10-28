const mongoose = require('mongoose');

const lotterySchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  status: { type: String, default: 'Upcoming' },
  participants: { type: Number, default: 0 },
  sales: { type: String, default: '$0' },
  price: { type: String, required: true },
  prize: { type: String, required: true },
  frequency: { type: String, required: true }, // New field for frequency
  description: { type: String, required: true }, // New field for description
});

module.exports = mongoose.model('Lottery', lotterySchema);

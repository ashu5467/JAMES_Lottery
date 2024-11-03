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
  frequency: { type: String, required: true },
  description: { type: String, required: true },
  startNumber: { type: Number, required: true }, // New field for the starting lottery card number
  endNumber: { type: Number, required: true }, 
  type: { type: String, required: true },
  prefix: { type: String, required: true },// New field for the ending lottery card number
  lastTicketNumber: { type: Number, default: 0 },
});

module.exports = mongoose.model('Lottery', lotterySchema);

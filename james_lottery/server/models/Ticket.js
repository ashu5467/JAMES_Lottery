// const mongoose = require('mongoose');

// const ticketSchema = new mongoose.Schema({
//   lotteryType: { type: String, required: true },
//   ticketNumber: { type: String, unique: true, required: true },
//   drawDate: { type: Date, required: true },
//   frequency: { type: String, required: true },
// });

// const Ticket = mongoose.model('Ticket', ticketSchema);

// module.exports = Ticket;



const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  lotteryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lottery', required: true },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;


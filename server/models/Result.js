const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  lotteryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lottery', required: true },
  winnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Winner', required: true },
  resultDate: { type: String, required: true },
  details: { type: String },
});

module.exports = mongoose.model('Result', resultSchema);

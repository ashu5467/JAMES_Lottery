// const mongoose = require('mongoose');

// const winnerSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   lotteryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lottery', required: true },
//   prize: { type: String, required: true },
//   dateWon: { type: String, required: true },
// });

// module.exports = mongoose.model('Winner', winnerSchema);

const mongoose = require('mongoose');

const winnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prize: { type: String, required: true },
  image: { type: String, required: true }, // Image URL or file path
  lotteryName: { type: String, required: true },
});

module.exports = mongoose.model('Winner', winnerSchema);

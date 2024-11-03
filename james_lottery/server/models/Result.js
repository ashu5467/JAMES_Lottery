// const mongoose = require('mongoose');

// // Define the winner schema
// const winnerSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   ticketNumber: { type: String, required: true },
//   prize: { type: String, required: true },
// });

// // Define the result schema
// const resultSchema = new mongoose.Schema({
//   lotteryName: { type: String, required: true }, // New field for lottery name
//   resultDate: { type: Date, required: true },   // Updated to use Date type
//   winners: [winnerSchema],                       // Array of winners using the winner schema
// });

// // Export the result model
// module.exports = mongoose.model('Result', resultSchema);

// models/Result.js
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true, // Ensure only one result per date
  },
  image: {
    type: String,
    required: true, // URL of the image
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});



module.exports = mongoose.model('Result', resultSchema);

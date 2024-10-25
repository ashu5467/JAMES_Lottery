const Winner = require('../models/Winner');

// Get all winners
exports.getAllWinners = async (req, res) => {
  try {
    const winners = await Winner.find();
    res.json(winners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new winner
exports.createWinner = async (req, res) => {
  const winner = new Winner(req.body);
  try {
    const savedWinner = await winner.save();
    res.status(201).json(savedWinner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Other CRUD operations can be added similarly

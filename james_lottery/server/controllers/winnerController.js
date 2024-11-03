const Winner = require('../models/Winner');

// Add a new winner
exports.addWinner = async (req, res) => {
  try {
    const { name, prize, lotteryName } = req.body;
    const image = req.file ? req.file.path : '';

    const newWinner = new Winner({ name, prize, image, lotteryName });
    await newWinner.save();
    res.status(201).json(newWinner);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add winner', error: error.message });
  }
};

// Get all winners
exports.getAllWinners = async (req, res) => {
  try {
    const winners = await Winner.find();
    res.status(200).json(winners);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch winners', error: error.message });
  }
};

// Get a single winner by ID
exports.getWinnerById = async (req, res) => {
  try {
    const { id } = req.params;
    const winner = await Winner.findById(id);
    if (!winner) {
      return res.status(404).json({ message: 'Winner not found' });
    }
    res.status(200).json(winner);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch winner', error: error.message });
  }
};

// Update a winner
exports.updateWinner = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, prize, lotteryName } = req.body;
    const image = req.file ? req.file.path : '';

    const updatedData = { name, prize, lotteryName };
    if (image) updatedData.image = image;

    const updatedWinner = await Winner.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedWinner) {
      return res.status(404).json({ message: 'Winner not found' });
    }
    res.status(200).json(updatedWinner);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update winner', error: error.message });
  }
};

// Delete a winner
exports.deleteWinner = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWinner = await Winner.findByIdAndDelete(id);
    if (!deletedWinner) {
      return res.status(404).json({ message: 'Winner not found' });
    }
    res.status(200).json({ message: 'Winner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete winner', error: error.message });
  }
};

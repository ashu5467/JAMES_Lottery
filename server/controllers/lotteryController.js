const Lottery = require('../models/Lottery');

// Get all lotteries
exports.getAllLotteries = async (req, res) => {
  try {
    const lotteries = await Lottery.find();
    res.json(lotteries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new lottery
exports.createLottery = async (req, res) => {
  const lottery = new Lottery(req.body);
  try {
    const savedLottery = await lottery.save();
    res.status(201).json(savedLottery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a lottery
exports.updateLottery = async (req, res) => {
  const { id } = req.params; // Extract lottery ID from request parameters
  try {
    const updatedLottery = await Lottery.findByIdAndUpdate(id, req.body, { new: true }); // Update the lottery
    if (!updatedLottery) {
      return res.status(404).json({ message: 'Lottery not found' }); // Handle not found case
    }
    res.json(updatedLottery); // Respond with the updated lottery
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle validation errors
  }
};

// Delete a lottery
exports.deleteLottery = async (req, res) => {
  const { id } = req.params; // Extract lottery ID from request parameters
  try {
    const deletedLottery = await Lottery.findByIdAndDelete(id); // Delete the lottery
    if (!deletedLottery) {
      return res.status(404).json({ message: 'Lottery not found' }); // Handle not found case
    }
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
};

const Result = require('../models/Result');

// Get all results
exports.getAllResults = async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new result
exports.createResult = async (req, res) => {
  const result = new Result(req.body);
  try {
    const savedResult = await result.save();
    res.status(201).json(savedResult);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Other CRUD operations can be added similarly

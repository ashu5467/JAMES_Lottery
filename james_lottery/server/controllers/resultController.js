// controllers/resultController.js
const Result = require('../models/Result');

// Create a new result
exports.createResult = async (req, res) => {
  try {
    const { date } = req.body;
    const image = req.file ? req.file.path : ''; // Get image path

    console.log('Creating a new result with date:', date, 'and image:', image);

    const newResult = new Result({ date, image });
    await newResult.save();

    console.log('New result created successfully:', newResult);
    res.status(201).json(newResult);
  } catch (error) {
    console.error('Create Result Error:', error);
    res.status(500).json({ message: 'Failed to save result.', error: error.message });
  }
};

// Get all results
exports.getAllResults = async (req, res) => {
  try {
    console.log('Fetching all results...');
    const results = await Result.find();
    console.log('Results retrieved successfully:', results);
    res.status(200).json(results);
  } catch (error) {
    console.error('Failed to retrieve results:', error);
    res.status(500).json({ message: 'Failed to retrieve results.' });
  }
};

// Update a result
exports.updateResult = async (req, res) => {
  try {
    const { date } = req.body;
    const updatedData = { date };

    if (req.file) {
      updatedData.image = req.file.path;
    }

    console.log('Updating result with ID:', req.params.id, 'with data:', updatedData);
    const updatedResult = await Result.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updatedResult) {
      console.warn('Result not found for ID:', req.params.id);
      return res.status(404).json({ message: 'Result not found.' });
    }
    
    console.log('Result updated successfully:', updatedResult);
    res.status(200).json(updatedResult);
  } catch (error) {
    console.error('Failed to update result:', error);
    res.status(500).json({ message: 'Failed to update result.' });
  }
};

// Delete a result
exports.deleteResult = async (req, res) => {
  try {
    console.log('Deleting result with ID:', req.params.id);
    const result = await Result.findByIdAndDelete(req.params.id);

    if (!result) {
      console.warn('Result not found for ID:', req.params.id);
      return res.status(404).json({ message: 'Result not found.' });
    }

    console.log('Result deleted successfully:', result);
    res.status(204).send();
  } catch (error) {
    console.error('Failed to delete result:', error);
    res.status(500).json({ message: 'Failed to delete result.' });
  }
};

// Get a result by date
exports.getResultByDate = async (req, res) => {
  const { date } = req.query; // Get date from query parameters
  console.log('Fetching result for date:', date);
  
  try {
    const result = await Result.findOne({ date }); // Query for the result with the specific date

    if (!result) {
      console.warn('No result found for date:', date);
      return res.status(404).json({ message: 'No result found for this date.' });
    }

    console.log('Result found for date:', date, '->', result);
    res.status(200).json(result); // Return the found result
  } catch (error) {
    console.error('Error fetching result by date:', error);
    res.status(500).json({ message: 'Failed to fetch result.' });
  }
};

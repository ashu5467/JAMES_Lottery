// routes/resultRoutes.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const resultController = require('../controllers/resultController');

const router = express.Router();

// Middleware for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Get all results
router.get('/', resultController.getAllResults);

// Create a new result
router.post('/', upload.single('image'), resultController.createResult);

// Update a result
router.put('/:id', upload.single('image'), resultController.updateResult);

// Delete a result
router.delete('/:id', resultController.deleteResult);

// Get a result by date
router.get('/date', resultController.getResultByDate); 

// Export the router
module.exports = router;

const express = require('express');
const multer = require('multer');
const winnerController = require('../controllers/winnerController');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Routes for CRUD operations
router.post('/add', upload.single('image'), winnerController.addWinner);
router.get('/', winnerController.getAllWinners);
router.get('/:id', winnerController.getWinnerById);
router.put('/:id', upload.single('image'), winnerController.updateWinner);
router.delete('/:id', winnerController.deleteWinner);

module.exports = router;

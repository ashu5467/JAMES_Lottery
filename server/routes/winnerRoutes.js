const express = require('express');
const router = express.Router();
const winnerController = require('../controllers/winnerController');

router.get('/', winnerController.getAllWinners);
router.post('/', winnerController.createWinner);

// Other routes can be added similarly

module.exports = router;

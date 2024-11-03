const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Route to generate tickets
router.post('/generate-tickets/:lotteryId', ticketController.generateTickets);
router.get('/tickets/:lotteryId', ticketController.getTickets);

module.exports = router;

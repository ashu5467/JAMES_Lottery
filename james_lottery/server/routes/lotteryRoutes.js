const express = require('express');
const router = express.Router();
const lotteryController = require('../controllers/lotteryController');

router.get('/', lotteryController.getAllLotteries);
router.post('/', lotteryController.createLottery);
router.put('/lotteries/:id', lotteryController.updateLottery);
router.delete('/lotteries/:id', lotteryController.deleteLottery);

router.post('/checkout', lotteryController.checkout);
router.post('/checkout', lotteryController.checkout);

// Other routes can be added similarly

module.exports = router;

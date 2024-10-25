const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

router.get('/', resultController.getAllResults);
router.post('/', resultController.createResult);

// Other routes can be added similarly

module.exports = router;

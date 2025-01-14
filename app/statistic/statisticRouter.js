const express = require('express');
const router = express.Router();
const statisticsController = require('./statisticController');

router.get('/', statisticsController.getStatistics);

module.exports = router;

const express = require('express');
const router = express.Router();
const statisticsController = require('./statisticController');
const utils = require("../../app/Utils/jwtUtils");

router.get('/',utils.authMiddleware({ session: true }), statisticsController.getStatistics);

module.exports = router;

const router = require('express').Router();
const reviewController = require('./reviewController');

router.post('/', reviewController.addReview);

module.exports = router;
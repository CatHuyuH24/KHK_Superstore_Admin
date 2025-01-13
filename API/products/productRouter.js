const router = require('express').Router();
const productController = require('./productController');

router.post('/', productController.addProduct);

module.exports = router;
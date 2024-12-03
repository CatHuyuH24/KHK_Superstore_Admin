const router = require("express").Router();
const cartController = require("./cartController");

router.post('/add', cartController.addToCart);

module.exports = router;
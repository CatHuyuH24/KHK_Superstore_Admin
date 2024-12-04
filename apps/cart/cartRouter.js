const router = require("express").Router();
const cartController = require("./cartController");
const utils = require("../Utils/jwtUtils")

router.post('/add', cartController.addToCart);
router.get('/',utils.authMiddleware({ session: true }) ,cartController.renderCartPage)
module.exports = router;
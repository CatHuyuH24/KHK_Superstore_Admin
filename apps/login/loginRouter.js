const router = require("express").Router();
const loginController = require("./loginController");

router.post("/", loginController.handleLoginRequest);
router.get("/",loginController.renderLoginPage);

module.exports = router;
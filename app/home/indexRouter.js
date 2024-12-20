const router = require("express").Router();
const indexController = require("../home/indexController");

router.get("/", indexController.renderHomePage);

module.exports = router;

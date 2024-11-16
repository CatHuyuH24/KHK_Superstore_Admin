const router = require("express").Router();
const searchController = require("./searchController");

router.get("/", searchController.handleAjaxSearch);

module.exports = router;

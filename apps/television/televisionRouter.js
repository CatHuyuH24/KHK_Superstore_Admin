const router = require("express").Router();
const televisionController = require("./televisionController");

router.get("/", televisionController.renderTelevisionCategoryPage);

router.get("/:id", televisionController.renderTelevisionDetailPage);

module.exports = router;

const router = require("express").Router();
const computerController = require("./computerController");

router.get("/", computerController.renderComputerCategoryPage);

router.get("/:id", computerController.renderComputerDetailPage);

module.exports = router;

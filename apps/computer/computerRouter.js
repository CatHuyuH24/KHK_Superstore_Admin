const router = require("express").Router();
const computerController = require("./computerController");

router.get("/", computerController.renderCompterCategoryPage);

router.get("/:id", computerController.renderComputerDetailPage);

// router.get("/related/:id", computerController.renderRelatedComputers);

module.exports = router;

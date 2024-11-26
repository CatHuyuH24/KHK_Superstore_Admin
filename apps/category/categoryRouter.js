const express = require("express");
const router = express.Router();
const categoryController = require("./categoryController"); // Ensure this path is correct

router.get("/category", categoryController.renderCategoryPage);
router.get("/category/:id", categoryController.renderProductPage);
module.exports = router;

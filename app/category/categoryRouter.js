const express = require("express");
const router = express.Router();
const categoryController = require("./categoryController"); // Ensure this path is correct

const televisionRouter = require("../television/televisionRouter");
const mobilephoneRouter = require("../mobilephone/mobilephoneRouter");
const computerRouter = require("../computer/computerRouter");

router.get("/", categoryController.renderCategoryPage);

router.use("/computers", computerRouter);
router.use("/mobilephones", mobilephoneRouter);
router.use("/televisions", televisionRouter);

module.exports = router;

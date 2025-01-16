const express = require("express");
const router = express.Router();
const utils = require("../../app/Utils/jwtUtils");
const categoryController = require("./categoryController"); // Ensure this path is correct

const televisionRouter = require("../television/televisionRouter");
const mobilephoneRouter = require("../mobilephone/mobilephoneRouter");
const computerRouter = require("../computer/computerRouter");

router.get("/",utils.authMiddleware({ session: true }), categoryController.renderCategoryPage);

router.use("/computers",utils.authMiddleware({ session: true }), computerRouter);
router.use("/mobilephones",utils.authMiddleware({ session: true }), mobilephoneRouter);
router.use("/televisions",utils.authMiddleware({ session: true }), televisionRouter);

module.exports = router;

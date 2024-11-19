const router = require("express").Router();
const mobilephoneController = require("./mobilephoneController");
const utils=require('../libraries/passwordUtils');

router.get("/", mobilephoneController.renderMobilephoneCategoryPage);

router.get("/:id", mobilephoneController.renderMobilephoneDetailPage);

module.exports = router;



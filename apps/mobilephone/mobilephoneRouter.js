const router = require("express").Router();
const mobilephoneController = require("./mobilephoneController");
const utils=require('../Utils/jwtUtils');

//router.get("/",utils.authMiddleware({session:false}),mobilephoneController.renderMobilephoneCategoryPage);
router.get("/", mobilephoneController.renderMobilephoneCategoryPage);

router.get("/:id", mobilephoneController.renderMobilephoneDetailPage);

module.exports = router;



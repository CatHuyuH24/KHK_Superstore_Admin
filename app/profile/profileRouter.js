// app/profile/profileRouter.js
const router = require("express").Router();
const profileController = require("./profileController");
const utils = require("../Utils/jwtUtils");

router.get("/", utils.authMiddleware({ session: true }), profileController.renderProfilePage);
router.post("/update", utils.authMiddleware({ session: true }), profileController.updateProfile);
router.get("/verify-email", profileController.verifyEmail);
router.post("/change-password", utils.authMiddleware({ session: true }), profileController.changePassword);

module.exports = router;
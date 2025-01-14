// // app/profile/profileRouter.js
// const router = require("express").Router();
// const profileController = require("./profileController");
// const utils = require("../Utils/jwtUtils");
// const multer = require('multer');

// const upload = multer({ dest: 'uploads/' });

// router.get("/", utils.authMiddleware({ session: true }), profileController.renderProfilePage);
// router.post("/update", utils.authMiddleware({ session: true }), profileController.updateProfile);
// router.get("/verify-email", profileController.verifyEmail);
// router.post("/change-password", utils.authMiddleware({ session: true }), profileController.changePassword);
// router.post('/upload-avatar', utils.authMiddleware({ session: true }), upload.single('avatar'), profileController.uploadAvatar);

// module.exports = router;

const express = require('express');
const profileController = require("./profileController");
const utils = require("../Utils/jwtUtils");
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', utils.authMiddleware({ session: true }), profileController.renderAdminProfilePage);
router.post('/update', utils.authMiddleware({ session: true }), profileController.updateProfile);
router.post('/change-password', utils.authMiddleware({ session: true }), profileController.changePassword);
router.post('/upload-avatar', utils.authMiddleware({ session: true }), upload.single('avatar'), profileController.uploadAvatar);

module.exports = router;
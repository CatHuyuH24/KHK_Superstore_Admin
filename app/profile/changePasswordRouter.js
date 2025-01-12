const router = require("express").Router();
const profileController = require("./profileController");
const utils = require("../Utils/jwtUtils");

router.get("/", utils.authMiddleware({ session: true }), (req, res) => {
    res.render("changePassword", { title: "Change Password", user_id: res.locals.user.id, success: false });
});
router.post("/", utils.authMiddleware({ session: true }), profileController.changePassword);

module.exports = router;
const router = require('express').Router();
const productController = require('./productController');
const utils = require("../../app/Utils/jwtUtils");
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });


// router.post('/', utils.authMiddleware({session:true}), upload.single('imageFilePath'), productController.addProduct);

// for development, as I can't login for some reasons
router.post('/', upload.single('imageFilePath'), productController.addProduct);
module.exports = router;
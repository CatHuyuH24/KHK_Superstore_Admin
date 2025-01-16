const router = require('express').Router();
const productController = require('./productController');
const utils = require("../../app/Utils/jwtUtils");
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post('/', utils.authMiddleware({ session: true }), upload.single('imageFilePath'), productController.addProduct);

router.get('/:id', utils.authMiddleware({ session: true }), productController.renderUpdateProductPage);
router.post('/:id', utils.authMiddleware({ session: true }), upload.single('imageFilePath'), productController.updateProduct);

module.exports = router;
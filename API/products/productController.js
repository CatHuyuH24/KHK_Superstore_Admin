const productService = require('./../../services/product/productService');
const {StatusCodes} = require('http-status-codes');

async function addProduct(req, res) {
    try {
        const { name, categoryId, manufacturerId, price, detail, discount, number, fps, status } = req.body;
        let imageURL = "";
        if(req.file){
            const imageFilePath = req.file.path;
            imageURL = await productService.uploadProductImage(imageFilePath);
        }else{
            imageURL = "https://placehold.co/600x400?text=No+image"
        }
        const productAdded = await productService.addProduct(name, categoryId, manufacturerId, price, imageURL, detail, discount, number, fps, status);
        
        if (productAdded) {
            return res.status(StatusCodes.CREATED).json({ "product_added": productAdded, "message": "Product added successfully!" });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
        }
    } catch (error) {
        console.error('Error adding a new product:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
    }
}

module.exports = {
    addProduct,
};
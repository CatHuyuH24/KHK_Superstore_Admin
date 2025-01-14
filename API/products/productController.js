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
        const IDproductAdded = await productService.addProduct(name, categoryId, manufacturerId, price, imageURL, detail, discount, number, fps, status);
        
        if (IDproductAdded && IDproductAdded > 0) {
            return res.status(StatusCodes.CREATED).json({ "product_added_id": IDproductAdded, "message": "Product added successfully!" });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
        }
    } catch (error) {
        console.error('Error adding a new product:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
    }
}

async function renderUpdateProductPage(req, res){
    try {
        const productID = req.params.id;
        const product = await productService.getProductById(productID);
        const categories = await productService.getAllCategories();
        const manufacturers = await productService.getAllManufacturers();
        
        const response = {
            product: product,
            categories: categories,
            allManufacturers: manufacturers,
        }

        if(product){
            return res.render('updateProduct', response);
        }else{
            return res.status(StatusCodes.NOT_FOUND).send('Product not found');
        }
    } catch (error) {
        console.error('Error rendering update product page:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
    }
}

async function updateProduct(req, res){
    try {
        const {id, name, categoryId, manufacturerId, price, detail, discount, number, fps, status } = req.body;
        let imageURL = "";
        if(req.file){
            const imageFilePath = req.file.path;
            imageURL = await productService.uploadProductImage(imageFilePath);
        }else{
            imageURL = null; // No new image uploaded -> keep the old image
        }

        const IDproductUpdated = await productService.updateProductById(name, categoryId, manufacturerId, price, imageURL, detail, discount, number, fps, status, id);
        if(IDproductUpdated == id){
            return res.status(StatusCodes.CREATED).json({ "product_updated_id": IDproductUpdated, "message": "Product updated successfully!" });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
        }
    
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
    }
}
module.exports = {
    addProduct,
    renderUpdateProductPage,
    updateProduct,
};
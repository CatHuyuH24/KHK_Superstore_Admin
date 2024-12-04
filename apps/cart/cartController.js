const cartService = require('./cartService');
const productService = require('../product/productService');

const addToCart = async (req, res) => {
    try {
        const { user_id, product_id, quantity = 1, price } = req.body;
        console.log('Request Body:', req.body); // Debugging log
        if (!user_id || !product_id || !quantity || !price) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const product = await productService.getProductById(product_id);
        console.log('Product:', product.status); // Debugging log
        if(product.status==='out of stock'){
            return res.status(400).json({ message: 'Product out of stock' });
        }
        const result = await cartService.addToCart(user_id, product_id, quantity, price);
        console.log('Service Result:', result); // Debugging log
        if (result) {
            return res.status(200).json({ message: "Product added to cart successfully", cart: result });
        } else {
            return res.status(500).json({ error: "Failed to add product to cart" });
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ message: 'Error adding product to cart' });
    }
};

module.exports = {
    addToCart
};
const { user } = require('pg/lib/defaults');
const pool = require('../../config/database');

const addToCart = async (user_id, product_id, quantity, price) => {
    try {
        const query = `
        INSERT INTO carts (user_id, product_id, quantity, price)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id, product_id) 
        DO UPDATE SET quantity = carts.quantity + $3, price = $4
        RETURNING *;
        `;
        const values = [user_id, product_id, quantity, price];
        const result = await pool.query(query, values);
        console.log('Add to Cart Result:', result.rows[0]); // Debugging log
        return result.rows[0];
    } catch {
        console.error('Error adding product to cart:', error.message);
        throw error;
    }
    
}

module.exports ={
    addToCart
}
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

const getProductInCartByUserId= async(user_id)=>{
    try {
        const result=await pool.query(`
        SELECT p.image_url, c.quantity, c.price,
        c.quantity * p.price AS total, p.name,
        p.price*p.discount/100 AS discount_price
        FROM carts c
        JOIN products p ON c.product_id=p.id
        WHERE c.user_id=$1
        `,[user_id])
        const totalSum = result.rows.reduce((sum, row) => sum + row.total, 0);
        const totalDiscount=result.rows.reduce((sum, row) => sum+ row.discount_price, 0);
        return {
            products: result.rows,
            totalSum: totalSum,
            totalDiscount: totalDiscount
        };
    }catch(error){
        console.error('Error fetching product in cart by user id', error);
        return { products: [], totalSum: 0, totalDiscount: 0 };
    }
}

module.exports ={
    addToCart,
    getProductInCartByUserId
}
const { user } = require('pg/lib/defaults');
const pool = require('../../config/database');

const getProductInCartByUserIdToOrder= async(user_id)=>{
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
            totalSum: parseFloat(totalSum.toFixed(2)),
            totalDiscount: parseFloat(totalDiscount.toFixed(2)),
            totalPay: parseFloat((totalSum-totalDiscount).toFixed(2))
        };
    }catch(error){
        console.error('Error fetching product in cart by user id', error);
        return { products: [], totalSum: 0, totalDiscount: 0 };
    }
}

module.exports ={
    getProductInCartByUserIdToOrder
}
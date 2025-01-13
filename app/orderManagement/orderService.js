const pool = require("../../config/database");

async function getAllOrder() {
    try{
    const query = `
        SELECT * FROM orders JOIN users ON orders.user_id = users.id`;
    const result = await pool.query(query);
    return result.rows;

    }catch(error){
        console.error('Error fetching order information:', error.message);
        return null;
    }
}


async function getOrderById(orderId) {
    try{
        const query = `
        SELECT 
            orders.*,
            orders_detail.quantity,
            orders_detail.price,
            products.name,
            products.image_url,
            products.discount,
            products.price as realPrice
        FROM orders 
        JOIN orders_detail ON orders.order_id = orders_detail.order_id
        JOIN products ON orders_detail.product_id = products.id
        WHERE orders.order_id = $1
        ORDER BY orders.created_at DESC;
        `;
        const values = [orderId];
        const result = await pool.query(query, values);
        return result.rows;
    }catch(error){
        console.error('Error fetching order information by id:', error.message);
        return null;
    }

}

async function getUsetInfoById(id){
    try{
        const query = `
            SELECT 
                real_name,
                phone_number,
                email
            FROM users 
            WHERE id = $1
        `;

        const values = [id];
        const result = await pool.query(query, values);
        return result.rows;
    }catch(error){
        console.error('Error fetching user information by id:', error.message);
        return null;
    }
}

async function updateOrder(id, status, payment_status) {
   
    const query = `
        UPDATE orders
        SET 
            status = $1,
            status_payment = $2,
            canceled_at = CASE 
                WHEN $1 = 'Canceled' THEN CURRENT_TIMESTAMP 
                ELSE canceled_at 
            END,
            completed_at = CASE 
                WHEN $1 = 'Completed' THEN CURRENT_TIMESTAMP 
                ELSE completed_at 
            END
        WHERE order_id = $3
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, [status, payment_status, id]);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating order:", error);
        throw new Error("Error updating order");
    }
}

async function getOrderByKeyword(keyword) {
    try{
        const query = `
        SELECT * FROM orders
        WHERE order_code ILIKE $1
        `;
        const values = [`%${keyword}%`];
        const result = await pool.query(query, values);
        return result.rows;
    }catch(error){
        console.error('Error get order information by order code:', error.message);
        return null;
    }
  
}

async function filterOrder(status, payment_status) {
    try {
        const values = [];
        let query = `
        SELECT orders.*, users.real_name, users.email 
        FROM orders 
        JOIN users ON orders.user_id = users.id
        WHERE 1=1
    `;

        if (status) {
            values.push(status);
            query += ` AND orders.status = $${values.length}`;
        }

        if (payment_status) {
            values.push(payment_status);
            query += ` AND orders.status_payment = $${values.length}`;
        }

        query += ` ORDER BY orders.created_at DESC`;
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.log("Error filtering order: ", error);
        throw new Error("Error filtering order");
    }

}

async function deleteOrder(orderId) {
    const queryORder = `
        DELETE FROM orders
        WHERE order_id = $1
    `;

    try {
        await pool.query(queryORder, [orderId]);
        return null;
    } catch (error) {
        console.log("Error deleting order: ", error);
        throw new Error("Error deleting order");
    }

}



module.exports = {
    getAllOrder,
    getOrderById,
    updateOrder,
    filterOrder,
    deleteOrder,
    getOrderByKeyword,
    getUsetInfoById
}
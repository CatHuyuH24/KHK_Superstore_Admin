const pool = require("../../config/database");

async function getAllUsers(filters = {}) {
    try {
        const { page, limit, name, email, sort } = filters;
        console.log(filters);

        let query = 'SELECT id, real_name, email, avatar_img_url, role, is_active, phone_number, COUNT(*) OVER() AS total_count FROM users WHERE 1=1';
        const values = [];

        if (name) {
            query += ` AND real_name ILIKE '%${name}%'`;

        }

        if (email) {
            query += ` AND email ILIKE '%${email}%'`;

        }

        if (sort) {
            query += ` ORDER BY ${sort}`;
        }

        query += ' LIMIT $1 OFFSET $2';
        values.push(limit);
        values.push((page - 1) * limit);

         const result = await pool.query(query, values);

        let count = 0;
        if (result.rows.length > 0) {
            count = parseInt(result.rows[0].total_count);
        }

   
        return {
            totalCount: count,
            users: result.rows,
        };
    } catch (error) {
        console.error('Error fetching filtered users:', error.message);
        throw error;
    }
}



async function updateUserStatus(id, isActive) {
    try {
        const query = 'UPDATE users SET is_active = $1 WHERE id = $2';
        await pool.query(query, [!isActive, id]);
    } catch (error) {
        console.error('Error updating user status:', error.message);
        throw error;
    }
}

async function deleteUser(id) {
    try {
        const query = 'DELETE FROM users WHERE id = $1';
        await pool.query(query, [id]);
    } catch (error) {
        console.error('Error deleting user status:', error.message);
        throw error;
    }
}

async function getUserById(id) {
    id = parseInt(id);
    console.log('id:', typeof(id));
    try {
        const query = 'SELECT id, real_name, email, avatar_img_url, role, is_active, phone_number FROM users WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching user by ID:', error.message);
        throw error;
    }
}

module.exports = {
  getAllUsers,
  updateUserStatus,
  deleteUser,
  getUserById
};
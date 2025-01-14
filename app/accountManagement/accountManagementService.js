const pool = require("../../config/database");

async function getAllUsers(filters = {}) {
    try {
        const { name, email, role } = filters;
        let query = 'SELECT id, real_name, email, avatar_img_url, role, is_active, phone_number FROM users WHERE 1=1';
        const values = [];

        if (name) {
            query += ' AND LOWER(real_name) LIKE $1';
            values.push(`%${name.toLowerCase()}%`);
        }
        if (email) {
            query += ' AND LOWER(email) LIKE $2';
            values.push(`%${email.toLowerCase()}%`);
        }
        if (role) {
            query += ' AND role = $3';
            values.push(role);
        }

        const result = await pool.query(query, values);
        return result.rows;
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
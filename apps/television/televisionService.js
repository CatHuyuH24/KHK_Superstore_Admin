const pool = require('../../config/database');

async function getAllTelevisions () {
    try {
        const result = await pool.query('SELECT * FROM televisions');
        return result;
    } catch (error) {
        console.error('Error fetching all televisions', error);
        return [];
    }
}

async function getTelevisionByID(id) {
    try {
        const result = await pool.query('SELECT * FROM televisions WHERE ID = $1', [id]);
        return result;
    } catch (error) {
        console.error('Error fetching television by ID', error);
        return [];
    }
}

module.exports = {
    getAllTelevisions,
    getTelevisionByID,
}
    
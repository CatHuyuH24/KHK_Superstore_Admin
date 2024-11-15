const pool = require('../../config/database');

async function getAllComputers () {
    try {
        const result = await pool.query('SELECT * FROM computers');
        return result;
    } catch (error) {
        console.error('Error fetching all computers', error);
        return [];
    }
}

async function getComputerByID(id) {
    try {
        const result = await pool.query('SELECT * FROM computers WHERE ID = $1', [id]);
        return result;
    } catch (error) {
        console.error('Error fetching computer by ID', error);
        return [];
    }
}

module.exports = {
    getAllComputers,
    getComputerByID,
}
    
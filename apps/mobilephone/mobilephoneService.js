const pool = require('../../config/database');

async function getAllMobilephones () {
    try {
        const result = await pool.query('SELECT * FROM mobilephones');
        return result;
    } catch (error) {
        console.error('Error fetching all mobilephones', error);
        return [];
    }
}

async function getMobilephoneByID(id) {
    try {       
        const result = await pool.query('SELECT * FROM mobilephones WHERE ID = $1', [id]);
        return result;
    } catch (error) {
        console.error('Error fetching mobilephone by ID', error);
        return [];
    }
}

module.exports = {
    getAllMobilephones,
    getMobilephoneByID,
}
    
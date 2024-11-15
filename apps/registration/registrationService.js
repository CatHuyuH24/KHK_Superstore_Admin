const pool = require('../../config/database');

async function findUserByEmail (email) {
    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1",[email])
        return result;
    } catch (error) {
        console.error('Error fetching user by email', error);
        return [];
    }
}

async function createUser(name,email,hashedPassword,salt) {
    try {  
        const query ="INSERT INTO users (username,email, password, salt) VALUES ($1, $2, $3, $4)";
	    const values = [name,email, hashedPassword, salt];
        
        await pool.query(query, values);     
        
    } catch (error) {
        console.error('Error create user', error);
    }
}

module.exports = {
    findUserByEmail,
    createUser,
}
    
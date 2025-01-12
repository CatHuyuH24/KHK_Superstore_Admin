const {genPassword, validPassword} = require('../Utils/passwordUtils');
const pool = require('../../config/database');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

async function getUserById(id) {
    try {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        if (result.rows.length > 0) {
            return result.rows[0];
        }
        return null;
    } catch (error) {
        console.error('Error fetching user by id', error);
        return null;
    }
}


async function getUserProfile(id) {
    try {
        const result = await pool.query(`
            SELECT email, real_name, phone_number
            FROM users u 
            WHERE u.id = $1
        `, [id]);

        if (result.rows.length > 0) {
            const userProfile = result.rows[0];
            
            if(!userProfile.phone_number){
                userProfile.phone_number='';
            }
            return userProfile;
        }

        return null;
    } catch (error) {
        console.error('Error fetching user profile by id', error);
        return null;
    }
}

async function updateUserProfile(id, name, email, phone) {
    try {
        await pool.query(
            "UPDATE users SET real_name = $1, email = $2, phone_number = $3 WHERE id = $4",
            [name, email, phone, id]
        );
    } catch (error) {
        console.error('Error updating user profile', error);
        throw error;
    }
}

async function updateUserEmail(id, email) {
    try {
        await pool.query(
            "UPDATE users SET email = $1 WHERE id = $2",
            [email, id]
        );
    } catch (error) {
        console.error('Error updating user email', error);
        throw error;
    }
}

async function sendVerificationEmail(userID, email) {
    try {
        const token = crypto.randomBytes(32).toString('hex');
        await pool.query(
            "INSERT INTO email_verifications (user_id, email, token) VALUES ($1, $2, $3)",
            [userID, email, token]
        );

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'nguyenminhkhang15052004@gmail.com',
                pass: 'jqiq loga kajs agol',
            },
        });

        const verificationLink = `http://localhost:3000/profile/verify-email?token=${token}`;

        const mailOptions = {
            from: 'nguyenminhkhang15052004@gmail.com',
            to: email,
            subject: 'Email Verification',
            text: `Please verify your email by clicking the following link: ${verificationLink}`,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending verification email', error);
        throw error;
    }
}

async function verifyPassword(userID, password) {
    try {
        const result = await pool.query("SELECT hashed_password, salt FROM users WHERE id = $1", [userID]);

        if (result.rows.length > 0) {
            const { hashed_password: hashedPassword, salt } = result.rows[0];

            const isMatch = validPassword(password, hashedPassword, salt);

            return isMatch;
        } else {
            return false; // Không tìm thấy người dùng
        }
    } catch (error) {
        console.error('Error verifying password:', error);
        throw error; // Ném lỗi để xử lý ở nơi gọi hàm
    }
}


async function updateUserPassword(userID, newPassword) {
    try {
        const { salt, hashedPassword } = await genPassword(newPassword);
        await pool.query(
            "UPDATE users SET hashed_password = $1, salt = $2 WHERE id = $3",
            [hashedPassword, salt, userID]
        );
    } catch (error) {
        console.error('Error updating user password', error);
        throw error;
    }
}

module.exports = {
    getUserById,
    updateUserProfile,
    updateUserEmail,
    sendVerificationEmail,
    verifyPassword,
    updateUserPassword,
    getUserProfile
};
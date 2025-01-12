// app/profile/profileController.js
const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const profileService = require('./profileService');
const pool = require('../../config/database');

async function renderProfilePage(req, res) {
    try {
        const userID = res.locals.user ? res.locals.user.id : null;
        if (!userID) {
            return res.redirect('/login');
        }
        res.render('profile', { title: 'Profile - Superstore', user_id: userID });
    } catch (error) {
        console.error('Error rendering profile page:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

async function updateProfile(req, res) {
    try {
        const userID = res.locals.user ? res.locals.user.id : null;
        if (!userID) {
            return res.redirect('/login');
        }
        const { name, email, phone } = req.body;
        const user = await profileService.getUserById(userID);

        if (user.email !== email) {
            await profileService.sendVerificationEmail(userID, email);
            return res.status(StatusCodes.OK).send('Verification email sent. Please verify your new email address.');
        }

        await profileService.updateUserProfile(userID, name, email, phone);
        res.redirect('/profile');
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

async function verifyEmail(req, res) {
    try {
        const { token } = req.query;
        const result = await pool.query(
            "SELECT user_id, email FROM email_verifications WHERE token = $1",
            [token]
        );

        if (result.rows.length > 0) {
            const { user_id, email } = result.rows[0];
            await profileService.updateUserEmail(user_id, email);
            await pool.query(
                "DELETE FROM email_verifications WHERE token = $1",
                [token]
            );
            res.redirect('/profile');
        } else {
            res.status(StatusCodes.BAD_REQUEST).send('Invalid or expired token.');
        }
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

async function changePassword(req, res) {
    try {
        const userID = res.locals.user ? res.locals.user.id : null;
        if (!userID) {
            return res.redirect('/login');
        }
        const { currentPassword, newPassword, confirmNewPassword } = req.body;

        if (newPassword !== confirmNewPassword) {
            message = "Confirm passwords do not match";
            return res.render('changePassword', { title: 'Change Password', message, user_id: userID });
        }
        const user = await profileService.getUserById(userID);

        const isPasswordValid = await profileService.verifyPassword(userID, currentPassword);
        if (!isPasswordValid) {
            message = "Current passwords is incorrect";
            return res.render('changePassword', { title: 'Change Password', message, user_id: userID });
        }

        await profileService.updateUserPassword(userID, newPassword);
        isSuccess = true;
        return res.render('changePassword', {title: 'Change Password', message: 'Password changed successfully', user_id: userID });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

module.exports = {
    renderProfilePage,
    updateProfile,
    verifyEmail,
    changePassword,
};
const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const profileService = require('./profileService');
const pool = require('../../config/database');

async function renderAdminProfilePage(req, res) {
    try {
        const userID = res.locals.user ? res.locals.user.id : null;
        if (!userID) {
            return res.redirect('/login');
        }
        const user = await profileService.getUserById(userID);
        if (user.role !== 'admin') {
            return res.status(StatusCodes.FORBIDDEN).send('Access denied');
        }
        const avatarUrl = user.avatar_img_url;
        res.render('adminProfile', { title: 'Admin Profile - Superstore', user_id: userID, avatarUrl });
    } catch (error) {
        console.error('Error rendering admin profile page:', error);
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

        const phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).send('Số điện thoại không hợp lệ. Số điện thoại phải bắt đầu bằng 0 và có đúng 10 chữ số.');
        }

        const user = await profileService.getUserById(userID);

        if (user.email !== email) {
            await profileService.sendVerificationEmail(userID, email);
            return res.status(StatusCodes.OK).send('Verification email sent. Please verify your new email address.');
        }

        await profileService.updateUserProfile(userID, name, email, phone);
        res.redirect('/admin-profile?success=1');
    } catch (error) {
        console.error('Error updating profile:', error);
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

        // Check if the new password meets the requirements
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            const message = "Password must be at least 8 characters long and include at least one number, one uppercase letter, one lowercase letter, and one special character.";
            return res.render('changePassword', { title: 'Change Password', message, user_id: userID });
        }

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
        return res.render('changePassword', {title: 'Change Password', message: 'Password changed successfully', user_id: userID });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

async function uploadAvatar(req, res) {
    try {
        const userId = res.locals.user ? res.locals.user.id : null;
        if (!userId) {
            return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized');
        }
        const filePath = req.file.path;

        const imageUrl = await profileService.uploadAvatar(userId, filePath);

        res.json({ imageUrl });
    } catch (error) {
        console.error('Error uploading avatar:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to upload avatar' });
    }
}

module.exports = {
    renderAdminProfilePage,
    updateProfile,
    changePassword,
    uploadAvatar,
};
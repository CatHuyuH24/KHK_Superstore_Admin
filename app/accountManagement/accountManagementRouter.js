const express = require('express');
const accountManagementController = require('./accountManagementController');

const router = express.Router();

// Render the account management page
router.get('/', accountManagementController.renderAccountManagementPage);

// Fetch user data
router.get('/users', accountManagementController.getUsers);

// Create, update, and delete user APIs
router.post('/create', accountManagementController.createUser);
router.put('/update/:id', accountManagementController.updateUser);
router.delete('/delete/:id', accountManagementController.deleteUser);

// Update user status
router.put('/update-status/:id', accountManagementController.updateUserStatus);

// Render the account detail page
router.get('/detail/:id', accountManagementController.renderAccountDetailPage);

module.exports = router;
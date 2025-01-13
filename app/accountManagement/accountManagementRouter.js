const express = require('express');
const AccountManagementController = require('./accountManagementController');

const router = express.Router();
const accountManagementController = new AccountManagementController();

// Render the account management page
router.get('/', accountManagementController.renderAccountManagementPage);

// Create, update, and delete user APIs
router.post('/create', accountManagementController.createUser);
router.put('/update/:id', accountManagementController.updateUser);
router.delete('/delete/:id', accountManagementController.deleteUser);

module.exports = router;

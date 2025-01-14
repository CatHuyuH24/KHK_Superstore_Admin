const express = require('express');
const accountManagementController = require('./accountManagementController');
const utils = require("../../app/Utils/jwtUtils");
const router = express.Router();


router.get('/',utils.authMiddleware({ session: true }), accountManagementController.getUsers);



// Create, update, and delete user APIs
router.post('/create',utils.authMiddleware({ session: true }), accountManagementController.createUser);
router.put('/update/:id',utils.authMiddleware({ session: true }), accountManagementController.updateUser);
router.delete('/delete/:id',utils.authMiddleware({ session: true }), accountManagementController.deleteUser);

// Update user status
router.put('/update-status/:id',utils.authMiddleware({ session: true }), accountManagementController.updateUserStatus);

// Render the account detail page
router.get('/detail/:id',utils.authMiddleware({ session: true }), accountManagementController.renderAccountDetailPage);

module.exports = router;
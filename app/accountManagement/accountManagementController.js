const accountManagementService = require('./accountManagementService');
const pool = require("../../config/database");

async function renderAccountManagementPage(req, res) {
  try {
    const users = await accountManagementService.getAllUsers();
    res.render('accountManagement', { users });
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
}

async function getUsers(req, res) {
    try {
        const filters = {
            name: req.query.name || null,
            email: req.query.email || null,
            role: req.query.role || null
        };
        const users = await accountManagementService.getAllUsers(filters);
        res.json(users);
    } catch (error) {
        res.status(500).send('Error fetching filtered users');
    }
}

async function createUser(req, res) {
  // Logic for creating a user
  res.send("User created");
}

async function updateUser(req, res) {
  // Logic for updating a user
  res.send("User updated");
}

async function renderAccountDetailPage(req, res) {
  try {
    const { id } = req.params;
    const user = await accountManagementService.getUserById(id);
    res.render('accountDetailPage', { user });
  } catch (error) {
    res.status(500).send('Error fetching user details');
  }
}

async function updateUserStatus(req, res) {
  try {
    const { id } = req.params;
    const { is_active } = req.body;
    // Check if the user ID is the same as the currently logged-in user's ID
    if (req.user && req.user.id === parseInt(id, 10)) {
      return res.status(400).send("You cannot ban your own account.");
    }
    
    await accountManagementService.updateUserStatus(id, is_active);
    res.send("User status updated");
  } catch (error) {
    console.error('Error updating user status:', error.message);
    res.status(500).send('Error updating user status');
  }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        if (req.user && req.user.id === parseInt(id, 10)) {
            return res.status(400).send("You cannot delete your own account.");
        }

        await accountManagementService.deleteUser(id);
        res.send("User deleted successfully");
    } catch (error) {
        console.error('Error deleting user status:', error.message);
        res.status(500).send('Error deleting user status');
    }
}

async function renderAccountDetailPage(req, res) {
  try {
    const { id } = req.params;
    const user = await accountManagementService.getUserById(id);
    res.render('accountDetailPage', { user });
  } catch (error) {
    res.status(500).send('Error fetching user details');
  }
}

module.exports = {
  renderAccountManagementPage,
  getUsers,
  createUser,
  updateUser,
  renderAccountDetailPage,
  deleteUser,
  updateUserStatus,
  renderAccountDetailPage,
};
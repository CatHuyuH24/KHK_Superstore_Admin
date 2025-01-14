const accountManagementService = require('./accountManagementService');
const pool = require("../../config/database");

// async function renderAccountManagementPage(req, res) {
//   try {
//     const users = await accountManagementService.getAllUsers();
//     res.render('accountManagement', { users });
//   } catch (error) {
//     res.status(500).send('Error fetching users');
//   }
// }

async function getUsers(req, res) {
    try {
        const filters = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 3,
            name: req.query.name || "",
            email: req.query.email || "",
            sort: req.query.sort || "role"
        };
        const {totalCount,users} = await accountManagementService.getAllUsers(filters);
       console.log(totalCount);

        const response = {
          error: false,
          total: totalCount,
          page: filters.page,
          totalPages: Math.ceil(totalCount / filters.limit),
          itemsPerPage: filters.limit,
          users: users,
        };
    
        if (req.xhr) {
          return res.json(response);
        }
        return res.render('accountManagement', response);

    } catch (error) {
        console.error("error render user",error);
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
  getUsers,
  createUser,
  updateUser,
  renderAccountDetailPage,
  deleteUser,
  updateUserStatus,
  renderAccountDetailPage,
};
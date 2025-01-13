// filterHandling.js

// Update account list based on filters
function applyFilters() {
    const nameFilter = document.getElementById('filter-name').value.trim().toLowerCase();
    const emailFilter = document.getElementById('filter-email').value.trim().toLowerCase();
    const roleFilter = document.getElementById('filter-role').value;
    const sortBy = document.getElementById('sort-by').value;

    // Fetch existing user data (assuming it's globally available as `users`)
    const filteredUsers = filterAccounts(users, { name: nameFilter, email: emailFilter, role: roleFilter });
    const sortedUsers = sortAccounts(filteredUsers, sortBy);

    // Re-render the table
    renderUserTable(sortedUsers);
}

// Filter user data
function filterAccounts(accounts, filters) {
    let filtered = accounts;

    if (filters.name) {
        filtered = filtered.filter(account =>
            account.real_name.toLowerCase().includes(filters.name)
        );
    }

    if (filters.email) {
        filtered = filtered.filter(account =>
            account.email.toLowerCase().includes(filters.email)
        );
    }

    if (filters.role) {
        filtered = filtered.filter(account => account.role === filters.role);
    }

    return filtered;
}

// Sort user data
function sortAccounts(accounts, sortBy) {
    if (sortBy) {
        accounts.sort((a, b) => {
            if (sortBy === 'name' || sortBy === 'email') {
                return a[sortBy].localeCompare(b[sortBy]);
            } else if (sortBy === 'registered') {
                return new Date(a[sortBy]) - new Date(b[sortBy]);
            }
        });
    }
    return accounts;
}

// Render the user table
function renderUserTable(users) {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = ''; // Clear the table body

    users.forEach(user => {
        const row = `
            <tr class="hover:bg-gray-50 border-b">
                <td class="px-4 py-2 text-center">
                    <img src="${user.avatar_img_url}" alt="Avatar" class="w-10 h-10 rounded-full mx-auto">
                </td>
                <td class="px-4 py-2 text-gray-800">${user.real_name}</td>
                <td class="px-4 py-2 text-gray-800">${user.email}</td>
                <td class="px-4 py-2 text-gray-800">${user.role}</td>
                <td class="px-4 py-2 text-center">
                    <span class="${user.is_active ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}">
                        ${user.is_active ? 'Yes' : 'No'}
                    </span>
                </td>
                <td class="px-4 py-2 text-gray-800">${user.phone_number}</td>
                <td class="px-4 py-2 text-center space-y-2">
                    <button class="py-1 px-3 text-white rounded bg-blue-500 hover:bg-blue-400 shadow-lg transition-all duration-300"
                        onclick="handleView('${user.id}')">
                        View
                    </button>
                    <button class="py-1 px-3 text-white rounded shadow-lg transition-all duration-300 
                        ${user.is_active ? 'bg-red-500 hover:bg-red-400' : 'bg-green-500 hover:bg-green-400'}"
                        onclick="handleBanUnban('${user.id}', ${user.is_active})">
                        ${user.is_active ? 'Ban' : 'Unban'}
                    </button>
                    <button class="py-1 px-3 text-white rounded bg-gray-500 hover:bg-gray-400 shadow-lg transition-all duration-300"
                        onclick="handleDelete('${user.id}')">
                        Delete
                    </button>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

function handleView(userId) {
    window.location.href = `/account-management/detail/${userId}`;
}

async function handleBanUnban(userId, isActive) {
    if (confirm(isActive ? "Are you sure you want to ban this user?" : "Are you sure you want to unban this user?")) {
      try {
        const response = await fetch(`/account-management/update-status/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ is_active: isActive }),
        });

        if (response.ok) {
          // Update the UI or reload the page
          alert('User status updated successfully');
          location.reload();
        } else {
            const errorMessage = await response.text();
            if (errorMessage === "You cannot ban your own account.") {
                alert('You cannot ban your own account.');
            } else {
                alert('Failed to update user status');
            }
        }
      } catch (error) {
        console.error('Error updating user status:', error);
        alert('Error updating user status');
      }
    }
  }

  async function handleDelete(userId) {
    if (confirm(`Are you sure you want to delete user ${userId}?`)) {
        try {
            const response = await fetch(`/account-management/delete/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Update the UI or reload the page
                alert('User deleted successfully');
                location.reload();
            } else {
                const errorMessage = await response.text();
                if (errorMessage === "You cannot delete your own account.") {
                    alert('You cannot delete your own account.');
                } else {
                    alert('Failed to delete user status');
                }
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Error deleting user');
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let accounts = [];

    // Fetch user data from the server
    async function fetchUserData() {
        try {
            const response = await fetch('/account-management/users');
            accounts = await response.json();
            renderAccounts(accounts);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    // Function to render the account list
    function renderAccounts(filteredAccounts) {
        const accountList = document.getElementById('account-list');
        accountList.innerHTML = filteredAccounts.map(account => `
            <tr class="hover:bg-gray-100 cursor-pointer">
                <td class="px-4 py-2">${account.real_name}</td>
                <td class="px-4 py-2">${account.email}</td>
                <td class="px-4 py-2">${account.role}</td>
                <td class="px-4 py-2">${account.is_active ? 'Active' : 'Inactive'}</td>
                <td class="px-4 py-2 text-center space-y-2">
                    <button class="py-1 px-3 text-white rounded bg-blue-500 hover:bg-blue-400 shadow-lg transition-all duration-300" onclick="handleView('${account.id}')">View</button>
                    <button class="py-1 px-3 text-white rounded shadow-lg transition-all duration-300 ${account.is_active ? 'bg-red-500 hover:bg-red-400' : 'bg-green-500 hover:bg-green-400'}" onclick="handleBanUnban('${account.id}', ${account.is_active})">${account.is_active ? 'Ban' : 'Unban'}</button>
                    <button class="py-1 px-3 text-white rounded bg-gray-500 hover:bg-gray-400 shadow-lg transition-all duration-300" onclick="handleDelete('${account.id}')">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    // Sort accounts
    function sortAccounts(accounts, sortBy) {
        return accounts.sort((a, b) => {
            if (sortBy === 'name') {
                return a.real_name.localeCompare(b.real_name);
            } else if (sortBy === 'email') {
                return a.email.localeCompare(b.email);
            }
            return 0;
        });
    }

    // Apply sorting
    function applySorting() {
        const sortBy = document.getElementById('sort-by').value;
        const sortedAccounts = sortAccounts(accounts, sortBy);
        renderAccounts(sortedAccounts);
    }

    // Event listeners
    document.getElementById('sort-by').addEventListener('change', applySorting);

    // Fetch and display initial user data
    fetchUserData();
});

// Attach event listeners to filter and sort inputs
document.getElementById('filter-name').addEventListener('input', applyFilters);
document.getElementById('filter-email').addEventListener('input', applyFilters);
document.getElementById('filter-role').addEventListener('change', applyFilters);
document.getElementById('sort-by').addEventListener('change', applyFilters);

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
            applyFilters(); // Apply filters initially
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

    // Filter accounts
    function filterAccounts(accounts, filters) {
        return accounts.filter(account => {
            const nameMatch = account.real_name.toLowerCase().includes(filters.name.toLowerCase());
            const emailMatch = account.email.toLowerCase().includes(filters.email.toLowerCase());
            const roleMatch = !filters.role || account.role === filters.role;
            return nameMatch && emailMatch && roleMatch;
        });
    }

    // Sort accounts
    function sortAccounts(accounts, sortBy) {
        return accounts.sort((a, b) => {
            if (sortBy === 'name') {
                return a.real_name.localeCompare(b.real_name);
            } else if (sortBy === 'email') {
                return a.email.localeCompare(b.email);
            } else if (sortBy === 'registered') {
                return new Date(a.created_at) - new Date(b.created_at); // Assuming you have a created_at column
            }
            return 0;
        });
    }

    // Apply filters and sorting
    function applyFilters() {
        const filters = {
            name: document.getElementById('filter-name').value,
            email: document.getElementById('filter-email').value,
            role: document.getElementById('filter-role').value,
        };
        const sortBy = document.getElementById('sort-by').value;
        let filteredAccounts = filterAccounts(accounts, filters);
        filteredAccounts = sortAccounts(filteredAccounts, sortBy);
        renderAccounts(filteredAccounts);
    }

    // Event listeners
    document.getElementById('filter-name').addEventListener('input', applyFilters);
    document.getElementById('filter-email').addEventListener('input', applyFilters);
    document.getElementById('filter-role').addEventListener('change', applyFilters);
    document.getElementById('sort-by').addEventListener('change', applyFilters);

    // Fetch and display initial user data
    fetchUserData();
});
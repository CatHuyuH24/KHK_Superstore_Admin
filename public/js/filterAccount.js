document.addEventListener('DOMContentLoaded', function() {
    const filterName = document.getElementById('filter-name');
    const filterEmail = document.getElementById('filter-email');
    const sortBy = document.getElementById('sort-by');
    const applyButton = document.getElementById('apply');


    async function updateUrl() {
        const nameValue = filterName.value.trim();
        

        const emailValue = filterEmail.value.trim();
        let sortValue = sortBy.value;

        if (sortValue === 'name') {
            sortValue = 'real_name';
        } else if (sortValue === 'email') {
            sortValue = 'email';
        } else if (sortValue === 'registered') {
            sortValue = 'created_at';
        } else {
            sortValue = 'default';
        }

        const urlParams = new URLSearchParams(window.location.search);

        if (nameValue) {
            urlParams.set('name', nameValue);
        } else {
            urlParams.delete('name');
        }

        if (emailValue) {
            urlParams.set('email', emailValue);
        } else {
            urlParams.delete('email');
        }

        if (sortValue !== 'default') {
            urlParams.set('sort', sortValue);
        } else {
            urlParams.delete('sort');
        }

        const newURL = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.pushState(null, '', newURL);
        console.log(urlParams.toString());

        await fetchAndRender(newURL);
    }

   
    filterName.addEventListener('input', updateUrl);
    filterEmail.addEventListener('input', updateUrl);
    sortBy.addEventListener('change', updateUrl);

  
    applyButton.addEventListener('click', function(event) {
        event.preventDefault(); 
        updateUrl();
    });

});


async function changePage(page) {
    const params = new URLSearchParams(window.location.search);
    params.set('page', page);
   
    const newURL = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState(null, '', newURL);
    await fetchAndRender(newURL);
  }
  

function updatePagination(total, itemsPerPage, page) {
    const totalPage = Math.ceil(total / itemsPerPage);
    renderPagination(totalPage, page);
}
  
function renderPagination(totalPage, page) {
const paginationElement = document.getElementById('Pagination');
paginationElement.innerHTML = '';

paginationElement.innerHTML += `
    <button onclick="changePage(${page - 1
    })" class="relative inline-flex items-center rounded-l-md px-4 py-4 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
        <span class="sr-only">Previous</span>
        <svg class="size-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
            <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
        </svg>
    </button>
`;

for (let i = 1; i <= totalPage; i++) {
    paginationElement.innerHTML += `
        <button onclick="changePage(${i})" class="relative ${i === page ? 'z-10 bg-slate-800 text-white' : 'text-gray-900'
    } inline-flex items-center px-6 py-4 text-lg font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
            ${i}
        </button>
    `;
}

paginationElement.innerHTML += `
    <button onclick="changePage(${page + 1
    })" class="relative inline-flex items-center rounded-r-md px-4 py-4 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
        <span class="sr-only">Next</span>
        <svg class="size-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
            <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
    </button>
`;
}
  
async function fetchAndRender(newURL) {
    try {
      const response = await fetch(newURL, {
        method: 'GET',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
  
      if (response.ok) {
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          if (!data.error) {
            updateUsersList(data.users);
            updatePagination(data.total, data.itemsPerPage, data.page);
          } else {
            console.error('Error fetching data:', data.error);
          }
        } else {
          console.error('Unexpected response type:', await response.text());
        }
      } else {
        console.error('Server error:', response.status);
      }
    } catch (error) {
      console.error('Error in AJAX request:', error);
    }
  }


  function updateUsersList(users) {
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = ''; 

    users.forEach(user => {
        const row = document.createElement('tr');
        row.classList.add('hover:bg-gray-50', 'border-b');

        row.innerHTML = `
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
                <button class="py-1 px-3 text-white rounded bg-blue-500 hover:bg-blue-400 shadow-lg transition-all duration-300" onclick="handleView('${user.id}')">View</button>
                <button class="py-1 px-3 text-white rounded shadow-lg transition-all duration-300 ${user.is_active ? 'bg-red-500 hover:bg-red-400' : 'bg-green-500 hover:bg-green-400'}" onclick="handleBanUnban('${user.id}', ${user.is_active})">${user.is_active ? 'Ban' : 'Unban'}</button>
                <button class="py-1 px-3 text-white rounded bg-gray-500 hover:bg-gray-400 shadow-lg transition-all duration-300" onclick="handleDelete('${user.id}')">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);  // Thêm dòng vào bảng
    });
}

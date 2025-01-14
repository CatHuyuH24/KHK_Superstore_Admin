async function updateFilter() {
  const form = document.getElementById('manufacturer-filter-form');
  const formData = new FormData(form);

  const selectedManufacturers = formData.getAll('manufacturers');

  const params = new URLSearchParams(window.location.search);
  params.set('page', 1);
  if (selectedManufacturers.length > 0) {
    params.set('manufacturer', selectedManufacturers.join(','));
  } else {
    params.delete('manufacturer');
  }

  const newURL = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState(null, '', newURL);
  // Gửi yêu cầu AJAX tới server
  await fetchAndRender(newURL);
}

async function applyFilterByFPS() {
  const form = document.getElementById('FPS-filter-form');
  const formData = new FormData(form);

  const selectedFPS = formData.getAll('fps');

  const params = new URLSearchParams(window.location.search);
  params.set('page', 1);
  if (selectedFPS.length > 0) {
    params.set('fps', selectedFPS.join(','));
  } else {
    params.delete('fps');
  }

  const newURL = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState(null, '', newURL);

  await fetchAndRender(newURL);
}


// async function applyFilters() {
//   const form = document.getElementById('price-filter-form');
//   const formData = new FormData(form);

//   // Lấy giá trị min và max
//   const minPrice = formData.get('min');
//   const maxPrice = formData.get('max');

//   // Tạo URL mới với các tham số
//   const params = new URLSearchParams(window.location.search);
//   params.set('page', 1); // Reset về trang đầu tiên
//   if (minPrice) {
//     params.set('min', minPrice);
//   } else {
//     params.delete('min');
//   }
//   if (maxPrice) {
//     params.set('max', maxPrice);
//   } else {
//     params.delete('max');
//   }

//   // Cập nhật URL mà không tải lại trang
//   const newURL = `${window.location.pathname}?${params.toString()}`;
//   window.history.pushState(null, '', newURL);

//   // Gửi yêu cầu AJAX tới server
//   await fetchAndRender(newURL);
// }

async function applyDateFilters() {
  const form = document.getElementById('created-time-filter-form');
  const formData = new FormData(form);

  const startDate = formData.get('startDate');
  const endDate = formData.get('endDate');

  // Tạo URL mới với các tham số
  const params = new URLSearchParams(window.location.search);
  params.set('page', 1); // Reset về trang đầu tiên
  if (startDate) {
    params.set('startDate', startDate);
  } else {
    params.delete('startDate');
  }
  if (endDate) {
    params.set('endDate', endDate);
  } else {
    params.delete('endDate');
  }

  // Cập nhật URL mà không tải lại trang
  const newURL = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState(null, '', newURL);

  // Gửi yêu cầu AJAX tới server
  await fetchAndRender(newURL);
}

function applyAndUpdateFilters() {
  applyFilters();
}

async function updateSortFilter() {
  const selectElement = document.getElementById('sort');
  const selectedSort = selectElement.value;

  if (!selectedSort) {
    return;
  }

  const params = new URLSearchParams(window.location.search);

  if (selectedSort === 'price-low-to-high') {
    params.set('sort', 'price,asc');
  } else if (selectedSort === 'price-high-to-low') {
    params.set('sort', 'price,desc');
  }

  const newURL = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState(null, '', newURL);

  await fetchAndRender(newURL);
}

async function changePage(page) {
  const form = document.getElementById('manufacturer-filter-form');
  const formData = new FormData(form);
  const selectedManufacturers = formData.getAll('manufacturers');

  const params = new URLSearchParams(window.location.search);
  params.set('page', page);
  if (selectedManufacturers.length > 0) {
    params.set('manufacturer', selectedManufacturers.join(','));
  } else {
    params.delete('manufacturer');
  }

  const newURL = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState(null, '', newURL);

  await fetchAndRender(newURL);
}

// Hàm để cập nhật danh sách sản phẩm
function updateProductList(products) {
  const productContainer = document.getElementById('product-list'); // Class container sản phẩm
  productContainer.innerHTML = ''; // Xóa danh sách cũ

  // Render danh sách sản phẩm mới
  products.forEach((product) => {
    let productHTML = `
    <div class="bg-white shadow-md flex flex-row rounded-lg p-4">
      <!-- Phần hình ảnh sản phẩm -->
      <div class="relative group w-1/4 h-32 flex items-center justify-center mr-4">
        <img src="${product.image_url}" alt="${product.name}" class="max-w-full max-h-full rounded-md" />
      </div>

      <!-- Thông tin sản phẩm -->
      <div class="flex-grow flex flex-col justify-between">
        <div>
          <a href="/category/${product.category_name}/${product.id}">
            <h4 class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
              ${product.name}
            </h4>
          </a>

          <div class="flex justify-between mb-1 space-x-2">
            <p class="text-xl text-primary font-semibold">
              ${product.manufacturer_name}
            </p>
            <p class="text-right text-base text-red-600">${product.status}</p>
          </div>
          <div class="flex items-baseline mb-1 space-x-2">
            <p class="text-xl text-primary font-semibold">
              $${product.price}
            </p>`;

    if (product.discount > 0) {
      productHTML += `<p class="text-base text-red-600 font-extrabold">-${product.discount}%</p>`;
    }
    productHTML += `
          </div>
          
          <div class="flex gap-1 text-sm text-gray-600">
            
          `;
    if (product.review_average == null) {
      productHTML += `<span>No reviews</span>`;
    } else {
      let rating = Number(product.review_average).toFixed(1);
      let total = 0;
      while (rating > 0) {
        if (rating > 0.7) {
          productHTML += `<span class="star on"></span>`;
        } else if (rating >= 0.3) {
          productHTML += `<span class="star half"></span>`;
        } else {
          productHTML += `<span class="star off"></span>`;
        }
        total++;
        rating--;
      }
      while (total < 5) {
        productHTML += `<span class="star off"></span>`;
        total++;
      }
      productHTML += `<span>(${product.reviewer_count})</span>`;
    }

    productHTML += `
        </div>
      </div> 

      <!-- Nút Update -->
      <div class="flex justify-end space-x-4 mt-4">
        <button product-id=${product.id}
          class="update-product-btn py-2 px-4 text-center text-white bg-blue-500 hover:bg-blue-400 transition rounded">
          Update
        </button>
      </div>
    </div>
  </div>`;

    productContainer.insertAdjacentHTML('beforeend', productHTML);
  });


  productContainer.scrollIntoView({ behavior: 'smooth' });
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
          updateProductList(data.products);
          updatePagination(data.total, data.itemsPerPage, data.page);
          setUpdateProductButtons();// addproducthandling.js must be included before this file
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

document.addEventListener("DOMContentLoaded", function () {
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");

  function validateDates() {
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);

    if (startDate > endDate) {
      alert("Start date cannot be after end date!");
      startDateInput.value = "";
    }
  }

  startDateInput.addEventListener("change", validateDates);
  endDateInput.addEventListener("change", validateDates);
});


async function fetchUserData() {
  try {
      const nameFilter = filterNameInput.value;
      const emailFilter = filterEmailInput.value;
      const roleFilter = filterRoleSelect.value;

      const queryParams = new URLSearchParams({
          name: nameFilter || '',
          email: emailFilter || '',
          role: roleFilter || ''
      });

      const response = await fetch(`/account-management/users?${queryParams.toString()}`);
      accounts = await response.json();
      renderAccounts(accounts);
  } catch (error) {
      console.error('Error fetching user data:', error);
  }
}

async function applyFilters() {
  const manufacturerForm = document.getElementById('manufacturer-filter-form');
  const fpsForm = document.getElementById('FPS-filter-form');
  const priceForm = document.getElementById('price-filter-form');
  const dateForm = document.getElementById('created-time-filter-form');

  const manufacturerFormData = new FormData(manufacturerForm);
  const fpsFormData = new FormData(fpsForm);
  const priceFormData = new FormData(priceForm);
  const dateFormData = new FormData(dateForm);

  const selectedManufacturers = manufacturerFormData.getAll('manufacturers');
  const selectedFPS = fpsFormData.getAll('fps');
  const minPrice = priceFormData.get('min');
  const maxPrice = priceFormData.get('max');
  const startDate = dateFormData.get('startDate');
  const endDate = dateFormData.get('endDate');

  const params = new URLSearchParams(window.location.search);
  params.set('page', 1);

  if (selectedManufacturers.length > 0) {
    params.set('manufacturer', selectedManufacturers.join(','));
  } else {
    params.delete('manufacturer');
  }

  if (selectedFPS.length > 0) {
    params.set('fps', selectedFPS.join(','));
  } else {
    params.delete('fps');
  }

  if (minPrice) {
    params.set('min', minPrice);
  } else {
    params.delete('min');
  }

  if (maxPrice) {
    params.set('max', maxPrice);
  } else {
    params.delete('max');
  }

  if (startDate) {
    params.set('startDate', startDate);
  } else {
    params.delete('startDate');
  }

  if (endDate) {
    params.set('endDate', endDate);
  } else {
    params.delete('endDate');
  }

  const newURL = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState(null, '', newURL);

  await fetchAndRender(newURL);
}
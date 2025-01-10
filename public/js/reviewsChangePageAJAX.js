const reviewsList = document.querySelector('#reviews-list');
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
                console.log("data is not error")
            updateReviews(data.reviews);
            updatePagination(data.total_reviews_count, data.reviews_per_page, data.page);
            reviewsList.scrollIntoView({behavior: 'smooth'});
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


function updateReviews(reviews){
    reviewsList.innerHTML = '';
    reviews.forEach(review => {
        let reviewHTML = `<div class="bg-white shadow-md flex flex-col h-full justify-items-start">
                                    <div class="flex items-center justify-between p-3">
                                        <div class="flex items-center m-2">
                                            <img src="/images/user_image_placeholder.png" alt="user" class="w-10 h-10 rounded-full">
                                            <div class="ml-3">
                                                <h4 class="text-lg lg:text-xl font-medium text-gray-800">
                                                    ${review.username}
                                                </h4>
                                                <div class="flex items-center gap-1">`
        let rating = Number(review.rating);
        let total = 0;
        while (rating > 0) { 
            reviewHTML += `<span class="star on"></span>`
            rating--;
            total++;
        }
        while (total < 5) {
            reviewHTML += `<span class="star off"></span>`
            total++;
        }

    reviewHTML += `</div>
        </div>
    </div>
    <span class="text-gray-600 text-sm text-end m-2 md:text-base lg:text-lg">`
        let date = new Date(review.created_at);
        reviewHTML += `${date.toLocaleString('en-US', { month: 'short' }).toUpperCase()} 
        ${date.getDate().toString().padStart(2, '0')}
        ${date.getFullYear()} 
        ${date.toTimeString().slice(0, 8)}
                </span>
            </div>
            <div class="p-3 max-h-52 text-ellipsis overflow-y-auto">
                <p class="text-gray-600 text-sm md:text-base lg:text-lg 2xl:text-2xl break-words">
                    ${review.comment}
                </p>
            </div>
        </div>`;
    
    reviewsList.insertAdjacentHTML('beforeend', reviewHTML);
    });

}

async function changeReviewPage(page) {  
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
        <button onclick="changeReviewPage(${
          page - 1
        })" class="relative inline-flex items-center rounded-l-md px-4 py-4 text-black ring-1 ring-inset ring-gray-300 hover:bg-gray-400 focus:z-20 focus:outline-offset-0">
            <span class="sr-only">Previous</span>
            <svg class="size-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
            </svg>
        </button>
    `;
  
    for (let i = 1; i <= totalPage; i++) {
      paginationElement.innerHTML += `
          <button onclick="changeReviewPage(${i})" class="relative 
          ${i === page ? 'z-10 text-white bg-slate-800' : 'text-gray-900' } 
          inline-flex items-center px-6 py-4 text-lg font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-400 focus:z-20 focus:outline-offset-0">
          ${i}
          </button>
      `;
    }
  
    paginationElement.innerHTML += `
        <button onclick="changeReviewPage(${
          page + 1
        })" class="relative inline-flex items-center rounded-r-md px-4 py-4 text-black ring-1 ring-inset ring-gray-300 hover:bg-gray-400 focus:z-20 focus:outline-offset-0">
            <span class="sr-only">Next</span>
            <svg class="size-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>
        </button>
    `;
}
  
let cartList = document.querySelector("#cart-list");
let totalSumElement = document.querySelector("#total-sum");
let totalDiscountElement = document.querySelector("#total-discount");
let totalPayElement = document.querySelector("#total-pay");

async function updateCartList(products){
  cartList.innerHTML = "";

  products.forEach((product) => {
    let productHTML = `
    <tr class="border-b bg-white">          
      <td><img class="ml-8 max-w-xs w-12 rounded-md" src="${product.image_url}" alt="Product image" /></td>
      <td class="py-4 px-6 text-left">${product.name}</td>
      <td class="py-4 px-6 text-left">
          <div class="flex items-center">
              <button class="text-gray-700 hover:text-gray-900 p-2">
                  <i class="gg-math-minus"></i>
              </button>
              <input id="quantity-modifier" class="mx-2 w-8 text-center" type="number" value="${product.quantity}">
              <button class="text-gray-700 hover:text-gray-900 p-2">
                  <i class="gg-math-plus"></i>
              </button>
          </div>
      </td>
      <td class="py-4 px-6 text-right">$${product.price}</td>
      <td class="py-4 px-6 text-right">$${product.discount_price}</td>
      <td class="py-4 px-6 text-center">
          <button class="text-red-600 hover:text-red-800 delete-btn" product-id="${product.id}">
              Delete
          </button>
      </td>
    </tr>`;
    cartList.innerHTML += productHTML;
  });

  await attachListeners();
}

async function updateCartTotal(totalSum, totalDiscount, totalPay){
  totalSumElement.innerHTML = `$${totalSum}`;
  totalDiscountElement.innerHTML = `-$${totalDiscount}`;
  totalPayElement.innerHTML = `$${totalPay}`;
}

async function fetchAndRenderTotalOnly(newURL) {
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
          updateCartTotal(data.totalSum, data.totalDiscount, data.totalPay);
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
          updateCartList(data.products);
          updateCartTotal(data.totalSum, data.totalDiscount, data.totalPay);
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

async function attachListeners(){
  const quantityInputs = document.querySelectorAll('input[type="number"]');
  const userId = document.querySelector("#user-id").value;

  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
      try{
        const productId = event.target.getAttribute("product-id");
        const response = await fetch('/cart/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productId, userId })
        });
        if (!response.ok) {
          throw new Error('Failed to delete product');
        }
        else
        {
          await fetchAndRender('/cart');
        }
      }catch(error){
        console.error('Error:', error);
      }
  
    }
  )});
  quantityInputs.forEach(input => {
    input.addEventListener('change', async (event) => {
    const productId = event.target.closest('tr').querySelector('.delete-btn').getAttribute("product-id");
    const newQuantity = event.target.value;
    try {
      const response = await fetch('/cart/update-quantity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, newQuantity, userId })
      });

      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }
      else
      {
        await fetchAndRenderTotalOnly('/cart');
      }        
    } catch (error) {
      console.error('Error:', error);
    }
  });
});
}
document.addEventListener('DOMContentLoaded', async () => {
  await attachListeners();
});
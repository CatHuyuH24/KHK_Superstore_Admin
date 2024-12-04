// public/js/cart.js
function updateCartList(products){
  alert('called');
  const cartList = document.querySelector("#cart-list");
  cartList.innerHTML = "";
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
          alert('not error')
          updateCartList(data.products);
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
document.addEventListener('DOMContentLoaded', async () => {
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
          fetchAndRender('/cart');
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
          alert('haha')
          fetchAndRender('/cart');
        }

        
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });
});
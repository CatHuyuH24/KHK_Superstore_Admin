
function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById('product-image-preview').src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

document.addEventListener('DOMContentLoaded', function() {
    const addProductButton = document.getElementById('add-product-btn');
    const addProductFormContainer = document.getElementById('add-product-form');
    const cancelButton = document.getElementById('cancel-btn');
    const userId = document.getElementById('user-id').value;

    addProductButton.addEventListener('click', function() {
        toggleFormVisibility();
    });

    cancelButton.addEventListener('click', function() {
        toggleFormVisibility();
    });
    const addProductForm = document.querySelector("form[action='/api/products']");
    addProductForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        // for now, turn off
        // if(userId == null || userId == "") {
        //     window.location.href = "/login";
        //     return;
        // }

        // name, categoryId,
        // manufacturerId, price, imageURL, detail, discount, number, fps, status
        const name = document.getElementById('product-name').value;
        const categoryId = document.getElementById('product-category').value;
        const manufacturerId = document.getElementById('product-manufacturer').value;
        const price = document.getElementById('product-price').value;
        const imageURL = document.getElementById('product-image-preview').src;
        const detail = document.getElementById('product-detail').value;
        const discount = document.getElementById('product-discount').value;
        const number = document.getElementById('product-number').value;
        const fps = document.getElementById('product-fps').value;
        const status = document.getElementById('product-status').value;
        alert(imageURL);
        // Validate the form
        if (discount < 0 || discount >= 100) {
            alert("Discount must be between 0 and 99.");
            return;
        }

        if (number < 0) {
            alert("Number must be a positive number.");
            return;
        }

        if (fps < 0) {
            alert("FPS must be a non-negative number.");
            return;
        }

        if (price <= 0) {
            alert("Price must be a positive number.");
            return;
        }

        if(status == "Out of stock" && number > 0) {
            alert("Status is Out of stock but number is greater than 0.");
            return;
        }

        // Send the form data to the server
        try{
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    categoryId: categoryId,
                    manufacturerId: manufacturerId,
                    price: price,
                    imageURL: "https://placehold.co/600x400?text=Dummy+image", // will be updated later
                    detail: detail,
                    discount: discount,
                    number: number,
                    fps: fps,
                    status: status,
                }),
            });
            const result = await response.json();
            if(response.ok){
                alert(result.message + "\nThe new product will be displayed soon.");
                addProductFormContainer.classList.toggle('hidden');
                addProductForm.reset();
                
                // AJAX go to page 1
                // this line works because this file will be included in an .ejs file where changePage() is defined (another .js file)
                changePage(1); 
            } else {
                alert(result.message);
            }
        } catch(error){
            console.error("Error adding new product:", error);
            alert("Error adding product.\nPlease try again later.");
        }
    });

    function toggleFormVisibility() {
        addProductFormContainer.classList.toggle('hidden');
    }
});
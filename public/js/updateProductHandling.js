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
    const cancelButton = document.getElementById('cancel-btn');

    cancelButton.addEventListener('click', function() {
        window.history.back();
    });

    const updateProductForm = document.querySelector("form[method='POST']");
    updateProductForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const id = document.getElementById('product-id').value;
        const name = document.getElementById('product-name').value;
        const categoryId = document.getElementById('product-category').value;
        const manufacturerId = document.getElementById('product-manufacturer').value;
        const price = document.getElementById('product-price').value;
        const imageFileInput = document.getElementById('product-image');
        const detail = document.getElementById('product-detail').value;
        const discount = document.getElementById('product-discount').value;
        const number = document.getElementById('product-number').value;
        const fps = document.getElementById('product-fps').value;
        const status = document.getElementById('product-status').value;

        const method = document.getElementById('_method').value;

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

        if (status == "Out of stock" && number > 0) {
            alert("Status is Out of stock but number is greater than 0.");
            return;
        }

        const uploadStatus = document.getElementById('upload-status');
        // Send the form data to the server
        try {
            uploadStatus.classList.toggle('hidden');

            const formData = new FormData();

            formData.append("id", id);
            formData.append("name", name);
            formData.append("categoryId", categoryId);
            formData.append("manufacturerId", manufacturerId);
            formData.append("price", price);
            formData.append("imageFilePath", imageFileInput.files[0]);
            formData.append("detail", detail);
            formData.append("discount", discount);
            formData.append("number", number);
            formData.append("fps", fps);
            formData.append("status", status);

            const url = "/api/products/" + id + "?_method=" + method;
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message + "\nThe new information will be updated to display soon.");
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Error updating product.\nPlease try again later.");
        } finally {
            window.location.href = "/";
        }
    });
});
document.getElementById('avatar').addEventListener('change', previewAvatar);

document.getElementById('saveAvatarBtn').addEventListener('click', async () => {
  const uploadStatus = document.getElementById('uploadStatus');
  const formData = new FormData();
  const fileInput = document.getElementById('avatar');
  formData.append('avatar', fileInput.files[0]);

  // Hiển thị thông báo "Uploading..."
  uploadStatus.style.display = 'block';

  try {
    const response = await fetch('/profile/upload-avatar', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      document.getElementById('avatarPreview').src = result.imageUrl;
      alert('Avatar uploaded successfully!');
    } else {
      alert('Failed to upload avatar');
    }
  } catch (error) {
    console.error('Error uploading avatar:', error);
    alert('An error occurred while uploading the avatar.');
  } finally {
    // Ẩn thông báo "Uploading..." sau khi quá trình hoàn tất
    uploadStatus.style.display = 'none';
  }
});

document.getElementById("submitBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  let isValid = true;

  // Validate Name
  if (!name) {
    document.getElementById("nameError").classList.remove("hidden");
    isValid = false;
  } else {
    document.getElementById("nameError").classList.add("hidden");
  }

  // Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById("emailError").classList.remove("hidden");
    isValid = false;
  } else {
    document.getElementById("emailError").classList.add("hidden");
  }

  // Validate Phone
  const phoneRegex = /^[0-9]{10,15}$/;
  if (!phoneRegex.test(phone)) {
    document.getElementById("phoneError").classList.remove("hidden");
    isValid = false;
  } else {
    document.getElementById("phoneError").classList.add("hidden");
  }

  if (isValid) {
    try {
      const response = await fetch("/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone }),
      });

      if (response.ok) {
        const message = await response.text();
        alert(message);
        if (message.includes('Verification email sent')) {
          // Optionally, you can redirect the user to a different page or show a message
        } else {
          window.location.reload();
        }
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  }
});

function previewAvatar(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('avatarPreview').src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
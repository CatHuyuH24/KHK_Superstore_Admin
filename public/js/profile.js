const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
const API_KEY = 'YOUR_GOOGLE_API_KEY';
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
let pickerApiLoaded = false;
let oauthToken;

function onApiLoad() {
  gapi.load('auth', onAuthApiLoad);
  gapi.load('picker', onPickerApiLoad);
}

function onAuthApiLoad() {
  gapi.auth.authorize(
    {
      client_id: CLIENT_ID,
      scope: SCOPES,
      immediate: false,
    },
    handleAuthResult
  );
}

function onPickerApiLoad() {
  pickerApiLoaded = true;
}

function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    oauthToken = authResult.access_token;
    createPicker();
  }
}

function createPicker() {
  if (pickerApiLoaded && oauthToken) {
    const picker = new google.picker.PickerBuilder()
      .addView(google.picker.ViewId.DOCS_IMAGES)
      .setOAuthToken(oauthToken)
      .setDeveloperKey(API_KEY)
      .setCallback(pickerCallback)
      .build();
    picker.setVisible(true);
  }
}

function pickerCallback(data) {
  if (data.action === google.picker.Action.PICKED) {
    const fileId = data.docs[0].id;
    const fileUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
    document.getElementById('avatarPreview').src = fileUrl;
  }
}

document.getElementById('avatar').addEventListener('change', (event) => {
    event.preventDefault();
    onApiLoad();
  });

// document.getElementById('avatar').addEventListener('change', function (event) {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = function (e) {
//         document.getElementById('avatarPreview').src = e.target.result;
//       };
//       reader.readAsDataURL(file);
//     }
//   });

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

document.getElementById("editBtn").addEventListener("click", () => {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");

  name.innerHTML = `<input type="text" id="nameInput" class="w-full border-gray-300 rounded-lg p-2" value="${name.textContent.trim()}">`;
  email.innerHTML = `<input type="email" id="emailInput" class="w-full border-gray-300 rounded-lg p-2" value="${email.textContent.trim()}">`;
  phone.innerHTML = `<input type="text" id="phoneInput" class="w-full border-gray-300 rounded-lg p-2" value="${phone.textContent.trim()}">`;

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.className =
    "w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600";
  saveBtn.addEventListener("click", () => {
    // Save logic here
    alert("Information saved successfully!");
  });

  document.getElementById("editBtn").replaceWith(saveBtn);
});

function validateForm(event) {

    event.preventDefault();
  

    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[name="email"]');
    const phoneInput = document.querySelector('input[name="phonenumber"]');
    const addressInput = document.querySelector('input[name="address_line"]');
  
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const phoneError = document.getElementById("phonenumber-error");
    const addressError = document.getElementById("address-error");
  

    let isValid = true;
  

    if (!nameInput.value.trim()) {
      isValid = false;
      nameError.classList.remove("hidden");
    } else {
      nameError.classList.add("hidden");
    }

    if (!emailInput.value.trim() || !emailInput.validity.valid) {
      isValid = false;
      emailError.classList.remove("hidden");
    } else {
      emailError.classList.add("hidden");
    }
  
   
    if (!phoneInput.value.trim()) {
      isValid = false;
      phoneError.classList.remove("hidden");
    } else {
      phoneError.classList.add("hidden");
    }
  

    if (!addressInput.value.trim()) {
      isValid = false;
      addressError.classList.remove("hidden");
    } else {
      addressError.classList.add("hidden");
    }

    if (isValid) {
      event.target.submit();
    }
  }
  
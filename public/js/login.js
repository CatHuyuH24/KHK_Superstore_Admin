
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    axios.post('/login', { email, password })
        .then(response => {
            console.log("Response from server: ", response);
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                alert("Login successful!");
                window.location.href = '/mobilephones'; 
            } else {
                alert('Login failed: ' + response.data.message);
            }
        })
        .catch(err => {
            console.error("Login failed:", err);
        });
});
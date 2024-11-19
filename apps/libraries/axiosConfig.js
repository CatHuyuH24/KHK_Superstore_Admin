import axios from 'axios';
import AuthService from './authService';

axios.post('/login', { email, password })
    .then(response => {
        if (response.data.success) {
            AuthService.setLocalStorage(response.data);
            alert("Login successful!");
        }
    })
    .catch(err => console.error("Login failed:", err));


axios.interceptors.request.use(config => {
    const token = AuthService.getToken();
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default axios;

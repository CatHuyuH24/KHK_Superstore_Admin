const moment = require('moment');

class AuthService {
    static setLocalStorage(responseObj) {
      const expires = moment().add(responseObj.expiresIn);
      localStorage.setItem('token', responseObj.token);
      localStorage.setItem('expires', JSON.stringify(expires.valueOf()));
    }
  
    static getToken() {
        return localStorage.getItem('token');
    }
    
    static logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('expires');
    }
  
    static isLoggedIn() {
      return moment().isBefore(this.getExpiration());
    }
  
    static isLoggedOut() {
      return !this.isLoggedIn();
    }
  
    static getExpiration() {
      const expiration = localStorage.getItem("expires");
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
  }
  
module.exports = AuthService;
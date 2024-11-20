const logoutService = require('./logoutService');

function logout(req, res) {
    logoutService.logout(req, res); 
    return res.redirect('/login');
}

module.exports = {
    logout,
};
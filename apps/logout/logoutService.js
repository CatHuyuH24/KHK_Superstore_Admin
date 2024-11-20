const logoutService = {
    logout: (req,res) => {
      res.clearCookie("token",{
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
    });
    }
  };
  
  module.exports = logoutService;
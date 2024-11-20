const loginService = require('./loginService');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const validPassword=require('../Utils/passwordUtils').validPassword;
const utils=require('../Utils/jwtUtils');

async function handleLoginRequest(req, res, next) {
    try{
        const {email, password} = req.body;
        const user= await loginService.findUserByEmail(email);
        if(!user){
            message =
                "Incorrect Email or Password!.";
            return res.render("login", { message });
        }
        const isValid=await validPassword(password,user.password,user.salt);

        if(isValid){
            const tokenObject = utils.issueJWT(user);
            res.cookie('token', tokenObject.token, {
                httpOnly: false, 
                secure: true,   
                maxAge: 3600000 
            });
            
            return res.redirect('/mobilephones');
        }
        else {
            message =
                "Incorrect Email or Password!.";
            return res.render("login", { message });
        }
    }
    catch(err){
        return next(err);
    }
        
}

async function renderLoginPage(req, res) {
    try {
        message="";
        res.render('login');
    } catch (error) {
        console.error('Error handler login:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
            getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
        );
    }
}

module.exports = {
    handleLoginRequest,
    renderLoginPage,
};
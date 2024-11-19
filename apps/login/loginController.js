const { success } = require('concurrently/src/defaults');
const loginService = require('./loginService');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const validPassword=require('../libraries/passwordUtils').validPassword;
const utils=require('../libraries/passwordUtils');

async function handleLoginRequest(req, res, next) {
    try{
        const {email, password} = req.body;
        const user= await loginService.findUserByEmail(email);
        if(!user){
            alert("Incorrect email or password!");
             res.status(401).json({success:false});
        }
        const isValid=await validPassword(password,user.password,user.salt);

        if(isValid){
            const tokenObject = utils.issueJWT(user);
            res.status(200).json({success:true,user:user,token:tokenObject.token, expriresIn:tokenObject.expires})
        }
        else {
            //res.status(401).json({success:false,msg:"Incorrect email or password!"});
            alert("Incorrect email or password!");
            res.status(401).json({success:false});
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
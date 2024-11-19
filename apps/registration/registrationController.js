const registrationService = require('./registrationService');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const utils=require('../libraries/passwordUtils');
var crypto = require('crypto');


async function handleRegisterRequest(req, res) {
    try {
        const { name, email, password, passwordConfirm, agree } = req.body;
        if (!agree) {
            message = "Bạn cần đồng ý với các Điều khoản và Điều kiện.";
            return res.render("register", { message });
        }
    
        if (password !== passwordConfirm) {
            message = "Mật khẩu không khớp.";
            return res.render("register", { message });
        }
        
        const userCheck = await registrationService.findUserByEmail(email);
        if (userCheck) {
            message =
                "Email này đã được đăng ký. Vui lòng sử dụng email khác.";
            return res.render("register", { message });
        }

        var salt = crypto.randomBytes(16).toString('hex');
        crypto.pbkdf2(password, salt, 310000, 32, 'sha256', async function(err, hashedPassword) {
          if (err) { return next(err); }
            registrationService.createUser(name,email,hashedPassword.toString('hex'),salt);
            // const newUser = await registrationService.findUserByEmail(email); 
            // const jwt=utils.issueJWT(newUser);
            // res.json({success:true,user:newUser,token:jwt.token, expiresIn:jwt.expires})
        });
          
        // console.log("Đã ghi dữ liệu vào cơ sở dữ liệu.");
	    // message = "Đăng ký thành công!";

        // res.render("register", { message });

        res.redirect('login');

    } catch (error) {
        console.error('Error handler register:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
            getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
        );

    }
}

async function renderRegistrationPage(req, res) {
    try {
        message="";
        res.render('register');
    } catch (error) {
        console.error('Error handler register:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
            getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
        );
    }
}

module.exports = {
    handleRegisterRequest,
    renderRegistrationPage,
};
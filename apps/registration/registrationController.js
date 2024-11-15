const registrationService = require('./registrationService');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const salt = require('../utils/salt');
const md5 = require('../utils/hasher/md5');

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
        if (userCheck.rows.length > 0) {
            message =
                "Email này đã được đăng ký. Vui lòng sử dụng email khác.";
            return res.render("register", { message });
        }

        const Salt=salt.genSalt(50);
	    const Md5 = md5.newMd5Hash();
	    const hashedPassword = Md5.hash(password + Salt);

        registrationService.createUser(name,email,hashedPassword,Salt);

        console.log("Đã ghi dữ liệu vào cơ sở dữ liệu.");
	    message = "Đăng ký thành công!";

        res.render("register", { message });
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
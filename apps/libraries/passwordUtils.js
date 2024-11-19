const crypto=require('crypto');
const jsonwebtoken=require('jsonwebtoken');
const fs=require('fs');
const path=require('path');

const pathToKey = path.join(__dirname, '../..', 'id_rsa_priv.pem'); 
const pathToPubKey = path.join(__dirname, '../..', 'id_rsa_pub.pem'); 
const PRIV_KEY = fs.readFileSync(pathToKey,'utf8');
const PUB_KEY = fs.readFileSync(pathToPubKey,'utf8');

function genPassword(password) {
    return new Promise((resolve, reject) => {
        var salt = crypto.randomBytes(16);
        crypto.pbkdf2(password, salt, 310000, 32, 'sha256', (err, genHashedPassword) => {
            if (err) return reject(err);
            resolve({
                salt: salt.toString('hex'),
                hashedPassword: genHashedPassword.toString('hex')
            });
        });
    });
}

function validPassword(password, hashedPassword, salt) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 310000, 32, 'sha256', (err, hashVerify) => {
            if (err) return reject(err);
            resolve(hashedPassword === hashVerify.toString('hex'));
        });
    }); 
}

/**
 * 
 * @param {*} user 
 */

function issueJWT(user){
    const _id=user.id;
    const expiresIn='1d';
    const payload={
        sub:_id,
        iat: Date.now()
    };


    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {expiresIn: expiresIn,algorithm: 'RS256'});
    return {
        token: "Bearer "+ signedToken,
        expires: expiresIn
    }
}

function authMiddleware(req,res,next){
    const tokenParts=req.headers.authorization.split(' ');
    if(tokenParts[0]==='Bearer' && tokenParts[1].match(/\S+\.\S+\.\S+/)!=null){
        try{
            const verification = jsonwebtoken.verify(tokenParts[1], PUB_KEY,{algorithms: ['RS256']});
            req.jwt=verification;
            next();
        }catch(err){
            res.status(401).json({success:false,msg:"not authorized"});
        }
    };
}

module.exports.validPassword=validPassword;
module.exports.genPassword=genPassword;
module.exports.issueJWT=issueJWT;
module.exports.authMiddleware=authMiddleware;





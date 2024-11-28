const jsonwebtoken=require('jsonwebtoken');
const fs=require('fs');
const path=require('path');


const pathToKey = path.join(__dirname, '../..', 'id_rsa_priv.pem'); 
const pathToPubKey = path.join(__dirname, '../..', 'id_rsa_pub.pem'); 
const PRIV_KEY = fs.readFileSync(pathToKey,'utf8');
const PUB_KEY = fs.readFileSync(pathToPubKey,'utf8');


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
        token: signedToken,
        expires: expiresIn
    }
}

// function authMiddleware(options = {}) {
//     return (req, res, next) => {
//         try {
//             const token = req.cookies.token; 
//             if (token && token.match(/\S+\.\S+\.\S+/) !== null) {
//                 const verification = jsonwebtoken.verify(token, PUB_KEY, { algorithms: ['RS256'] });
//                 req.jwt = verification;
//                 return next();
//             }
            
//             return res.redirect('/login');
//         } catch (err) {
//             console.error("Authorization error:", err.message);
//             return res.redirect('/login');
//         }
//     };
// }

function authMiddleware(options = { session: true }) {
    return (req, res, next) => {
      if (options.session) {
        if (req.isAuthenticated()) {
          return next();
        } else {
          res.redirect('/login'); 
        }
      } else {
        return next();
      }
    };
  }

module.exports.issueJWT=issueJWT;
module.exports.authMiddleware=authMiddleware;

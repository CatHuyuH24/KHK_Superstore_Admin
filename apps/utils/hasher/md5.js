const crypto = require('crypto');

class Md5Hash {
    hash(data) {
        const hasher = crypto.createHash('md5');
        hasher.update(data);
        return hasher.digest('hex');
    }
}

function newMd5Hash() {
    return new Md5Hash();
}

module.exports = {newMd5Hash};
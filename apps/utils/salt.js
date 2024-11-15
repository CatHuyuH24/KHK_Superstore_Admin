const crypto = require('crypto');

const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function randSequence(n) {
    let result = '';
    for (let i = 0; i < n; i++) {
        const randomIndex = crypto.randomInt(letters.length);
        result += letters[randomIndex];
    }
    return result;
}

function genSalt(length = 50) {
    if (length <= 0) {
        length = 50;
    }
    return randSequence(length);
}
module.exports = { randSequence, genSalt };

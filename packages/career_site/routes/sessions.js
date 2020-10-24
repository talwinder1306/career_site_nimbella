const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 4;

function createSessionHash(plaintext) {
    return bcrypt.hashSync(plaintext, 8)
};

function createSessionKey (email) {
    const sessionKey = email + Date.now().toString()
    return createSessionHash(sessionKey)
}

module.exports = createSessionKey
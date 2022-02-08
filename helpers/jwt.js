const jwt = require('jsonwebtoken')

module.exports = {
    generateToken: (payload) => {
        const token = jwt.sign(payload, "123321", {
            expiresIn: 60 * 60 * 5
        })
        return token;
    },
    verifyToken: (token) => {
        const verify = jwt.verify(token, "123321")
        return verify
    }
}
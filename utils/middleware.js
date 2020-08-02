const jwt = require('jsonwebtoken')
const config = require('../config')
const userDB = require('../models/user')

async function verifyToken(req, res, next) {
    try {
        const authHeader =
            req.headers['x-access-token'] ||
            req.headers['authentication'] ||
            req.headers['authorization']
        if (!authHeader) {
            return res.status(403).json({ Message: 'No token provided.' })
        }

        const payload = jwt.verify(authHeader, config.credentials.jwtSecret)
        req.user = await userDB.findById(payload._id).lean()
        next()
    } catch (err) {
        console.error(err)
        if (err)
            return res
                .status(401)
                .json({ Message: 'Failed to authenticate token.' })
    }
}

module.exports = { verifyToken }

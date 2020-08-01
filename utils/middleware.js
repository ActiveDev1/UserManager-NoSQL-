const jwt = require('jsonwebtoken')

const config = require('../config')

function verifyToken(req, res, next) {
    const authHeader = req.headers['x-access-token']

    if (authHeader == null)
        return res.status(403).send({ Message: 'No token provided.' })

    jwt.verify(authHeader, config.credentials.jwtSecret, (err, user) => {
        console.log(err)
        if (err)
            return res
                .status(403)
                .send({ Message: 'Failed to authenticate token.' })
        req._id = user._id
        next()
    })
}

module.exports = {verifyToken}

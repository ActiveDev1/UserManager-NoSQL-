const express = require('express')
const app = express()
const users = require('../controllers/user.js')
const middlware = require('../utils/middleware.js')

app.post('/', users.create)

app.get('/', middlware.verifyToken, users.findAll)

app.get('/:userId', middlware.verifyToken , users.findOne)

app.put('/:userId', middlware.verifyToken , users.update)

app.delete('/:userId',middlware.verifyToken,  users.deleteUser)

app.delete('', middlware.verifyToken, users.deleteAll)

app.get('/newToken/:userId', users.getNewToken)

module.exports = app

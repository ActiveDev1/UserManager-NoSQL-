const express = require('express')
const app = express()
const users = require('../controllers/user.js')
const middlware = require('../utils/middleware.js')

app.post('/users', users.create) 

app.get('/users', middlware.verifyToken, users.findAll) 

app.get('/users/:userId', middlware.verifyToken , users.findOne) 

app.put('/users/:userId', middlware.verifyToken , users.update) 

app.delete('/users/:userId',middlware.verifyToken,  users.deleteUser)

app.delete('/users', middlware.verifyToken, users.deleteAll) 

app.get('/users/newToken/:userId', users.getNewToken) 

app.post('/login', users.login) 

module.exports = app

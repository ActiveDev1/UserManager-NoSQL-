const express = require('express')
const app = express()
const users = require('../controllers/user.js')

app.post('/', users.create)

app.get('/', users.findAll)

app.get('/:userId', users.findOne)

app.put('/:userId', users.update)

app.delete('/:userId', users.deleteUser)

app.delete('', users.deleteAll)

module.exports = app

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const User = new Schema({
    name: {
        type: String,
        min: [3, 'Name must have at last 3 character.'],
        required: [true, 'Name required'],
    },
    username: {
        type: String,
        min: [5, 'Username must have at last 5 character.'],
        required: [true, 'Name required'],
    },
    age: {
        type: Number,
        required: [true, 'Name required'],
    },
})

module.exports = mongoose.model('User', User)

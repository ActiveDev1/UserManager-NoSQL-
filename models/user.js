const mongoose = require('mongoose')
const conn = require('./db.js')

const Schema = mongoose.Schema

const User = new Schema(
    {
        name: {
            type: String,
            minlength: [3, 'Name must have at last 3 character.'],
            required: [true, 'Name required'],
        },
        username: {
            type: String,
            minlength: [5, 'Username must have at last 5 character.'],
            required: [true, 'username required'],
        },
        age: {
            type: Number,
            required: [true, 'age required'],
        },
    },
    { versionKey: false }
)


module.exports = mongoose.model('User', User)


// user.Schema.path('name').validate(function (value) {
//     return value
// }, 'Name must have at last 3 character.')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

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
            required: [true, 'Username required'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password required'],
        },
        age: {
            type: Number,
            required: [true, 'Age required'],
        },
    },
    { versionKey: false, validateBeforeSave: true }
)
User.plugin(uniqueValidator)

module.exports = mongoose.model('User', User)

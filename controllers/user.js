const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config')

async function create(req, res, next) {
    try {
        const user = new User(req.body)
        await user.save()
        const token = jwt.sign(
            { _id: user._id },
            config.credentials.jwtSecret,
            { expiresIn: 120 }
        )
        return res.json({
            Message: `User ${req.body.username} Created successfully`,
            Token: token,
        })
    } catch (err) {
        next(err)
    }
}
// async function create2(req, res, next) {
//     try {
//         const newUser = await User.create(req.body)
//         console.log(newUser._id)
//         return res.json({
//             Message: `User ${req.body.username} Created successfully`,
//         })
//     } catch (err) {
//         next(err)
//     }
// }

async function findAll(req, res, next) {
    try {
        await User.find(function (err, user) {
            if (err) return next(err)
            return res.json(user)
        })
    } catch (err) {
        next(err)
    }
}

async function findOne(req, res, next) {
    try {
        await User.find({ _id: req.params.userId }, function (err, user) {
            if (err) return res.send(err)
            return res.json(user)
        })
    } catch (err) {
        return next(err)
    }
}

async function update(req, res, next) {
    try {
        await User.findOneAndUpdate(
            { _id: req.params.userId },
            {
                $set: {
                    name: req.body.name,
                    username: req.body.username,
                    age: req.body.age,
                },
            },
            { runValidators: true },
            function (err, user) {
                if (err) return res.json({ Message: err.message })
                return res.json({
                    Message: `User by id = ${req.params.userId} updated.`,
                })
            }
        )
    } catch (err) {
        return next(err)
    }
}

async function deleteUser(req, res, next) {
    try {
        await User.findByIdAndDelete({ _id: req.params.userId }, function (
            err,
            user
        ) {
            if (err) return res.send(err)
            return res.json({
                Message: `User ${req.params.userId} deleted from database`,
            })
        })
    } catch (err) {
        return next(err)
    }
}

async function deleteAll(req, res, next) {
    try {
        await User.deleteMany({}, function (err, user) {
            if (err) return res.send(err)
            return res.json({ Message: 'All user deleted from database' })
        })
    } catch (err) {
        if (err) return next(err)
    }
}

async function getNewToken(req, res, next) {
    try {
        const token = jwt.sign(
            { _id: req.params.userId },
            config.credentials.jwtSecret,
            { expiresIn: 120 }
        )

        await User.find({ _id: req.params.userId }, function (err, user) {
            if (err) return res.send(err)
            return res.json({ Token: token })
        })
    } catch (err) {
        if (err) return next(err)
    }
}

module.exports = {
    create,
    findAll,
    findOne,
    update,
    deleteUser,
    deleteAll,
    getNewToken,
}

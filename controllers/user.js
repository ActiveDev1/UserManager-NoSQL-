const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config')
const bcrypt = require('bcryptjs')

async function create(req, res, next) {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 8)

        const user = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
            age: req.body.age,
        })

        if (String(req.body.password).length < 6)
            return res.json({
                Message: 'Password must have at last 6 character.',
            })
        else await user.save()
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
        await User.findById(req.params.userId, function (err, user) {
            if (err) return res.send(err)
            if (!user)
                return res.status(404).json({
                    Message: `User ${req.params.userId} not found`,
                })
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
                    password: req.body.password,
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
            if (err) return next(err)
            if (!user)
                return res.status(404).json({
                    Message: `User ${req.params.userId} not found`,
                })
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

        await User.findOne({ _id: req.params.userId }, function (err, user) {
            if (err) return res.send(err)
            if (!user)
                return res.status(404).json({ Message: 'User not found.' })

            return res.json({ Token: token })
        })
    } catch (err) {
        if (err) return next(err)
    }
}

async function login(req, res, next) {
    try {
        await User.findOne({ username: req.body.username }, function (
            err,
            user
        ) {
            if (!user)
                return res.status(404).json({
                    Message: `User ${req.params.username} not found`,
                })
            if (err) return next(err)
            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            )
            if (!passwordIsValid)
                return res
                    .status(401)
                    .send({ Message: 'Password is incorrect' })

            return res.json({ Message: 'login successfully.' })
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
    login,
}

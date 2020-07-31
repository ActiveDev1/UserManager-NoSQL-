const User = require('../models/user')
const mongoose = require('mongoose')

async function create(req, res) {
    const user = new User(req.body)

    try {
        await user.save(function (err) {
            if (err) return res.json({ Message: err.message })
            return res.json({
                Message: `User ${req.body.username} Created successfully`,
            })
        })
    } catch (err) {
        res.status(500).send({
            Message:
                err.message || 'Some error occurred while creating the User.',
        })
    }
}

async function findAll(req, res) {
    try {
        await User.find(function (err, user) {
            if (err) return next(err)
            return res.json(user)
        })
    } catch (err) {
        res.status(500).json({
            Message:
                err.message || 'Some error occurred while retrieving users.',
        })
    }
}

async function findOne(req, res) {
    try {
        await User.find({ _id: req.params.userId }, function (err, user) {
            if (err) return res.send(err)
            return res.json(user)
        })
    } catch (err) {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    Message: `Not found User with id ${req.params.userId}.`,
                })
            } else {
                res.status(500).send({
                    Message:
                        'Error retrieving User with id ' + req.params.userId,
                })
            }
        }
    }
}

async function update(req, res) {
    try {
        await User.findOneAndUpdate(
            {_id:req.params.userId},
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
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    Message: `Not found User with id ${req.params.userId}.`,
                })
            } else {
                res.status(500).send({
                    Message: 'Error updating User with id ' + req.params.userId,
                })
            }
        }
    }
}

async function deleteUser(req, res) {
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
        if (err) {
            if (err.kind === 'n ot_found') {
                res.status(404).send({
                    Message: `Not found User with id ${req.params.userId}.`,
                })
            } else {
                res.status(500).send({
                    Message:
                        'Could not delete User with id ' + req.params.userId,
                })
            }
        }
    }
}

async function deleteAll(req, res) {
    try {
        await User.deleteMany({}, function (err, user) {
            if (err) return res.send(err)
            return res.json({ Message: 'All user deleted from database' })
        })
    } catch (err) {
        if (err)
            res.status(500).send({
                Message:
                    err.message ||
                    'Some error occurred while removing all users.',
            })
    }
}

module.exports = {
    create,
    findAll,
    findOne,
    update,
    deleteUser,
    deleteAll,
}

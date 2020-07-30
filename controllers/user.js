const User = require('../models/user')

async function create(req, res) {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        })
    }

    const user = new User(req.body)

    try {
        await user.save(function (err) {
            if (err) return next(err)
            return res.json({
                Message: `User ${req.body.username} Created successfully`,
            })
        })
    } catch (err) {
        res.status(500).send({
            message:
                err.message || 'Some error occurred while creating the User.',
        })
    }
}

async function findAll(req, res) {
    try {
        await User.findAll(function (err, user) {
            if (err) return next(err)
            return res.json(user)
        })
    } catch (err) {
        res.status(500).json({
            message:
                err.message || 'Some error occurred while retrieving users.',
        })
    }
}

async function findOne(req, res) {
    try {
        await User.findById(req.params.id, function (err, user) {
            if (err) return next(err)
            return res.json(user)
        })
    } catch (err) {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`,
                })
            } else {
                res.status(500).send({
                    message:
                        'Error retrieving User with id ' + req.params.userId,
                })
            }
        }
    }
}

async function update(req, res) {
    try {
        await User.findByIdAndUpdate(
            req.params.id,
            new User(req.body),
            function (err, user) {
                if (err) return next(err)
                return res.json(user)
            }
        )
    } catch (err) {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`,
                })
            } else {
                res.status(500).send({
                    message: 'Error updating User with id ' + req.params.userId,
                })
            }
        }
    }
}

async function deleteUser(req, res) {
    try {
        await User.findByIdAndDelete(req.params.id, function (err, user) {
            if (err) return next(err)
            return res.json(user)
        })
    } catch (err) {
        if (err) {
            if (err.kind === 'n ot_found') {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`,
                })
            } else {
                res.status(500).send({
                    message:
                        'Could not delete User with id ' + req.params.userId,
                })
            }
        }
    }
}

async function deleteAll(req, res) {
    try {
        await User.deleteAll(function (err, user) {
            if (err) return next(err)
            return res.json(user)
        })
    } catch (err) {
        if (err)
            res.status(500).send({
                message:
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

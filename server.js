const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const config = require('./config')
require('./models/db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({ message: 'This is a simple of some api for manage user :)' })
})
app.use(require('./routes/user'))

app.use((err, req, res, next) => {
    if (err) {
        if (err.kind === 'not_found') {
            return res.status(404).send({
                Message: err.message || 'Some error occurred',
            })
        } else {
            return res.status(500).send({
                Message: err.message || 'Some error occurred',
            })
        }
    }
    return res.status(500).end()
})

app.listen(config.app.port, () =>
    console.log(`Server running on port ${config.app.port}`)
)

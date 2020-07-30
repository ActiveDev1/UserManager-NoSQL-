const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const config = require('./config')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({ message: 'This is a simple of some api for manage user :)' })
})
app.use('/users', require('./routes/user'))

app.listen(config.app.port, () =>
    console.log(`Server running on port ${config.app.port}`)
)
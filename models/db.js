const mongoose = require('mongoose')
const config = require('../config')

mongoose.connect(
    `mongodb://${config.db.mongodb.HOST}:${config.db.mongodb.PORT}/${config.db.mongodb.DB}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
        useFindAndModify:false
    },
    (error) => {
        if (error) throw error
        console.log('Successfully connected to the database.')
    }
)
mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

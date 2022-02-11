const mongoose = require('mongoose')
const config = require('../config')

const connectionString = config.env.MONGO_DB_CONNECTION_STRING

mongoose
    .connect(connectionString, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
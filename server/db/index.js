const mongoose = require('mongoose')
const config = require('../config')

const domain = config.env.MONGO_DB_DOMAIN
const port = config.env.MONGO_DB_PORT

mongoose
    .connect(`mongodb://${domain}:${port}/cinema`, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
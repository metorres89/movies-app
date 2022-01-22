const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')
const movieRouter = require('./routes/movie-router')
const app = express()
const config = require('./config')

const apiPort = config.env.API_PORT

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello Worlds!')
})

app.use('/api', movieRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
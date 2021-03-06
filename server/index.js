const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')
const movieRouter = require('./routes/movie-router')
const app = express()
const config = require('./config')
const awilix = require('awilix')

//dependencies injected by awilix
const MovieController = require('./controllers/movie-controller')
const MovieService = require('./services/movie-service')
const MovieRepository = require('./repositories/movie-repository')
const Movie = require('./models/movie-model')

//environment values
const apiPort = config.env.API_PORT

//container & DI setup

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY //default injection mode
})

container.register({ MovieModel: awilix.asValue(Movie) })
container.register({ MovieRepository: awilix.asClass(MovieRepository) })
container.register({ MovieService: awilix.asClass(MovieService) })
container.register({ MovieController: awilix.asClass(MovieController) })
container.register({ MovieRouter: awilix.asFunction(movieRouter)})

//express app and db setup
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello Worlds!')
})

app.use('/api/v2', (req, res) => { container.resolve('MovieRouter')(req, res) } )

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
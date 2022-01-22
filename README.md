# MERN sample app

## Intro

It's mainly based on: [MERN TUTORIAL](https://medium.com/swlh/how-to-create-your-first-mern-mongodb-express-js-react-js-and-node-js-stack-7e8b20463e66)

## Steps

### Initializing project

1. Create a folder to contain the entire project

        mkdir movies-app

2. Create an internal folder to contain just the backend for this project

        cd movies-app
        mkdir server

3. Create package.json file
    * NPM (Node package manager)
        
            cd server
            npm init -y

    * Yarn (another node package manager)
        
            cd server
            yarn init

4. Install dependencies required for this project
    * NPM

            npm install express body-parser cors mongoose nodemon
    * YARN

            yarn add express body-parser cors mongoose nodemon
    
    * Dependencies description:

        * **Express**: a server framework.
        * **Body Parser**: It's used to get the body of the network requests.
        * **Nodemon**: It restarts the server when it sees changes in the code (for a better dev experience).
        * **Cors**: package to manage Cross-Origin Resource Sharing (CORS) security mechanism.
        * **Mongoose**: an elegant MongoDB object modeling for node.js

5. Once the dependencies has been installed in the server folder you'll find a couple of files:

        cd server
        ls
        node_modules  package.json  package-lock.json

    * This means that this folder can be interpreted as a NodeJS proyect now.

6. Creating the firstt NodeJS file: create /movies-app/server/index.js

7. Test the server base file by running the following command:

        cd server
        node index.js

   * After running the command you should be able to see a message by browsing [here](http://localhost:3000/)

### Mongo DB Installation

1. Installing MongoDB: follow this [instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/) according to your OS. This installation is global and won't happen in your project directory.

   * **In my case I'm running Ubuntu Mate 20.04 LTS so I had to run these steps**
     * Import the public key used by hte package management system

           wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -

     * Create a list file for MongoDB

           echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list

     * Reload local package database

           sudo apt-get update

     * Install MongoDB packages

           sudo apt-get install -y mongodb-org

     * Directories: If you installed via the package manager, the data directory /var/lib/mongodb and the log directory /var/log/mongodb are created during the installation.
     * By default, MongoDB runs using the mongodb user account.
     * The official MongoDB package includes a configuration file (/etc/mongod.conf)



2. Init MongoDB : To run and manage your mongod process, you will be using your operating system's built-in init system.
   * To check which init system do you use use the following command
                
          ps --no-headers -o comm 1
   
   * My system uses systemmd (systemctl)

3. Start MongoDB

        sudo systemctl start mongod

4. Verify that MongoDB has started

        sudo systemctl status mongod

### Additional Mongo DB initialization Commands

1. Stop MongoDB

        sudo systemctl stop mongod

2. Restart MongoDB

        sudo systemctl restart mongod

   * You can follow the state of the process for errors or important messages by watching the output in the /var/log/mongodb/mongod.log file.
        
### Mongo commands
  * executes mongo db shell
      
        mongo

  * shows current db 
              
        db
  
  * list all existing dbs

        show dbs

  * switch to a different db if it doesn't exists it creates it.
      
        use  db_nanme

### Create a MongoDB instance for our sample project

1. Create cinema db (using MongoDB)

        mongo
        use cinema

2. Create a connection from our server using the Mongoose library. Create a new directory called DB inside server folder and a new index.js file inside.

```js
// code inside /server/db/index.js
const mongoose = require('mongoose')

mongoose
.connect('mongodb://127.0.0.1:27017/cinema', { useNewUrlParser: true })
.catch(e => {
        console.error('Connection error', e.message)
})

const db = mongoose.connection

module.exports = db
```

17. Edit /server/index.js
    

```js
// code inside /server/index.js
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
```

3. Execute server using nodemon:

        nodemon index.js


    * If you have any problems use the following command to install nodemon globally:

          sudo npm install -g --force nodemon

### Creating movie schema

1. Create /server/models/movie-model.js

```js
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movie = new Schema(
    {
        name: { type: String, required: true },
        time: { type: [String], required: true },
        rating: { type: Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('movies', Movie)
```

### Creating routes and connecting them with the controller

1. Create /server/routes/movie-router.js and /server/controllers/movie-ctrl.js

* /server/controllers/movie-ctrl.js
```js
const Movie = require('../models/movie-model')

createMovie = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a movie',
        })
    }

    const movie = new Movie(body)

    if (!movie) {
        return res.status(400).json({ success: false, error: err })
    }

    movie
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: movie._id,
                message: 'Movie created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Movie not created!',
            })
        })
}

updateMovie = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Movie.findOne({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Movie not found!',
            })
        }
        movie.name = body.name
        movie.time = body.time
        movie.rating = body.rating
        movie
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: movie._id,
                    message: 'Movie updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Movie not updated!',
                })
            })
    })
}

deleteMovie = async (req, res) => {
    await Movie.findOneAndDelete({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }

        return res.status(200).json({ success: true, data: movie })
    }).catch(err => console.log(err))
}

getMovieById = async (req, res) => {
    await Movie.findOne({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: movie })
    }).catch(err => console.log(err))
}

getMovies = async (req, res) => {
    await Movie.find({}, (err, movies) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!movies.length) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: movies })
    }).catch(err => console.log(err))
}

module.exports = {
    createMovie,
    updateMovie,
    deleteMovie,
    getMovies,
    getMovieById,
}
```

* /server/controllers/movie-ctrl.js
```js
const express = require('express')

const MovieCtrl = require('../controllers/movie-ctrl')

const router = express.Router()

router.post('/movie', MovieCtrl.createMovie)
router.put('/movie/:id', MovieCtrl.updateMovie)
router.delete('/movie/:id', MovieCtrl.deleteMovie)
router.get('/movie/:id', MovieCtrl.getMovieById)
router.get('/movies', MovieCtrl.getMovies)

module.exports = router
```

2. Add the router to our server/index.js file

```js
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const movieRouter = require('./routes/movie-router')

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', movieRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
```

### Testing api and MongoDB

1. Install Robo3T to inspect the MongoDB schema

        sudo snap install robo3t-snap

2. Install Postman to createt requests aiming to the running API

        sudo snap install postman

3. Invoke the endpoints

* GET http://localhost:3000/api/movies will list all movies
* GET http://localhost:3000/api/movie/61e364e2dbbfdf5c3c9ac02a will show the movie with id 61e364e2dbbfdf5c3c9ac02a
* POST http://localhost:3000/api/movie with the following request body will create a movie:
```JSON
{
    "name": "Avengers: Endgame",
    "time": ["12:00", "14:15", "16:00", "21:30", "23:00"],
    "rating": 8.8
}
```
* PUT http://localhost:3000/api/movie/61e364e2dbbfdf5c3c9ac02a with the following request body will update the previous movie:
```JSON
{
    "name": "Avengers: Endgame",
    "time": ["12:00", "14:15", "16:00", "21:30", "23:00"],
    "rating": 8.8
}
```
* DELETE http://localhost:3000/api/movie/61e364e2dbbfdf5c3c9ac02a will delete the movie and return it's data.

### Creating the fron-end with React

1. Execute the following command at the root /movies-app/

        npx create-react-app client

    * after this the client folder must have this sructure
      
            node_modules
            public
            src
            package-lock.json
            package.json
            README.md

2. Installing the dependencies required for the frontend. We’ll need: Axios, Bootstrap, StyledComponents, and React Table
   * Axios: It’s a promise-based library to make asynchronous calls to the API.
   * Bootstrap: It’s is an open-source toolkit and the most popular front-end component library where allows you for developing with HTML, CSS, and JS.
   * StyledComponents: It allows you to write actual CSS code to style your components.
   * React Ttable: It’s a lightweight, fast, and extendable data grid built for React.
   * React Router DOM: DOM bindings for React Routers.

            npm install styled-components react-table react-router-dom axios bootstrap --save

3. Create Folder structure and base files for the frontend:

        client/src/api/index.js
        client/src/app/index.js
        client/src/components/index.js
        client/src/pages/index.js
        client/src/style/index.js

4. Move the code contained in client/src/App.js to client/src/app/index.js

5. Add code to client/src/index.js

* Already had this code. It seems that is not necessary for this react version.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

ReactDOM.render(<App />, document.getElementById('root'))
```

6. Write the components of our project. Create the new files components/NavBar.jsx components/Logo.jsx components/Links.jsx

```jsx
import React, { Component } from 'react'
import styled from 'styled-components'

import logo from '../logo.svg'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``

class Logo extends Component {
    render() {
        return (
            <Wrapper href="https://sambarros.com">
                <img src={logo} width="50" height="50" alt="sambarros.com" />
            </Wrapper>
        )
    }
}

export default Logo
```

```jsx
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    My first MERN Application
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/movies/list" className="nav-link">
                                List Movies
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/movies/create" className="nav-link">
                                Create Movie
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links
```

```jsx
import React, { Component } from 'react'
import styled from 'styled-components'

import Logo from './Logo'
import Links from './Links'

const Container = styled.div.attrs({
    className: 'container',
})``

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-dark bg-dark',
})`
    margin-bottom: 20 px;
`

class NavBar extends Component {
    render() {
        return (
            <Container>
                <Nav>
                    <Logo />
                    <Links />
                </Nav>
            </Container>
        )
    }
}

export default NavBar
```

### Connecting rest api with the FE

1. We added javascript methods to call all the available endpoints in the API.

/client/src/api/index.js

```js
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertMovie = payload => api.post('/movie', payload)
export const getAllMovies = () => api.get('/movies')
export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
export const deleteMovieById = id => api.delete(`/movie/${id}`)
export const getMovieById = id => api.get(`/movie/${id}`)

const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById
}

export default apis
```

* this will make available all the methods inside apis when imported.

2. We create "page" components to show the appropriate UI for movie list, insert or update. We create the following files:

        /client/src/pages/MovieInsert.jsx
        /client/src/pages/MovieList.jsx
        /client/src/pages/MovieUpdate.jsx
        /client/src/pages/index.js

3. We added the previous components in the main app.js
```js
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NavBar } from '../components'
import { MovieList, MovieInsert, MovieUpdate } from '../pages'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
        <NavBar />
        <Routes>
          <Route path="/movies/list" element={<MovieList></MovieList>}/>
          <Route path="/movies/create" element={<MovieInsert></MovieInsert>}/>
          <Route path="/movies/update/:id" exact component={<MovieUpdate></MovieUpdate>}/> 
        </Routes>
    </Router>
  );
}

export default App;
```

* We use **Routes** instead of **Switch** because we are using a newer version of the React Routes dependency.


4. We created a view for the movie list in MovieList.jsx using React Table v7 Component (the tutorial was made using the v6). Some changes has been made to this component so we had to change a little the code presented in the tutorial. Basically the React Table v7 differs from the previous version because it doesn't assume any specific style or appearence. So currently it's rendering a basic HTML table that the user is responsible for customizing. More info [here](https://react-table.tanstack.com/docs/quick-start).

5. Now we have to add code in the MovieInsert.jsx and MovieUpdate.jsx in order to be able to use the insert and update endpoints of the api.

```jsx
import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class MovieInsert extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            rating: '',
            time: '',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputRating = async event => {
        const rating = event.target.validity.valid
            ? event.target.value
            : this.state.rating

        this.setState({ rating })
    }

    handleChangeInputTime = async event => {
        const time = event.target.value
        this.setState({ time })
    }

    handleAddMovie = async () => {
        const { name, rating, time } = this.state
        const arrayTime = time.split('/')
        const payload = { name, rating, time: arrayTime }

        await api.insertMovie(payload).then(res => {
            window.alert(`Movie inserted successfully`)
            this.setState({
                name: '',
                rating: '',
                time: '',
            })
        })
    }

    render() {
        
        const { name, rating, time } = this.state

        return (
            <Wrapper>
                <Title>Create a Movie</Title>
                <Label>Name: </Label>
                <InputText 
                    type="text" 
                    value={name} 
                    onChange={this.handleChangeInputName} 
                />

                <Label>Rating: </Label>
                <InputText
                    type="number"
                    step="0.1"
                    lang="en-US"
                    min="0"
                    max="10"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    value={rating}
                    onChange={this.handleChangeInputRating}
                />

                <Label>Time: </Label>
                <InputText
                    type="text"
                    value={time}
                    onChange={this.handleChangeInputTime}
                />

                <Button onClick={this.handleAddMovie}>Add Movie</Button>
                <CancelButton href={'/movies/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default MovieInsert
```

* I had to change MovieUpdate.jsx since React Route was updated and there is a new way to access the parameters from URL. The new method only support Component functions and doesn't work with Component class.

```jsx
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`
function MovieUpdate() {

    let params = useParams();
    
    const [id, setId] = useState(params.id)
    const [name, setName] = useState('')
    const [rating, setRating] = useState(0)
    const [time, setTime] = useState('')

    const handleChangeInputName = async event => {
        const name = event.target.value
        setName(name)
    }

    const handleChangeInputRating = async event => {
        const rating = event.target.validity.valid
            ? event.target.value
            : rating

        setRating(rating);
    }

    const handleChangeInputTime = async event => {
        const time = event.target.value
        setTime(time)
    }

    const handleUpdateMovie = async () => {
        const arrayTime = time.split('/')
        const payload = { name, rating, time: arrayTime }

        await api.updateMovieById(id, payload).then(res => {
            window.alert(`Movie updated successfully`)
        })
    }
    
    useEffect(() => {
        const movie = api.getMovieById(id).then(response => {
            setName(response.data.data.name)
            setRating(response.data.data.rating)
            setTime(response.data.data.time.join('/'))
        })
    }, [id]); // Solo se vuelve a ejecutar si currentMovie cambia

    return (
        <Wrapper>
            <Title>Update Movie</Title>

            <Label>Name: </Label>
            <InputText
                type="text"
                value={name}
                onChange={handleChangeInputName}
            />

            <Label>Rating: </Label>
            <InputText
                type="number"
                step="0.1"
                lang="en-US"
                min="0"
                max="10"
                pattern="[0-9]+([,\.][0-9]+)?"
                value={rating}
                onChange={handleChangeInputRating}
            />

            <Label>Time: </Label>
            <InputText
                type="text"
                value={time}
                onChange={handleChangeInputTime}
            />

            <Button onClick={handleUpdateMovie}>Update Movie</Button>
            <CancelButton href={'/movies/list'}>Cancel</CancelButton>
        </Wrapper>
    )
}



export default MovieUpdate

```

# Docker and Docker compose

1. Added Dockerfiles to /client/ and /sever/.
   1. Docker image generated from /client/ is building the React JS for release and using nginx to serve the files.
   2. Docker image generated from /server/ is installing all dependencies from the server project in a release manner and executing the /server/index.js with Node and with PRODUCTION environment name (this apparrently make some performance improvements in express js).
2. MongoDB is being executed using a default MongoDB image from dockerhub.
3. I had to add extra file /client/config/nginx/nginx.conf due to a React Router problem when serving static files from nginx server. The /update/ routes which include the ':id' argument had problems resolving. The conf file was taken from [here](https://www.barrydobson.com/post/react-router-nginx/)

```conf
server {
  listen       80;
  location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html =404;
  }
}
```

## nginx settings explained

[Source 1](https://docs.nginx.com/nginx/admin-guide/web-server/web-server/?_bt=573371260721&_bk=&_bm=&_bn=g&_bg=134448917200&gclid=CjwKCAiA0KmPBhBqEiwAJqKK49ly1RlQSMt2rwLuTL51ai9UVHMEgS4kpoRgSznk0Yyv_PBgXLlbphoCkEgQAvD_BwE)

[Source 2](https://docs.nginx.com/nginx/admin-guide/web-server/serving-static-content/)

* **listen**: tells the server to listen to port 80.
* **location /**: tells the server that every location starting with '/' (url root) will have the settings enclosed by {}.
* **root**: tells that every url location stating with '/' will be served a file from the static files folder which in this case is the default /usr/share/nginx/html.
* **index**: tells the server other possible names for the index file.
* **try_files**: tells the server to check whether the specified file or directory exists. First it starts with $uri then tries with the original uri with / at the end, then /index.html and if none of the previous exists then it returns 404.
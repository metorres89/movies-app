# MERN sample app

## Intro

It's mainly based on: [MERN TUTORIAL](https://medium.com/swlh/how-to-create-your-first-mern-mongodb-express-js-react-js-and-node-js-stack-7e8b20463e66)

## Steps

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

8. Installing MongoDB: follow this [instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/) according to your OS. This installation is global and won't happen in your project directory.

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



9. Init MongoDB : To run and manage your mongod process, you will be using your operating system's built-in init system.
   * To check which init system do you use use the following command
                
          ps --no-headers -o comm 1
   
   * My system uses systemmd (systemctl)

10. Start MongoDB

        sudo systemctl start mongod

11. Verify that MongoDB has started

        sudo systemctl status mongod

12. Stop MongoDB

        sudo systemctl stop mongod

13. Restart MongoDB

        sudo systemctl restart mongod

   * You can follow the state of the process for errors or important messages by watching the output in the /var/log/mongodb/mongod.log file.
        
14. mongo commands
    * executes mongo db shell
        
          mongo

    * shows current db 
                
          db
    
    * list all existing dbs
  
          show dbs

    * switch to a different db if it doesn't exists it creates it.
        
          use  db_nanme

15. Create cinema db

        mongo
        use cinema

16. Create a connection from our server using the Mongoose library. Create a new directory called DB inside server folder and a new index.js file inside.

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

18. Execute server using nodemon:

        nodemon index.js


    * If you have any problems use the following command to install nodemon globally:

          sudo npm install -g --force nodemon

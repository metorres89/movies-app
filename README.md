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



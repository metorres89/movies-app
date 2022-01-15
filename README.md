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
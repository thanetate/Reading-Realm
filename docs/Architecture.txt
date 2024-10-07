There are explained.txt files in each of the folders i created,
hopefully explaining the purpose of each of them. 



This is how i created the react app with our MERN stack:

Steps:
1. create folder client
2. create folder server

cd server
npm init -y
change main: index.js to server.js
touch server.js
npm i express
npm i nodemon -D
scripts: add "start": "node server", "dev": "nodemon server"

CLIENT ~
cd client
npm create vite@latest .

changed port from 517something to 3000 cause its easier to remember
vite.config.js -> exports -> added server : {port: 3000},

npm install for dependencies
npm run dev 


SERVER ~
server -> server.js :
const express = require('express')
const app = express()

app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]})
})

//port 5001
app.listen(5001, () => {console.log("Server started on port 5001")})
cd server
npm run dev

//you should see "Server started on port 5001"
//then go to browser and type localhost:5001/api and you should see the users data
http://localhost:5001/api

client -> App.js :
//go to package.json :
// under version add this -> "proxy": http://localhost:5001
//useState, useEffect is used to display the data from the api
go to browser and type localhost:3000 

// users.js - Defines the routes for user-related operations
// This file handles API routes related to users, including fetching all users and adding new users.
// It uses the User model to interact with the MongoDB database and perform CRUD operations.

const router = require("express").Router(); //import express router
let User = require("../models/user.model"); //import user model

//defines a GET route to fetch all users
router.route("/").get((req, res) => {
	User.find() //retrieves all users from the database
		.then((users) => res.json(users)) //sends the users as a JSON repsonse
		.catch((err) => res.status(400).json("Error: " + err)); //handles errors and sends 400 status with an error message
});

//defines a POST route to add a new user
router.route("/add").post((req, res) => {
	const username = req.body.username; //extracts username from the request body

	const newUser = new User({ username }); //initializes a new user with the properties of a user

	newUser
		.save() //save the new user to the database
		.then(() => res.json("User added!")) //sends success message when user is added
		.catch((err) => res.status(400).json("Error: " + err)); //handles errors and sends 400 status with an error message
});

//defines a GET request to get a specific user by their ID
router.route("/:id").get((req, res) => {
	User.findById(req.params.id) //retrieves user ID from the URL parameter then finds the user
		.then((users) => res.json(users)) //sends success message when user is added
		.catch((err) => res.status(400).json("Error: " + err)); //handles errors and sends 400 status with an error message
});

//defines a DELETE request to delete a user
router.route("/:id").delete((req, res) => {
	User.findByIdAndDelete(req.params.id) //retrieves user ID from the URL parameter then finds and deletes the user
		.then(() => res.json("User deleted!")) //sends success message when user is deleted
		.catch((err) => res.status(400).json("Error: " + err)); //handles errors and sends 400 status with an error message
});

//defines a POST request to update a user
router.route("/update/:id").post((req, res) => {
	User.findById(req.params.id) //retrieves user ID from the URL parameter then finds the user
		.then((users) => {
			//Once the user is found update their properties
			users.username = req.body.username;

			//Save updates to the database
			users
				.save()
				.then(() => res.json("User updated")) //sends success message when user is updated
				.catch((err) => res.status(400).json("Error: " + err)); //handles errors and sends 400 status with an error message
		})
		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router; //exports the router

/* this is your server.js file for these routes:
// server.js - Entry point of the backend application
// This file sets up the Express server, connects to MongoDB, handles routing, and listens on a specified port.
// It also loads environment variables from a .env file and sets up middleware for handling CORS and parsing JSON.
// The.env file contains the connection string for Mongodb atlas which allows connection to the database

//loads environment variables from .env
require('dotenv').config(); 

//importing dependencies
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const app = express()

//Middleware
app.use(cors()); //enables CORS
app.use(express.json()); //parses incoming JSON requests

//Connect to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection establlished successfully");
})

//Importing and setting us routes
const usersRouter = require('./routes/users'); //imports users route
app.use('/users', usersRouter); //uses users routes for any requests to '/users'

//Defines an API route
app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]}) //Sends back a JSON response with a list of users
})

//Define the server port and start the server (port 5001 or port specified in .env file)
const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
*/

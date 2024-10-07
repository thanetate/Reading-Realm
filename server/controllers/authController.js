/* 
Controllers ~
functions that are associated with each endpoint.
controllers response must be in JSON format.
*/

const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
	res.json("test is working");
};

//register endpoint
const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		//check username
		if (!name) {
			return res.json({
				error: "name is required",
			});
		}
		//check password
		if (!password || password.length < 6) {
			return res.json({
				error: "password is required and should be at least 6 characters long",
			});
		}
		//check email
		const exist = await User.findOne({ email });
		if (exist) {
			return res.json({
				error: "email is taken",
			});
		}
		// Hash the password
		const hashedPassword = await hashPassword(password);

		// Create a new user with the hashed password
		const user = new User({ name, email, password: hashedPassword });
		await user.save();
		return res.json(user);
	} catch (error) {
		console.log(error);
	}
};

//login endpoint
const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		//check if user exists
		const user = await User.findOne({ email });
		if (!user) {
			return res.json({
				error: "No user found",
			});
		}
		// Check if password matches
		const match = await comparePassword(password, user.password);
		if (match) {
			// Generate JWT token
			jwt.sign(
				{ email: user.email, id: user._id, name: user.name },
				process.env.JWT_SECRET,
				{ expiresIn: "1h" }, // Set token expiration time
				(err, token) => {
					if (err) {
						console.error("JWT Error:", err);
						return res.status(500).json({ error: "Token generation failed" });
					}
					// Set the cookie with the token
					res
						.cookie("token", token, {
							httpOnly: true, // Ensures the cookie is only accessible by the web server
							sameSite: "strict", // Helps prevent CSRF attacks
						})
						.json({ message: "Login successful", user });
				}
			);
		}
		if (!match) {
			res.json({
				error: "passwords do not match",
			});
		}
	} catch (error) {
		console.log(error);
	}
};

// Retrieves the user's profile information from the JWT stored in the cookie
const getProfile = (req, res) => {
	const { token } = req.cookies;
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
			if (err) throw err;
			res.json(user);
		});
	} else {
		res.json(null);
	}
};

module.exports = {
	test,
	registerUser,
	loginUser,
	getProfile,
};

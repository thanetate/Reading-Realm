// Controllers are basically functions associated with the endpoints

const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

//test function that sends a JSON response
const test = (req, res) => {
	res.json("test is working");
};

//register function for the register page
const registerUser = async (req, res) => {
	try {
		//destructure name, email, and password from the requests body
		const { name, email, password } = req.body;

		//check if username is given
		if (!name) {
			return res.json({
				error: "name is required",
			});
		}
		//checks password requirements
		if (!password || password.length < 6) {
			return res.json({
				error: "password is required and should be at least 6 characters long",
			});
		}
		//check if email already exists in the db
		const exist = await User.findOne({ email });
		if (exist) {
			return res.json({
				error: "email is taken",
			});
		}

		//hash the password
		const hashedPassword = await hashPassword(password);

		// create a new user with the hashed password not the one given
		const user = new User({ name, email, password: hashedPassword });
		
		//saves the user document to the database
		await user.save();
		
		//returns a response in JSON format
		return res.json(user);

	} catch (error) {
		console.log(error);
	}
};

//login function for the login page
const loginUser = async (req, res) => {
	try {
		//destructure name, email, and password from the requests body
		const { email, password } = req.body;

		//check if user already exists by email
		const user = await User.findOne({ email });

		//no user found
		if (!user) {
			return res.json({
				error: "No user found",
			});
		}

		//checks if passwords match 
		const match = await comparePassword(password, user.password);

		if (match) {
			//sign a jwt token to only the data needed for authentication
			jwt.sign(

				//secret key for singing in the token
				{ email: user.email, id: user._id, name: user.name },
				process.env.JWT_SECRET,
				
				//set token expiration
				{ expiresIn: "1h" },

				(err, token) => {
					if (err) {
						console.error("JWT Error:", err);
						return res.status(500).json({ error: "Token generation failed" });
					}
					//set the cookie with the token
					res
						.cookie("token", token, {
							httpOnly: true, //make sure cookie is only accessible through the web server
							sameSite: "strict", //security CSRF attacks
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

//logout function for logging out the user
const logoutUser = (req, res) => {
	//clear the token cookie
	res.clearCookie('token');
	//send a JSON response
	res.json({ message: "Logout Success" });
};

// TODO: ERROR with logout btn
// Function to get user's profile information
const getProfile = (req, res) => {
    //extract the token from the cookies
    const { token } = req.cookies;
    if (token) {
        //verifying token using the secret key
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, decoded) => {
            if (err) {
                console.error("JWT Error:", err);
                return res.status(500).json({ error: "Token verification failed" });
            }
            try {
                //fetch the user details from the database
                const user = await UserModel.findById(decoded.id).select("name email shortdesc longdesc avatar background firstname lastname");
                if (!user) {
                    return res.status(404).json({ error: "User not found" });
                }
				//good practices
                console.log("Fetched user data:", user);
                res.json(user);
            } catch (error) {
				//good practices
                console.error("Database Error:", error);
                res.status(500).json({ error: "Failed to fetch user profile" });
            }
        });
    } else {
		//good practices
        res.status(401).json({ error: "No token provided" });
    }
};

//function to update users profile information 
const updateUser = (req, res) => {
	//destructure the id and newdetails from the request body
	const {userId, newDetails} = req.body;

	//userModel is used to find the user by id and update other info
	UserModel.findByIdAndUpdate(userId, newDetails, {new: true})
	.then(updatedUser => {
		// If the update is successful, send a JSON response with the updated user information
		res.json({
		  success: true,
		  message: "User updated successfully",
		  user: updatedUser,
		});
	  })
	  .catch(error => {
		// If there's an error, send a 500 status code and a JSON response with the error message
		res.status(500).json({
		  success: false,
		  message: "Error updating user",
		  error: error.message,
		});
	  });
};

//export functions that are used in other parts of the app
module.exports = {
	test,
	registerUser,
	loginUser,
	logoutUser,
	getProfile,
	updateUser,
};

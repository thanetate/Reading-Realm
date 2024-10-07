//this is where we define types of what the user enters
const mongoose = require("mongoose");
const { schema } = mongoose;

const userSchema = new mongoose.Schema({
	name: String,
	email: {
		type: String,
		unique: true,
	},
	password: String,
});

const UserModel = mongoose.model("User", userSchema);

//using it in controllers
module.exports = UserModel;

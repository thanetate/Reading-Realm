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
	readingGoal: {
		totalBooks: { type: Number, default: 0 }, // The target number of books
		booksRead: { type: Number, default: 0 }, // Books already read
		startDate: { type: String, default: "" }, // Start date of the goal
		endDate: { type: String, default: "" } // End date of the goal
	},
	shortdesc: String,
	longdesc: String,
	avatar: String,
	background: String,
	firstname: String,
	lastname: String,
});

const UserModel = mongoose.model("User", userSchema);

//using it in controllers
module.exports = UserModel;

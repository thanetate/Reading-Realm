const express = require("express");
const router = express.Router();
const cors = require("cors");
//imports from controllers
const {
	test,
	registerUser,
	loginUser,
	logoutUser,
	getProfile,
} = require("../controllers/authController");

//middleware
router.use(
	cors({
		credentials: true,
		origin: "http://localhost:3000",
	})
);

router.get("/", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", getProfile);

module.exports = router;

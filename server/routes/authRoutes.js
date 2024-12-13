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
	updateUser,
} = require("../controllers/authController");

//middleware
router.use(
	cors({
		credentials: true,
		origin: "https://reading-realm.vercel.app",
	})
);

router.get("/", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", getProfile);
router.put("/updateUser", updateUser);

module.exports = router;

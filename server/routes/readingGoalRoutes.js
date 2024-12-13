const express = require('express');
const router = express.Router();
const cors = require("cors");

// Import from controller
const {
    setReadingGoal,
    updateReadingProgress,
    getReadingGoal,
} = require("../controllers/readingGoalController");

// Middleware
router.use(
    cors({
        credentials: true,
        origin: "https://reading-realm.vercel.app",
    })
);

// Routes for reading goals
router.post("/set", setReadingGoal);
router.put("/update", updateReadingProgress);
router.get("/get", getReadingGoal);

module.exports = router;
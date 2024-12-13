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
router.post("/reading-goals/set", setReadingGoal);
router.put("/reading-goals/update", updateReadingProgress);
router.get("/reading-goals/get", getReadingGoal);

module.exports = router;
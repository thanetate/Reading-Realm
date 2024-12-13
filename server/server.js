const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

// Import routes
const bookRoutes = require("./routes/books");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const readingGoalRoutes = require("./routes/readingGoalRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const groupRoutes = require("./routes/groupRoutes");
const chatRoutes = require("./routes/chatRoutes"); 

// Middleware
app.use(
  cors({
    origin: "https://reading-realm.vercel.app",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Connect to database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected :)"))
  .catch((err) => console.log("Database Not Connected :(", err));

// Routes
app.use("/", authRoutes);
app.use("/reading-goals", readingGoalRoutes);
app.use("/review", reviewRoutes);
app.use("/api/books", bookRoutes);
app.use("/api", postRoutes);
app.use("/api/groups", groupRoutes); 
app.use("/api/groups/chat", chatRoutes);

app.get("/", (req, res) => {
	  res.send("Hello World");
});

// Export the app
module.exports = app;

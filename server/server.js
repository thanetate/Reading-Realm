const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
//routes
const bookRoutes = require('./routes/books');
const postRoutes = require('./routes/postRoutes');

//database connect
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("Database Connected :)"))
	.catch((err) => console.log("Database Not Connected :(", err));

//middleware to parse json
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/readingGoalRoutes"));
app.use('/api/books', bookRoutes);
app.use('/api', postRoutes);

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

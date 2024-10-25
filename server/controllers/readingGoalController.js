/* 
Controllers ~
functions that are associated with each endpoint.
controllers response must be in JSON format.
*/

const User = require("../models/user");

// Set reading goals
const setReadingGoal = async (req, res) => {
    try {
        const { _id, totalBooks, startDate, endDate } = req.body;

        // Find user by id and update reading goal
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                'readingGoal.totalBooks': totalBooks,
                'readingGoal.startDate': startDate,
                'readingGoal.endDate': endDate,
                'readingGoal.booksRead': 0, //Reset progress
            },
            { new: true } // Return the updated document
        );

        res.status(200).json({ message: "Reading goal set successfully", readingGoal: updatedUser.readingGoal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateReadingProgress = async (req, res) => {
    try {
        const { _id, booksRead } = req.body;

        // Validate the incoming request
        if (!_id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        if (booksRead < 0) {
            return res.status(400).json({ error: "Books read cannot be negative" });
        }

        // Find the user to check the current readingGoal
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const totalBooks = user.readingGoal.totalBooks; // Get totalBooks from the current readingGoal

        // If booksRead equals totalBooks, reset the reading goal
        if (booksRead >= totalBooks) {
            user.readingGoal = {
                totalBooks: 0,
                startDate: "",
                endDate: "",
                booksRead: 0
            };
        } else {
            // Update only the booksRead field in the user's readingGoal
            user.readingGoal.booksRead = booksRead;
        }

        // Save the updated user
        await user.save();

        // Respond with success message and updated reading goal
        res.status(200).json({
            message: "Reading progress updated successfully",
            readingGoal: user.readingGoal
        });
    } catch (error) {
        console.error("Error updating reading progress:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get reading goal and progress
const getReadingGoal = async (req, res) => {
    try {
        const { _id } = req.query;

        if (!_id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Find the user's reading goal using their id
        const user = await User.findById(_id).select("readingGoal");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ readingGoal: user.readingGoal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error"});
    }
};

module.exports = {
    setReadingGoal,
    updateReadingProgress,
    getReadingGoal,
};
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: { type: String, default: "" },
    author: { type: String, default: "" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Link to user
    content: { type: String, default: "" },
    date: { type: Date, default: Date.now },
});

const PostModel = mongoose.model("Post", postSchema);
module.exports = PostModel;
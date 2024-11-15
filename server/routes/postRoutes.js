const express = require("express");
const router = express.Router();
const cors = require("cors");

//imports from controllers
const {
    createPost,
    getPostById,
    updatePost,
    deletePost,
    getUserPosts,
} = require("../controllers/postController");

//middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
);

//routes
router.post("/posts", createPost);
router.get('/posts/:userId', getUserPosts);
router.get("/posts/:userId/:postId", getPostById);
router.put("/posts", updatePost);
router.delete("/posts/:userId/:postId", deletePost);

module.exports = router;
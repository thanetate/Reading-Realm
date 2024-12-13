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
    getFeed,
} = require("../controllers/postController");

//middleware
router.use(
    cors({
        credentials: true,
        origin: "https://reading-realm.vercel.app",
    })
);

//routes
router.post("/posts", createPost);
router.get('/posts/:userId', getUserPosts);
router.get("/posts/:userId/:postId", getPostById);
router.put("/posts", updatePost);
router.delete("/posts/:userId/:postId", deletePost);
router.get("/posts", getFeed);

module.exports = router;
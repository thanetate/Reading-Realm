const User = require("../models/user");
const UserModel = require("../models/user");
const PostModel = require("../models/post");

//new Create Post
const createPost = async (req, res) => {
    console.log("createPost called");
    try {
        const { userId, author, title, content } = req.body;

        //create a new post in the PostSchema
        const newPost = await PostModel.create({
            title,
            author,
            userId, 
            content,
        });

        //update the userSchema with postId reference 
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $push: { posts: newPost._id } }, //push the new post ID to the user's posts array
            { new: true } //return the updated user document
        );

        //check if the user wasn't found
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        //respond with the newly created post
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//new get all posts from a user
const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params; //get from params not req body
        //find by userId
        const posts = await PostModel.find({ userId });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//new get one post by id
const getPostById = async (req, res) => {
	console.log("getPostById called");
	try {
		const { postId } = req.params; //get from params not req body

		//find the post by its postId
		const post = await PostModel.findById(postId);

		//if the post is not found, return a 404 error
		if (!post) {
			return res.status(404).json({ message: 'Post not found' });
		}

		//return the found post
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

//new update post
const updatePost = async (req, res) => {
	console.log("updatePost called");
	try {
		const { postId, title, author, content } = req.body;

		//find the post by postID
		const updatedPost = await PostModel.findByIdAndUpdate(
			postId,
			{ title, author, content },
			{ new: true } // Return the updated document
		);

		//if no post is found, return a 404 error
		if (!updatedPost) {
			return res.status(404).json({ message: 'Post not found' });
		}

		//return the updated post
		res.status(200).json(updatedPost);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

//new delete post by id
const deletePost = async (req, res) => {
	console.log("deletePost called");
	try {
		const { userId, postId } = req.params; //get from params not req body

		//find post by postId
		const post = await PostModel.findByIdAndDelete(postId);
		
		if (!post) {
			return res.status(404).json({ message: 'Post not found' });
		}

		//remove the post reference from the user's posts array
		const updatedUser = await UserModel.findByIdAndUpdate(
			userId,
			{ $pull: { posts: postId } },
			{ new: true }
		);

		//if no user is found
		if (!updatedUser) {
			return res.status(404).json({ message: 'User not found' });
		}

		//return a success message
		res.status(200).json({ message: 'Post deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getFeed = async (req, res) => {
	console.log("getFeed called");
	try {
		const { page = 1, limit = 10 } = req.query; //only extract 10 posts per page

		const posts = await PostModel.find()
			.sort({ createdAt: -1 }) //sort by newest first
			.skip((page - 1) * limit) //skip the first n posts
			.limit(Number(limit)); //limit the number of posts to 10

		const totalPosts = await PostModel.countDocuments(); //count the total number of posts

		// Return posts and metadata
		res.status(200).json({
			posts,
			totalPages: Math.ceil(totalPosts / limit),
			currentPage: Number(page),
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	createPost,
	getPostById,
	updatePost,
	deletePost,
    getUserPosts,
	getFeed,
};

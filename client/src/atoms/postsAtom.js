import { atom } from "jotai";
import axios from "axios";

//empty atom to store posts in array
export const postsAtom = atom([]);
// Atom to store a single post
export const singlePostAtom = atom(null);

//atom to fetch posts from database
export const fetchPostsAtom = atom(
	(get) => get(postsAtom),
	async (get, set, userId) => {
		// READ and WRITE atom
		try {
			const response = await axios.get(`/api/posts/${userId}`);
			const postsData = response.data;
			set(postsAtom, postsData);
			console.log("Posts Data from Atom:", postsData);
		} catch (error) {
			console.error("Error fetching poss", error);
		}
	}
);

// Atom to fetch a single post by ID
export const fetchPostByIdAtom = atom(
	(get) => get(singlePostAtom),
	async (get, set, { userId, postId }) => {
	  try {
		const response = await axios.get(`/api/posts/${userId}/${postId}`);
		const postData = response.data;
		set(singlePostAtom, postData);
		console.log("Single Post Data from Atom:", postData);
	  } catch (error) {
		console.error("Error fetching post", error);
	  }
	}
  );

//atom to create post
export const createPostAtom = atom(
	null,
	async (get, set, { userId, title, author, content }) => {
		// READ and WRITE atom
		try {
			const payload = { userId, title, author, content };
			const response = await axios.post("/api/posts", payload);
			const newPost = response.data;
			set(postsAtom, [...get(postsAtom), newPost]);
			console.log("New Post from Atom:", newPost);
		} catch (error) {
			console.error("Error creating post", error);
		}
	}
);

//atom to update a post
export const updatePostAtom = atom(
	null,
	async (get, set, { userId, postId, title, author, content }) => {
	  try {
		const payload = { userId, postId, title, author, content };
		const response = await axios.put(`/api/posts`, payload);
		const updatedPost = response.data;
		set(
		  postsAtom,
		  get(postsAtom).map((post) => (post._id === postId ? updatedPost : post))
		);
		console.log("Updated Post from Atom:", updatedPost);
	  } catch (error) {
		console.error("Error updating post", error);
	  }
	}
);

//atom to delete a post
export const deletePostAtom = atom(
	null,
	async (get, set, { userId, postId }) => {
		// READ and WRITE atom
		try {
			await axios.delete(`/api/posts/${userId}/${postId}`);
			set(
				postsAtom,
				get(postsAtom).filter((post) => post._id !== postId)
			);
			console.log("Deleted Post ID from Atom:", postId);
		} catch (error) {
			console.error("Error deleting post", error);
		}
	}
);

//atom to store feed
export const feedPostsAtom = atom([]);

//atom to get feed
export const fetchFeedPostsAtom = atom(
	get => get(feedPostsAtom),
	async (get, set, { page }) => {
		try {
			const response = await axios.get(`/api/posts?page=${page}&limit=10`); //limit to 10 posts per page
			const { posts } = response.data;
			
			console.log("Fetched posts from backend:", posts);
			
			//this solves the duplicate posts issue
			const existingPosts = get(feedPostsAtom);
			const uniquePosts = posts.filter(post => !existingPosts.some(existingPost => existingPost._id === post._id));
			
			set(feedPostsAtom, [...existingPosts, ...uniquePosts]); //append new unique posts to existing posts
		} catch (error) {
			console.error("Error fetching feed", error);
		}
	}
);

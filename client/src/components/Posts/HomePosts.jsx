import { useAtom } from "jotai";
import { testAtom } from "../../atoms/testAtom";
import { createPostAtom } from "../../atoms/postsAtom";
import { useState } from "react";
import Modal from "../IconModal/IconModal";
import { useEffect } from "react";
import { atom } from "jotai";
import { toast } from "react-hot-toast";

// Define an atom to store the username
const titleAtom = atom(localStorage.getItem("title") || "");
const authorAtom = atom(localStorage.getItem("author") || "");
const contentAtom = atom(localStorage.getItem("content") || "");

function HomePost() {
	//get user id and create a post atom
	const [user, setUser] = useAtom(testAtom);
	const [, createPost] = useAtom(createPostAtom);

	//local state to store the values
	const [title, setTitle] = useAtom(titleAtom);
	const [author, setAuthor] = useAtom(authorAtom);
	const [content, setContent] = useAtom(contentAtom);

	//update local storage whenever the username changes
	useEffect(() => {
		localStorage.setItem("title", title);
		localStorage.setItem("author", author);
		localStorage.setItem("content", content);
	}, [title, author, content]);

	//handle changes
	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};
	const handleAuthorChange = (e) => {
		setAuthor(e.target.value);
	};
	const handleContentChange = (e) => {
		setContent(e.target.value);
	};

	//handle submit button
	//todo : store post in posts cluster
	const handleSubmit = async (e) => {
		if (!content.trim()) {
			toast.error("Post content cannot be empty");
			return;
		}
		if (!title.trim()) {
			toast.error("Post title cannot be empty");
			return;
		}
		if (!author.trim()) {
			toast.error("Post author cannot be empty");
			return;
		}
		e.preventDefault();
		if (user && user._id) {
			try {
				const newPost = { title, author, content };
				await createPost({ userId: user._id, ...newPost });
				//update user posts in local storage
				const updatedUser = { ...user, posts: [...user.posts, newPost] };
				setUser(updatedUser);
				localStorage.setItem("user", JSON.stringify(updatedUser));
				//clear the form after submission
				setTitle("");
				setAuthor("");
				setContent("");
			} catch (error) {
				console.error("Error creating post:", error);
			}
		} else {
			console.error("User not found");
		}
	};

	//TODO; change useState to useAtom
	//modal
	const [showModal, setShowModal] = useState(false);
	const handleOpenModal = () => {
		setShowModal(true);
	};
	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<>
			<div className="home-card-post">
				<button className="importbook-btn" onClick={handleOpenModal}>
					Import a Book
				</button>
				<input
					type="text"
					className="posts-input"
					placeholder="What would you like to talk about?"
					value={content}
					onChange={handleContentChange}
				/>
				<button className="posts-btn" onClick={handleSubmit}>
					Post
				</button>
			</div>

			<Modal show={showModal} onClose={handleCloseModal}>
				<div className="importmodal-container">
					<input
						type="text"
						placeholder="What is the title?"
						value={title}
						onChange={handleTitleChange}
					/>
					<input
						type="text"
						placeholder="Who is the author?"
						value={author}
						onChange={handleAuthorChange}
					/>

					<div className="modal-btn-wrapper">
						<button className="modal-cancel-btn" onClick={handleCloseModal}>
							Cancel
						</button>
						<button className="modal-update-btn" onClick={handleCloseModal}>
							Update
						</button>
					</div>
				</div>
			</Modal>
		</>
	);
}

export default HomePost;

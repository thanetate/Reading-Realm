import "../Styles/Post.css";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { LoginWrapper } from "./LoginWrapper";
import Header from "../components/Header/Header";
import { deletePostAtom } from "../atoms/postsAtom";
import {
	updatePostAtom,
	fetchPostByIdAtom,
	singlePostAtom,
} from "../atoms/postsAtom";

function Post() {
	const { userId, postId } = useParams();
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [content, setContent] = useState("");
	const [, updatePost] = useAtom(updatePostAtom);
	const [, deletePost] = useAtom(deletePostAtom);
	const [, fetchPostById] = useAtom(fetchPostByIdAtom);
	const [singlePost] = useAtom(singlePostAtom);
	const navigate = useNavigate();

	const {user, localStorageUser} = useUser();

	console.log("User:", user);
	console.log("LS User:", localStorageUser);

	//fetch post data using userId and postId
	useEffect(() => {
		fetchPostById({ userId, postId });
	}, [userId, postId, fetchPostById]);

	//update state with fetched post data
	useEffect(() => {
		if (singlePost) {
			setTitle(singlePost.title);
			setAuthor(singlePost.author);
			setContent(singlePost.content);
		}
	}, [singlePost]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		await updatePost({ userId, postId, title, author, content });
		navigate("/dashboard");
	};

	const handleDelete = async (e) => {
        e.preventDefault();
        await deletePost({ userId, postId });
        navigate("/dashboard");
    };

	return (
		<>
			<LoginWrapper>
				<Header />
				<div className="user-section">
				<Link to="/dashboard">
					<button>
						<img src="/icons/user-line.svg" alt="user icon" />
					</button>
				</Link>
			</div>
				<div className="postPageContainer">
					<div className="postCardContainer">
						<form onSubmit={handleSubmit}>
							<input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Title"
								className="postTitle"
							/>
							<input
								type="text"
								value={author}
								onChange={(e) => setAuthor(e.target.value)}
								placeholder="Author"
								className="postAuthor"
							/>
							<textarea
								value={content}
								onChange={(e) => setContent(e.target.value)}
								placeholder="Content"
								className="postContent"
							/>
							<div className="buttonsContainer">
								<button type="submit" className="updatePost">
									Update Post
								</button>
								<button type="button" className="deletePost" onClick={handleDelete}>
									Delete Post
								</button>
							</div>
						</form>
					</div>
				</div>
			</LoginWrapper>
		</>
	);
}
export default Post;

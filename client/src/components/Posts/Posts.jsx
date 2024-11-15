import { useAtom } from "jotai";
import { fetchPostsAtom } from "../../atoms/postsAtom";
import { useEffect } from "react";
import { testAtom } from "../../atoms/testAtom";
import { useNavigate } from "react-router-dom";

export function Posts() {
	const [user] = useAtom(testAtom);
	const [posts, fetchPosts] = useAtom(fetchPostsAtom);
	const navigate = useNavigate();

	useEffect(() => {
		if (user && user._id) {
			fetchPosts(user._id);
		}
	}, [user, fetchPosts]);

	const handlePostClick = ( userId, postId) => {
        navigate(`/${userId}/${postId}`);
    };

	return (
		<>
			<div className="d-card-post">
				<div className="post-name">Posts</div>
				<div className="post-main-container">
					{posts.map((post, index) => (
						<div key={index} className="p-container">
							<div className="p-title">{post.title}</div>
							<div className="p-author">{post.author}</div>
							<div className="p-content">{post.content}</div>
							<div className="btns">
								<button className="edit-btn" onClick={() => handlePostClick(user._id,post._id)}>Edit Post</button>
								<button className="delete-btn" onClick={() => handlePostClick(user._id, post._id)}>Delete Post</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

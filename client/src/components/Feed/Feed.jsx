import { useAtom } from "jotai";
import { feedPostsAtom, fetchFeedPostsAtom } from "../../atoms/postsAtom";
import { useState, useEffect } from "react";
import "./Feed.css";

function Feed() {
	const [feedPosts, setFeedPosts] = useAtom(feedPostsAtom);
	const fetchFeedPosts = useAtom(fetchFeedPostsAtom)[1];
	const [page] = useState(1);

	useEffect(() => {
		//fetch posts on mount
		const fetchPosts = async () => {
			const fetchedPosts = await fetchFeedPosts({ page });
			//ensure the posts are sorted by created in descending order
			const sortedPosts = fetchedPosts.sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
			); //sort by newest first
			setFeedPosts(sortedPosts);
		};
		fetchPosts();
	}, [page, fetchFeedPosts, setFeedPosts]);

	const formatDate = (dateString) => {
		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		};
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	return (
		<>
			<div className="feed-card">
				<div className="feed-tabs">
					<h1>Explore</h1>
				</div>
				<div className="feedPostsContainer">
					{feedPosts.map((post, index) => (
						<div key={index} className="postContainer">
							<div className="postTitle">{post.title}</div>
							<div className="postAuthor">{post.author}</div>
							<div className="postContent">&quot;{post.content}&quot;</div>
							<div className="postDate">{formatDate(post.createdAt)}</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default Feed;

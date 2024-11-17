import { useAtom } from "jotai";
import { feedPostsAtom, fetchFeedPostsAtom } from "../../atoms/postsAtom";
import { useState, useEffect } from "react";

function Feed() {
	const [feedPosts, setFeedPosts] = useAtom(feedPostsAtom);
	const fetchFeedPosts = useAtom(fetchFeedPostsAtom)[1];
	const [page] = useState(1);

	useEffect(() => {
        //fetch posts on mount
        const fetchPosts = async () => {
            const fetchedPosts = await fetchFeedPosts({ page });
            //ensure the posts are sorted by created in descending order
            const sortedPosts = fetchedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); //sort by newest first
            setFeedPosts(sortedPosts);
        };
        fetchPosts();
    }, [page, fetchFeedPosts, setFeedPosts]);

	return (
		<>
			<div className="feed-card">
				<div className="feed-tabs">
                    {/* TODO: onclick event for the buttons */}
					<button className="feed-tab2">Explore</button>
				</div>
				<div className="feedPostsContainer">
					{feedPosts.map((post, index) => (
						<div key={index} className="postContainer">
							<div className="postTitle">{post.title}</div>
							<div className="postAuthor">{post.author}</div>
							<div className="postContent">{post.content}</div>
						</div>
					))}
				</div>
				<img src="./icons/right.svg" alt="Right Arrow" className="feed-down"/>
			</div>
		</>
	);
}

export default Feed;

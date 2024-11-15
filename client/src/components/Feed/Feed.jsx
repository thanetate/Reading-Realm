function Feed() {
	return (
		<>
			<div className="feed-card">
				<div className="feed-tabs">
                    {/* TODO: onclick event for the buttons */}
					<button className="feed-tab2">Explore</button>
				</div>
				<div className="feed-posts-container"></div>
				<img src="./icons/right.svg" alt="Right Arrow" className="feed-down"/>
			</div>
		</>
	);
}

export default Feed;

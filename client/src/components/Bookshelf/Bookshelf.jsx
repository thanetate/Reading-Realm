function Bookshelf() {
	return (
		<>
			<div className="bookshelf-card">
				<div className="bookshelf-title">Your Bookshelf</div>
				<div className="inner-card-container">
					<div className="inner-bookshelf-container">
						<div className="inner-card"></div>
						<div className="inner-title">The Hobbit</div>
						<div className="inner-author">By J.R.R. Tolkien</div>
					</div>
					<div className="inner-bookshelf-container">
						<div className="inner-card"></div>
						<div className="inner-title">The Hobbit</div>
						<div className="inner-author">By J.R.R. Tolkien</div>
					</div>
					<div className="inner-bookshelf-container">
						<div className="inner-card"></div>
						<div className="inner-title">The Hobbit</div>
						<div className="inner-author">By J.R.R. Tolkien</div>
					</div>
				</div>
				<img src="./icons/right.svg" alt="Right Arrow" className="rightarrow" />
			</div>
		</>
	);
}

export default Bookshelf;

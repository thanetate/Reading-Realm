import { useState, useEffect } from "react";

const UserRecommendations = () => {
	const [users, setUsers] = useState([]);

	// Simulate fetching user recommendations with profile pictures
	useEffect(() => {
		const recommendedUsers = [
			{
				id: 1,
				name: "John Doe",
				profilePic: "https://via.placeholder.com/150", 
				profileLink: "https://example.com/johndoe", 
			},
			{
				id: 2,
				name: "Jane Smith",
				profilePic: "https://via.placeholder.com/150",
				profileLink: "https://example.com/janesmith",
			},
			{
				id: 3,
				name: "Mike Johnson",
				profilePic: "https://via.placeholder.com/150",
				profileLink: "https://example.com/mikejohnson",
			},
			{
				id: 4,
				name: "Emily Davis",
				profilePic: "https://via.placeholder.com/150",
				profileLink: "https://example.com/emilydavis",
			},
			{
				id: 5,
				name: "Sarah Lee",
				profilePic: "https://via.placeholder.com/150",
				profileLink: "https://example.com/sarahlee",
			},
		];

		setUsers(recommendedUsers);
	}, []);

	return (
		<section className="recommendations-section">
			<h2>Connect with People</h2>
			<div className="book-cards">
				{users.map((user) => (
					<a
						href={user.profileLink}
						key={user.id}
						target="_blank"
						rel="noopener noreferrer"
						className="book-card"
					>
						<img
							src={user.profilePic}
							alt={user.name}
							className="book-image"
						/>{" "}
						{/* User's profile picture */}
						<h3>{user.name}</h3>
					</a>
				))}
			</div>
		</section>
	);
};

export default UserRecommendations;

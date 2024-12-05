import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import navigate from react-router-dom
import { useAtom } from "jotai"; // Import Jotai
import { testAtom } from "../../atoms/testAtom"; // Import testAtom for user data
import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

// BookCard component that displays a book's image, title, author, and publish date.
const BookCard = (props) => {
	const navigate = useNavigate();
	const [user] = useAtom(testAtom); // Retrieve user data from testAtom
	const bookId = props.id;
	const bookIMG = `https://books.google.com/books/publisher/content/images/frontcover/${encodeURIComponent(
		bookId
	)}?fife=w450-h650&source=gbs_api`;

	const [averageRating, setAverageRating] = useState(0);
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		console.log("User from testAtom in BookCard:", user); // Debug log for user data
		loadBookReviewRating();
	}, [user]);

	const handleClick = () => {
		// Navigate to the individual book page
		const volumeID = props.id;
		console.log("Navigating to book ID:", volumeID); // Debug log
		navigate(`/book/${volumeID}`, { state: { bookId: volumeID } });
	};

	const addToList = async (listName) => {
		console.log("addToList called with listName:", listName); // Debug log for listName
		if (!user || !user._id) {
			console.error("User ID is missing");
			toast.error("Please log in to add books to your list."); // If user is not logged in, populate toast error message
			return;
		}

		console.log("User ID being used:", user._id); // Debug log for user ID

		try {
			const response = await fetch(
				"http://localhost:8000/api/books/add-to-list",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						userId: user._id, // Use user._id from testAtom
						book: {
							id: props.id,
							title: props.title,
							author: props.author,
							image: props.image,
							publishDate: props.publishDate,
						},
						listName,
					}),
				}
			);

			console.log("Request sent to server"); // Debug log for request status

			const data = await response.json();
			console.log("Response from server:", data); // Debug log for response

			if (response.ok) {
				console.log(data.message); // Successful message
			} else {
				console.error("Failed to add book to list:", data.message); // Error message
			}
		} catch (error) {
			console.error("Failed to add book to list:", error); // Catch block for network or other errors
		}
		navigate("/reading-list"); // Navigate to the reading list page
	};

	const loadBookReviewRating = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/review/get-reviews?bookId=${bookId}`
				);
				if (response.status === 200) {
					setReviews(response.data.reviews);
					// calculate the average rating
					const totalRating = response.data.reviews.reduce(
						(acc, review) => acc + review.rating,
						0
					);
					let avgRating = (totalRating / response.data.reviews.length)
					avgRating = avgRating % 1 === 0 ? avgRating.toFixed(0) : avgRating.toFixed(1);
					console.log("Average rating:", avgRating);
					setAverageRating(avgRating);
				} else if (response.status === 404) {
					console.error("No reviews found for this book");
				} else {
					console.error("Failed to load reviews");
				}
			} catch (error) {
				console.error("Error fetching reviews:");
			}
	}

	return (
		<div>
			<div className="book-card-container">
				{/* Set book cover image */}
				<div onClick={handleClick} style={{ cursor: "pointer" }}>
					<div className="book-img">
						<img
							src={bookIMG || "./icons/NO_COVER.jpeg"}
							alt={props.title || "No title available"}
						/>
					</div>
				</div>{" "}
				{/* onclick Container */}
				{/* Title and author names */}
				<div className="book-desc">
					<div onClick={handleClick} style={{ cursor: "pointer" }}>
						<h2>{props.title}</h2>
						<h3>By {props.author}</h3>
					</div>{" "}
					{/* onclick Container */}
					{/* Added star icons for rating  
                        Look into the website Thane suggested for icons (for Kathryn) */}
					<div className="star-rating">
						<link
							rel="stylesheet"
							href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
						/>
						<div className="star-rating-container">
						{/* Dynamically display checked stars based on the average rating */}
						{Array.from({ length: 5 }, (_, index) => (
						
									<span
										key={index}
										className={`fa fa-star ${index < Math.floor(averageRating) ? "checked" : ""}`}
									></span>

								))}
								
								{/* Display the average rating and number of reviews */}
								<p className="search-book-ratings"
									style={{
										fontSize: "1rem",
										color: "black",
										margin: "0",
										fontWeight: "250",
										fontSize: "medium",
										marginLeft: "5px",
										
									}}>
									{averageRating} out of 5 stars ({reviews.length} review
									{reviews.length !== 1 ? "s" : ""})
								</p>
							</div>
					</div>
					{/* Drop down button for lists */}
					<div className="dropdown">
						<button
							className="dropdown-btn"
							onClick={() => addToList("favorites")}
							style={{ cursor: "pointer" }}
						>
							Add to Favorites
						</button>
						<div className="list-dropdown-content">
							<a
								href
								onClick={() => addToList("pastReads")}
								style={{ cursor: "pointer" }}
							>
								Past Reads
							</a>
							<a
								href
								onClick={() => addToList("currentlyReading")}
								style={{ cursor: "pointer" }}
							>
								Current Reads
							</a>
							<a
								href
								onClick={() => addToList("wantToRead")}
								style={{ cursor: "pointer" }}
							>
								Want to Read
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookCard;

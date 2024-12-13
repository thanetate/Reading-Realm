import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import "../Styles/IndividualBook.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAtom } from "jotai";
import { testAtom } from "../atoms/testAtom";
import axios from "axios";

function IndividualBook() {
	const location = useLocation();
	const { bookId } = location?.state || { bookId: "" }; // Get the bookId from state
	const API_KEY = import.meta.env.VITE_API_KEY;
	const [books, setBooks] = useState({});
	const navigate = useNavigate();
	const [reviews, setReviews] = useState([]);
	const [reviewText, setReviewText] = useState("");
	const [averageRating, setAverageRating] = useState(0);
	const [rating, setRating] = useState(5);
	const [user] = useAtom(testAtom); // Get the user from Jotai atom

	useEffect(() => {
		if (bookId) {
			loadIndividualBook();
			loadReviewsForBook();
			console.log("average rating", averageRating);
		} else {
			console.log("No book ID found");
		}
	}, [bookId]);

	const loadIndividualBook = () => {
		fetch(
			`https://www.googleapis.com/books/v1/volumes/${encodeURIComponent(
				bookId
			)}?key=${encodeURIComponent(API_KEY)}`
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				setBooks(data); // Update the book details
			})
			.catch((error) => console.error("Error fetching book details:", error));
	};

	const addToList = async (listName) => {
		if (!user || !user._id) {
			console.error("User ID is missing");
			toast.error("Please log in to add books to your list."); // If user is not logged in, populate toast error message
			return;
		}

		try {
			const response = await fetch(
				"https://reading-realm-backend.vercel.app/api/books/add-to-list",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						userId: user._id,
						book: {
							id: bookId,
							title: books.volumeInfo?.title,
							author: books.volumeInfo?.authors?.join(", "),
							image: books.volumeInfo?.imageLinks?.thumbnail || bookIMG,
							publishDate: books.volumeInfo?.publishedDate,
						},
						listName,
					}),
				}
			);

			const data = await response.json();
			if (response.ok) {
				console.log(data.message); // Successful message
			} else {
				console.error(data.message); // Error message
			}
		} catch (error) {
			console.error("Failed to add book to list:", error);
		}

		navigate("/reading-list");
	};

	const bookIMG = `https://books.google.com/books/publisher/content/images/frontcover/${encodeURIComponent(
		bookId
	)}?fife=w450-h650&source=gbs_api`;

	// Fetch reviews for the book from the backend
	const loadReviewsForBook = async () => {
		try {
			const response = await axios.get(
				`https://reading-realm-backend.vercel.app/review/get-reviews?bookId=${bookId}`
			);
			if (response.status === 200) {
				setReviews(response.data.reviews);
				// calculate the average rating
				const totalRating = response.data.reviews.reduce(
					(acc, review) => acc + review.rating,
					0
				);
				const avgRating = totalRating / response.data.reviews.length;
				setAverageRating(avgRating);
			} else {
				console.error("Failed to load reviews:", response.data.message);
			}
		} catch (error) {
			console.error("Error fetching reviews:", error);
		}
	};

	// Add a review to the book
	const submitReview = async () => {
		if (!user) {
			console.error("User is not logged in.");
			return;
		}

		try {
			const imageUrl = books.volumeInfo?.imageLinks?.thumbnail;
			const bookIdMatch = imageUrl ? imageUrl.match(/id=([^&]*)/) : null;
			const googleBookId = bookIdMatch ? bookIdMatch[1] : null;

			if (!googleBookId) {
				console.error(
					"Google Book ID could not be extracted from the image URL."
				);
				return;
			}

			const response = await axios.post(
				"https://reading-realm-backend.vercel.app/review/add-or-update",
				{
					bookId: books.id,
					userId: user._id,
					rating,
					review: reviewText,
					averageRating: averageRating,
				}
			);

			const data = await response.data;
			if (response.status === 200) {
				setAverageRating(response.data.averageRating);
				setReviews((prevReviews) => [...prevReviews, data.review]);
				setReviewText("");
				setRating(5);
			} else {
				console.error(data.message);
			}
		} catch (error) {
			console.error("Failed to submit review:", error);
		}
	};

	const deleteReview = async (reviewId) => {
		try {
			const response = await axios.delete(
				`https://reading-realm-backend.vercel.app/review/delete/${reviewId}`,
				{
					averageRating: averageRating,
				}
			);

			const data = await response.data;
			if (response.status === 200) {
				setAverageRating(response.data.averageRating);
				setReviews((prevReviews) =>
					prevReviews.filter((review) => review._id != reviewId)
				);
				console.log("Review deleted successfully");
			} else {
				console.error("Failed to delete review:", response.data.message);
			}
		} catch (error) {
			console.error("Failed to delete review:", error);
		}
	};

	// Return individual book details to UI
	// format later
	return (
		<>
		<Header />
		<div className="user-section">
				<Link to="/dashboard">
					<button>
						<img src="/icons/user-line.svg" alt="user icon" />
					</button>
				</Link>
			</div>
		<div className="individualBookContainer">

			{/* Load the individual book details */}
			<div className="individual-book-page">
				<div className="individual-book-column-containers">
					<div className="individual-book-share">
						<i
							className="fa fa-share-alt"
							onClick={() =>
								window.open(
									`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
										window.location.href
									)}`,
									"_blank"
								)
							}
							style={{ cursor: "pointer" }}
						></i>
					</div>

					{/* Left Column - book cover image, add to favorites button */}
					<div className="individual-book-left-column">
						<div className="individual-img-div">
							<img
								src={bookIMG || "./icons/NO_COVER.jpeg"}
								alt={books.volumeInfo?.title || "No title available"}
								className="individual-book-img"
							/>
						</div>
						{/* Drop down button for lists */}
						<div className="individual-book-dropdown">
							<button
								className="individual-book-addButton"
								onClick={() => addToList("favorites")}
								style={{ cursor: "pointer" }}
							>
								Add to Favorites
							</button>

							<div className="individual-book-list-dropdown-content">
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

						<div className="individual-book-price">
							{/* Buy for $ button */}
							<button
								className="individual-book-price-button"
								onClick={() => {
									const buyLink =
										books.saleInfo?.buyLink ||
										books.saleInfo?.retailPrice?.buyLink ||
										books.saleInfo?.listPrice?.buyLink ||
										books.saleInfo?.retailPrice?.amount ||
										books.saleInfo?.listPrice?.amount ||
										"";
									// if there is a buy link, open it in a new tab
									if (buyLink) {
										window.open(buyLink, "_blank");
									}
								}}
								style={{
									cursor: books.saleInfo?.buyLink ? "pointer" : "not-allowed",
									backgroundColor: books.saleInfo?.buyLink ? "" : "grey",
									color: books.saleInfo?.buyLink ? "" : "white",
									border: books.saleInfo?.buyLink ? "" : "none",
								}}
								disabled={
									!(
										books.saleInfo?.buyLink ||
										books.saleInfo?.retailPrice?.buyLink ||
										books.saleInfo?.listPrice?.buyLink
									)
								}
							>
								{books.saleInfo?.buyLink ||
								books.saleInfo?.retailPrice?.buyLink ||
								books.saleInfo?.listPrice?.buyLink
									? `Buy for $${books.saleInfo?.retailPrice?.amount || ""}`
									: "Unavailable"}
							</button>
						</div>
					</div>

					<div className="individual-book-object">
						{/* Right Column - title, author, description */}
						<div className="individual-book-right-column">
							<h1 className="individual-book-title">
								{books.volumeInfo?.title || "No Title Available"}
							</h1>
							<h2 className="individual-book-author">
								{books.volumeInfo?.authors[0] || "No Author Available"}
							</h2>
							{/* <p className="individual-book-desc">{books.volumeInfo?.description || "No description available"}</p> */}

							{/* Star rating */}
							<div className="individual-book-stars">
								<link
									rel="stylesheet"
									href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
								/>

								{/* Dynamically display checked stars based on the average rating */}
								{Array.from({ length: 5 }, (_, index) => (
									<span
										key={index}
										className={`fa fa-star ${
											index < Math.floor(averageRating) ? "checked" : ""
										}`}
									></span>
								))}

								{/* Display the average rating and number of reviews */}
								<p className="individual-book-rating-desc">
									{averageRating} out of 5 stars ({reviews.length} review
									{reviews.length !== 1 ? "s" : ""})
								</p>
							</div>

							{/* Not the safest method, but it works for rn */}
							<div
								className="individual-book-desc"
								style={{
									marginTop: '-25px',
									marginBottom: '40px',
									marginTop: '15px',
									lineHeight: '1.5',
								}}
								dangerouslySetInnerHTML={{
									__html:
										books.volumeInfo?.description || "No Description Available",
								}}
							/>

							<hr></hr>
							<h1 className="individual-book-ratings-title">
								Leave Your Own Review
							</h1>
							<div className="submit-review-section">
								<textarea
									value={reviewText}
									onChange={(e) => setReviewText(e.target.value)}
									placeholder="Write your review here"
								></textarea>
								<input
									type="number"
									min="1"
									max="5"
									value={rating}
									onChange={(e) => setRating(parseInt(e.target.value))}
									placeholder="Rating (1-5)"
								/>
							</div>
							<button onClick={submitReview} className="submitReview">
								Submit Review
							</button>
							{/* Ratings and revivews section */}
							<div className="individual-book-ratings-container">
								<div className="reviewCluster">
									{reviews.length > 0 ? (
										reviews.map((review, index) => (
											<div key={index} className="review-item">
												<p>
													<strong>Rating:</strong> {review.rating} / 5
												</p>
												<p>
													<strong>Review:</strong> {review.review}
												</p>
												{/* Add delete button */}
												<button className="deleteReview" onClick={() => deleteReview(review._id)}>
													Delete Review
												</button>
											</div>
										))
									) : (
										<p>No reviews yet. Be the first to submit one!</p>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</>
	);
}

export default IndividualBook;

import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { testAtom } from "../atoms/testAtom";
import { Link } from "react-router-dom";
import "../Styles/ReadingList.css";
import Header from "../components/Header/Header";

function ReadingList() {
	const [activeList, setActiveList] = useState("currentlyReading");
	const [searchQuery, setSearchQuery] = useState("");
	const [books, setBooks] = useState([]);
	const [user] = useAtom(testAtom); // Get the user data from testAtom
	const API_KEY = import.meta.env.VITE_API_KEY;

	console.log("User from testAtom:", user);

	// Fetch books from the backend based on the active list and userId
	useEffect(() => {
		const fetchBooks = async () => {
			if (!user || !user._id) {
				console.warn("User ID is missing. Fetch aborted.");
				return;
			}

			try {
				const url = `http://localhost:8000/api/books/list/${user._id}/${activeList}`;
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error("Failed to fetch books");
				}
				const data = await response.json();
				setBooks(data);
			} catch (error) {
				console.error("Error fetching books:", error);
			}
		};

		fetchBooks();
	}, [activeList, user]);

	// Function to delete a book
	const deleteBook = async (bookId) => {
		if (!user || !user._id) {
			console.error("User ID is missing. Delete aborted.");
			return;
		}

		try {
			const response = await fetch(
				`http://localhost:8000/api/books/${user._id}/${bookId}`,
				{
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
				}
			);

			if (response.ok) {
				console.log("Book deleted successfully");
				setBooks(books.filter((book) => book._id !== bookId));
			} else {
				console.error("Failed to delete book");
			}
		} catch (error) {
			console.error("Error deleting book:", error);
		}
	};

	// Filter books based on the search query
	const filterBooks = (books) => {
		return books.filter((book) =>
			book.title.toLowerCase().includes(searchQuery.toLowerCase())
		);
	};

	const updatePagesRead = async (bookId, pagesRead) => {
		if (!user || !user._id) {
			console.error("User ID is missing");
			return;
		}

		try {
			const response = await fetch(
				`http://localhost:8000/api/books/update-pages-read/${user._id}/${bookId}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ pagesRead }),
				}
			);

			if (response.ok) {
				setBooks((prevBooks) =>
					prevBooks.map((book) =>
						book._id === bookId ? { ...book, pagesRead } : book
					)
				);
			} else {
				console.error("Failed to update pages read");
			}
		} catch (error) {
			console.error("Failed to update pages read:", error);
		}
	};

	const fetchTotalPages = async (imageUrl) => {
		try {
			const bookIdMatch = imageUrl.match(/id=([^&]*)/);
			const bookId = bookIdMatch ? bookIdMatch[1] : null;

			if (!bookId) {
				console.warn("No book ID found in the image URL");
				return null;
			}

			const response = await fetch(
				`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${API_KEY}`
			);

			if (!response.ok) {
				throw new Error("Failed to fetch book details");
			}

			const data = await response.json();
			return data.volumeInfo.pageCount || null;
		} catch (error) {
			console.error("Error fetching total pages:", error);
			return null;
		}
	};

	const calculateProgress = (pagesRead, totalPages) => {
		return totalPages ? Math.floor((pagesRead / totalPages) * 100) : 0;
	};

	return (
		<div className="readingListBackground">
			<Header />

			<div className="user-section">
				<Link to="/dashboard">
					<button>
						<img src="/icons/user-line.svg" alt="user icon" />
					</button>
				</Link>
			</div>
			<div className="readingListCardContainer">
				<div className="reading-list-container">
					<div className="readingListLeftCard">
						<div className="leftCardTitle">Reading List</div>
						<div className="search-bar">
							<img src="/icons/red-search.svg" alt="search icon" />
							<input
								type="text"
								placeholder="Search for a book inside of your list..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
						<button
							className={activeList === "currentlyReading" ? "active" : ""}
							onClick={() => setActiveList("currentlyReading")}
						>
							Currently Reading
						</button>
						<button
							className={activeList === "wantToRead" ? "active" : ""}
							onClick={() => setActiveList("wantToRead")}
						>
							Want to Read
						</button>
						<button
							className={activeList === "pastReads" ? "active" : ""}
							onClick={() => setActiveList("pastReads")}
						>
							Past Reads
						</button>
						<button
							className={activeList === "favorites" ? "active" : ""}
							onClick={() => setActiveList("favorites")}
						>
							Favorites
						</button>
					</div>

					<div className="readingListRightCard">
						<h1>
							{activeList === "currentlyReading"
								? "Currently Reading"
								: activeList === "wantToRead"
								? "Want to Read"
								: activeList === "pastReads"
								? "Past Reads"
								: "Favorites"}
						</h1>
						{filterBooks(books).length === 0 ? (
							<p className="noBooksFound">No books found</p>
						) : (
							filterBooks(books).map((book) => (
								<div key={book._id} className="book-item">
									<img src={book.image} alt={book.title} />
									<div className="book-item-desc">
										<h3>{book.title}</h3>
										<div className="bookAuthor">By: {book.author}</div>
										{activeList === "currentlyReading" && (
											<div className="progress-container">
												<input
													type="number"
													placeholder="Pages Read..."
													value={book.pagesRead || ""}
													onChange={(e) =>
														updatePagesRead(
															book._id,
															parseInt(e.target.value, 10) || 0
														)
													}
												/>
												<button
													onClick={async () => {
														const totalPages = await fetchTotalPages(
															book.image
														);
														setBooks((prevBooks) =>
															prevBooks.map((b) =>
																b._id === book._id ? { ...b, totalPages } : b
															)
														);
													}}
												>
													Save
												</button>
												<div className="pages-info">
													<p>Pages Read: {book.pagesRead || 0}</p>
												</div>
												<div className="progress-bar">
													<div
														className="progress"
														style={{
															width: `${calculateProgress(
																book.pagesRead,
																book.totalPages || 0
															)}%`,
														}}
													></div>
												</div>
												<p>
													{calculateProgress(
														book.pagesRead,
														book.totalPages || 0
													)}
													% complete
												</p>
											</div>
										)}
                                        <button className="deleteBook" onClick={() => deleteBook(book._id)}>Delete</button>
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ReadingList;

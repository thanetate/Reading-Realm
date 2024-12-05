// import Books from '../Book/Book';
import PopularCard from "./PopularCard";
import { useState } from "react";
import { useEffect } from "react";
import "./Popular.css";

const Popular = () => {
	const API_KEY = import.meta.env.VITE_API_KEY; // API key
	const search = "bestselling fiction";
	const limit = 10;
	const offset = 0;
	const order = "newest";

	const [books, setBooks] = useState([]); // State for books

	// Fetch books for what's popular column - once so it doesn't keep calling the api
	useEffect(() => {
		fetchBooks();
	}, []);

	const fetchBooks = () => {
		fetch(
			`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
				search
			)}&orderBy=${encodeURIComponent(order)}&key=${encodeURIComponent(
				API_KEY
			)}&startIndex=${encodeURIComponent(
				offset
			)}&maxResults=${encodeURIComponent(limit)}`
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				setBooks([]); // Clear previous books
				const newBooks = data.items || []; // Default to empty array if no items
				const seenTitles = new Set(); // Track titles to filter duplicates

				// filter out the duplicates, and if there are duplicates, replace them with new books
				// not a perfect fix, doesn't always call the same amount of books
				const filteredBooks = [];
				newBooks.forEach((book) => {
					const title = book.volumeInfo?.title || "";
					if (!seenTitles.has(title)) {
						seenTitles.add(title);
						filteredBooks.push(book);
					} else {
						// call a new book to replace duplicate
						// console.log(filteredBooks.length);
						if (filteredBooks.length <= 5) {
							const replacement = newBooks.find(
								(book) => !seenTitles.has(book.volumeInfo?.title || "")
							);
							if (replacement && filteredBooks.legnth <= 5) {
								seenTitles.add(replacement.volumeInfo?.title || "");
								filteredBooks.push(replacement);
							}
						}
					}
				});
				setBooks(filteredBooks);
				console.log(filteredBooks);
			})
			.catch((error) => console.error("Error: ", error)); // Catch any errors
	};

	return (
		<div className="popular-container">
			<div className="popular-card">
				<h1>What`s Popular</h1>
				<div className="inner-popular-card-container">
					<div className="inner-popular-container">
						<ul>
							{books.map((book, index) => (
								<li key={index}>
									<PopularCard
										key={index}
										id={book.id}
										image={
											book.volumeInfo.imageLinks.thumbnail ||
											"./icons/NO_COVER.jpeg"
										}
										title={book.volumeInfo.title || "No title available"}
										author={
											book.volumeInfo?.authors[0] || "No author available"
										}
										publishDate={book.volumeInfo.publishedDate}
									/>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Popular;

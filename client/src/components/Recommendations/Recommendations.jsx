import { useState, useEffect } from "react";

const Recommendations = () => {
	const [books, setBooks] = useState([]);

	// Simulate fetching book recommendations with images
	useEffect(() => {
		const recommendedBooks = [
			{
				id: 1,
				title: "1984",
				author: "George Orwell",
				imageUrl: "https://via.placeholder.com/150",
				link: "https://example.com/1984", // Example link for the book
			},
			{
				id: 2,
				title: "To Kill a Mockingbird",
				author: "Harper Lee",
				imageUrl: "https://via.placeholder.com/150",
				link: "https://example.com/tokillamockingbird",
			},
			{
				id: 3,
				title: "The Catcher in the Rye",
				author: "J.D. Salinger",
				imageUrl: "https://via.placeholder.com/150",
				link: "https://example.com/thecatcherintherye",
			},
			{
				id: 4,
				title: "Pride and Prejudice",
				author: "Jane Austen",
				imageUrl: "https://via.placeholder.com/150",
				link: "https://example.com/prideandprejudice",
			},
			{
				id: 5,
				title: "Moby Dick",
				author: "Herman Melville",
				imageUrl: "https://via.placeholder.com/150",
				link: "https://example.com/mobydick",
			},
		];

		setBooks(recommendedBooks);
	}, []);

	return (
		<section className="recommendations-section">
			<h2>Recommendations</h2>
			<div className="book-cards">
				{books.map((book) => (
					<a
						href={book.link}
						key={book.id}
						target="_blank"
						rel="noopener noreferrer"
						className="book-card"
					>
						<img src={book.imageUrl} alt={book.title} className="book-image" />{" "}
						{/* Book image */}
						<h3>{book.title}</h3>
						<p>{book.author}</p>
					</a>
				))}
			</div>
		</section>
	);
};

export default Recommendations;

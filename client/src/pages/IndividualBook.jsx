import React from 'react';
import Header from '../components/Header/Header';
import "../styles/IndividualBook.css";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import BookCard from '../components/Book/BookCard';

function IndividualBook() {
	const location = useLocation(); // Get location object from react-router-dom
	const { bookId } = location?.state || { bookId: '' }; // Get bookID from state
	const API_KEY = import.meta.env.VITE_API_KEY; // API key
	const [books, setBooks] = useState([]); // State for books

	useEffect(() => {
		if(bookId) {
			loadIndividualBook();
		} else {
			console.log('No book ID found');
		}
		
	}, [bookId]); // Fetch books whenever bookId changes

	// Fetch individual book details
	const loadIndividualBook = () => {
        
		// Fetch data from Google Books API
		fetch(`https://www.googleapis.com/books/v1/volumes/${encodeURIComponent(bookId)}?key=${encodeURIComponent(API_KEY)}`)
	
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
	
			.then(data => {
				console.log(data); //Debug statement

				setBooks(data);

			})
			.catch(error => console.error('Error: ', error)); // Catch any errors
		};

// Return individual book details to UI
// format later
  return (
		<>
			<Header />
			<div>
				<h1> Hi</h1>
				{books ? (
                    <div className="individual-book-card--page">
						<img src={books.volumeInfo?.imageLinks?.thumbnail || "./icons/NO_COVER.jpeg"} 
							alt={books.volumeInfo?.title || "No title available"} />
						<h1>{books.volumeInfo?.title || "No title available"}</h1>
						<h2>by {books.volumeInfo?.authors?.join(", ") || "No author available"}</h2>
						<p>{books.volumeInfo?.description || "No description available"}</p>
					</div>
                ) : (
                    <p>Loading book details...</p> // Loading state
                )}

			</div>
		</>
	);
}

export default IndividualBook;


import React from 'react';
import Header from '../components/Header/Header';
import "../styles/IndividualBook.css";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function IndividualBook() {
	const location = useLocation(); // Get location object from react-router-dom
	const { bookId } = location?.state || { bookId: '' }; // Get bookID from state
	const API_KEY = import.meta.env.VITE_API_KEY; // API key
	const [books, setBooks] = useState([]); // State for books
	const navigate = useNavigate();
	
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
				// console.log(data); //Debug statement
				setBooks(data); // Update books state

			})
			.catch(error => console.error('Error: ', error)); // Catch any errors
		};

		const addToList = async (listName) => {
			try {
				const response = await fetch('http://localhost:8000/api/books/add-to-list', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						book: {
							id: bookId,
							title: books.volumeInfo?.title,
							author: books.volumeInfo?.authors?.join(", "),
							image: books.volumeInfo?.imageLinks?.thumbnail || bookIMG,
							publishDate: books.volumeInfo?.publishedDate
						},
						listName
					})
				});
	
				const data = await response.json();
				if (response.ok) {
					console.log(data.message); // Successful message
				} else {
					console.error(data.message); // Error message
				}
			} catch (error) {
				console.error('Failed to add book to list:', error);
			}
			console.log('test');
			navigate('/reading-list'); // Navigate to the reading list page
		};

		// Get higher resolution book cover image.
		const bookIMG = `https://books.google.com/books/publisher/content/images/frontcover/${encodeURIComponent(bookId)}?fife=w450-h650&source=gbs_api`;

// Return individual book details to UI
// format later
  return (
		<>
			<Header />
			{/* Load the individual book details */}
			<div className="individual-book-page">
		
				{/* Left Column - book cover image, add to favorites button */}
				<div className="individual-book-left-column">
					<div className="individual-img-div">
					<img src={bookIMG || "./icons/NO_COVER.jpeg"} 
						alt={books.volumeInfo?.title || "No title available"} 
						className="individual-book-img"/>
					</div>
					{/* Drop down button for lists */}
					<div className="individual-book-dropdown">
						
							<button 
								className="individual-book-addButton" 
								onClick={() => addToList('favorites')}
								style={{ cursor: 'pointer' }}
							>
								Add to Favorites
							</button>
						
						<div className="individual-book-list-dropdown-content">
                            <a href onClick={() => addToList('pastReads')} style={{ cursor: 'pointer' }}>Past Reads</a>
                            <a href onClick={() => addToList('currentlyReading')} style={{ cursor: 'pointer' }}>Current Reads</a>
                            <a href onClick={() => addToList('wantToRead')} style={{ cursor: 'pointer' }}>Want to Read</a>
                        </div>
					</div>
				</div>

				<div className="individual-book-object">
					{/* Right Column - title, author, description */}
					<div className="individual-book-right-column">
						<h1 className="individual-book-title">{books.volumeInfo?.title || "No title available"}</h1>
						<h2 className="individual-book-author">{books.volumeInfo?.authors?.join(", ") || "No author available"}</h2>
						{/* <p className="individual-book-desc">{books.volumeInfo?.description || "No description available"}</p> */}

						{/* Star rating */}	
						<div className="individual-book-stars">
							<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

							{/* Needs different names from over app.css */}
							<span className="fa fa-star checked"></span>
							<span className="fa fa-star checked"></span>
							<span className="fa fa-star checked"></span>
							<span className="fa fa-star"></span>
							<span className="fa fa-star"></span> 

							<p className="individual-book-rating-desc">5 out of 5 stars (524 review)</p>
						</div>

						{/* Not the safest method, but it works for rn */}
						<div className="individual-book-desc" dangerouslySetInnerHTML={{ __html: books.volumeInfo?.description || "No description available" }}/>

						<hr></hr>

						{/* Ratings and revivews section */}
						<div className="individual-book-ratings-container">

								<h1 className="individual-book-ratings-title">Ratings and Reviews</h1>

						</div>
					</div>
				</div>
			</div>
			
		</>
	);
}

export default IndividualBook;


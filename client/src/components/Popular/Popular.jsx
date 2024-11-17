// import Books from '../Book/Book';
import PopularCard from './PopularCard';
import { useState } from 'react';
import { useEffect } from 'react';


const Popular = () => {
	const API_KEY = import.meta.env.VITE_API_KEY; // API key
	const search = "bestselling fiction";
	const limit = 5;
	const offset = 0;
	const order = "newest";

	const [books, setBooks] = useState([]); // State for books

	// Fetch books for what's popular column - once so it doesn't keep calling the api
	useEffect(() => {
		fetchBooks();
	}, []); 

	const fetchBooks = () => {
		
		fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(search)}&orderBy=${encodeURIComponent(order)}&key=${encodeURIComponent(API_KEY)}&startIndex=${encodeURIComponent(offset)}&maxResults=${encodeURIComponent(limit)}`)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {
			setBooks([]); // Clear previous books
			const newBooks = data.items || []; // Default to empty array if no items
			setBooks(prevBooks => [...prevBooks, ...newBooks]); // Update books state
			// console.log(data); //debug

		})
		.catch(error => console.error('Error: ', error)); // Catch any errors
};

	return (
		<>
			<div className="popular-card">
                <div className="popular-title">What`s Popular</div>
                <div className="inner-popular-card-container">
                <div className="inner-popular-container">
    
                    <ul>
                        {books.map((book, index) => (
                            <li key={index}>
                                <PopularCard
                                    key={index}
                                    id={book.id}
                                    image={book.volumeInfo.imageLinks.thumbnail}
                                    title={book.volumeInfo.title}
                                    author={book.volumeInfo?.authors[0]|| "No author available"}
                                    publishDate={book.volumeInfo.publishedDate} />
                            </li>
                        ))}
                    </ul>
                    </div>
                </div>
                <img src="./icons/down.svg" alt="Down Arrow" className="rightarrow" />
            </div>

		</>
	);
};

export default Popular;

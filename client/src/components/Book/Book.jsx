import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from './Search'; 

const Books = () => {
    const navigate = useNavigate(); // Hook for navigation
    const [books, setBooks] = useState([]); // State for books
    const [searchField, setSearchField] = useState(''); // State for search input
    const API_KEY = import.meta.env.VITE_API_KEY; // API key

    const [offset, setOffset] = useState(0); // State for offset
    const [limit, setLimit] = useState(10); // State for limit


    // Function to search for books
    const searchBook = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Reset limit and offset for a new search
        setOffset(0); // Reset offset to initial value
        setLimit(10); // Reset limit to initial value
        setBooks([]); // Clear previous books
            
        // Fetch data from Google Books API
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchField)}&orderBy=relevance&key=${encodeURIComponent(API_KEY)}&startIndex=${encodeURIComponent(offset)}&maxResults=${encodeURIComponent(limit)}`)

            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const newBooks = data.items || []; // Default to empty array if no items
                setBooks(prevBooks => [...prevBooks, ...newBooks]); // Update books state
                setOffset(prevOffset => prevOffset + limit); // Increment offset by 10

                // If offset is 0, navigate to search page with state
                if (offset === 0) {
                    navigate('/search-page', { state: { books: [...books, ...newBooks], searchField } }); 
                } 
                // newBooks.forEach(book => {
                //     console.log(book.id); // Log each book's ID
                // });
                // Reloads the page upon submitting a new search reslts
                // This line of code fixes the bug with the view more button
                // and new search results not rendering after using it.
                window.location.reload(); // Reload the page 
                // console.log(data); //Debug statement

            })
            .catch(error => console.error('Error: ', error)); // Catch any errors
    };

    // Function to handle the search field
    const handleSearch = (e) => {
        setSearchField(e.target.value);

        // Reset limit and offset for a new search
        setOffset(0); // Reset offset to initial value
        setLimit(10); // Reset limit to initial value
        setBooks([]); // Clear previous books
    };

    return (
        <div>
            <Search 
                searchBook={searchBook} 
                handleSearch={handleSearch} 
                searchField={searchField} 
            />
        </div>
    );
};

export default Books;

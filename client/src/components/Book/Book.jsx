import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Search from './Search'; // Import Search component

const Books = () => {
    const navigate = useNavigate(); // Hook for navigation
    const [books, setBooks] = useState([]); // State for books
    const [searchField, setSearchField] = useState(''); // State for search input
    const API_KEY = import.meta.env.VITE_API_KEY; // API key


    // Function to search for books
    const searchBook = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Fetch data from Google Books API
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchField)}&key=${encodeURIComponent(API_KEY)}&limit=10`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const books = data.items || []; // Default to empty array if no items
                setBooks(books); // Update books state
                navigate('/search-page', { state: { books } }); // Navigate to search page with state
            })
            .catch(error => console.error('Error: ', error));
    };

    // Function to handle the search field
    const handleSearch = (e) => {
        setSearchField(e.target.value);
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
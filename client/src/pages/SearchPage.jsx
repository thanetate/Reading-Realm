import React from 'react';
import { useLocation } from 'react-router-dom';
import BookCard from '../components/Book/BookCard';

const SearchPage = () => {
    const location = useLocation();
    const { books } = location.state || { books: [] }; // Get books from state

    return (
        <div>
            <h1>Search Results</h1>
            <ul>
                {books.map((book, index) => (
                    <li key={index}>
                        <BookCard 
                            image={book.volumeInfo.imageLinks.thumbnail}
                            title={book.volumeInfo.title}
                            author={book.volumeInfo.authors}
                            publishDate={book.volumeInfo.publishedDate}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchPage;

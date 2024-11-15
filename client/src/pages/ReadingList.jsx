import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/ReadingList.css';
import Header from '../Components/Header/Header';
// import { LoginWrapper } from "./LoginWrapper";
import { Link } from "react-router-dom";


function ReadingList() {
    const [activeList, setActiveList] = useState('currentlyReading');
    const [searchQuery, setSearchQuery] = useState('');
    const [books, setBooks] = useState([]);
    const API_KEY = import.meta.env.VITE_API_KEY;

    // Fetch books from the backend based on the active list
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const url = `http://localhost:8000/api/books/list/${activeList}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBooks();
    }, [activeList]);

    // Function to delete a book
    const deleteBook = async (bookId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/books/${bookId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                console.log('Book deleted successfully');
                // Update the book list by removing the deleted book
                setBooks(books.filter((book) => book._id !== bookId));
            } else {
                console.error('Failed to delete book');
            }
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    // Function to filter books based on the search query
    const filterBooks = (books) => {
        return books.filter((book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };
    
    const updatePagesRead = async (bookId, pagesRead) => {
        try {
            await fetch(`http://localhost:8000/api/books/update-pages-read/${bookId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pagesRead }),
            });
            setBooks((prevBooks) =>
                prevBooks.map((book) =>
                    book._id === bookId ? { ...book, pagesRead } : book
                )
            );
        } catch (error) {
            console.error('Failed to update pages read:', error);
        }
    };

    const fetchTotalPages = async (imageUrl) => {
    try {
        // Extract the book ID from the image URL using a regex pattern
        const bookIdMatch = imageUrl.match(/id=([^&]*)/);
        const bookId = bookIdMatch ? bookIdMatch[1] : null;

        if (!bookId) {
            console.warn('No book ID found in the image URL');
            return null;
        }

        // Fetch book details directly using the extracted book ID
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch book details');
        }

        const data = await response.json();
        console.log('Fetched book details:', data);

        // Return the page count if available
        return data.volumeInfo.pageCount || null;
    } catch (error) {
        console.error('Error fetching total pages:', error);
        return null;
    }
};

    const calculateProgress = (pagesRead, totalPages) => {
        return totalPages ? Math.floor((pagesRead / totalPages) * 100) : 0;
    };

    return (
        <div>
            <Header />
            
			<div className="user-section">
				<Link to="/dashboard">
					<button>
						<img src="/icons/user-line.svg" alt="user icon" />
					</button>
				</Link>
			</div>
            
        
        <div className="reading-list-container">
            <div className="list-buttons">
                <button
                    className={activeList === 'currentlyReading' ? 'active' : ''}
                    onClick={() => setActiveList('currentlyReading')}
                >
                    Currently Reading
                </button>
                <button
                    className={activeList === 'wantToRead' ? 'active' : ''}
                    onClick={() => setActiveList('wantToRead')}
                >
                    Want to Read
                </button>
                <button
                    className={activeList === 'pastReads' ? 'active' : ''}
                    onClick={() => setActiveList('pastReads')}
                >
                    Past Reads
                </button>
                <button
                    className={activeList === 'favorites' ? 'active' : ''}
                    onClick={() => setActiveList('favorites')}
                >
                    Favorites
                </button>
            </div>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by book name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="list-section">
                <h2>{activeList === 'currentlyReading' ? 'Currently Reading' : 
                     activeList === 'wantToRead' ? 'Want to Read' : 
                     activeList === 'pastReads' ? 'Past Reads' : 'Favorites'}</h2>
                {filterBooks(books).length === 0 ? (
                    <p>No books found</p>
                ) : (
                    filterBooks(books).map((book) => (
                        <div key={book._id} className="book-item">
                            <img src={book.image} alt={book.title} />
                            <div>
                                <h3>{book.title}</h3>
                                <p>{book.author}</p>
                                {/* Delete Button */}
                                <button onClick={() => deleteBook(book._id)}>Delete</button>

                                {/* Pages Read Input and Progress Bar for Currently Reading Section */}
                                {activeList === 'currentlyReading' && (
                                    <div className="progress-container">
                                        <input
                                            type="number"
                                            placeholder="Pages read"
                                            value={book.pagesRead || ''}
                                            onChange={(e) =>
                                                updatePagesRead(book._id, parseInt(e.target.value, 10) || 0)
                                            }
                                        />
                                        <button
                                            onClick={async () => {
                                                const totalPages = await fetchTotalPages(book.image);
                                                setBooks((prevBooks) =>
                                                    prevBooks.map((b) =>
                                                        b._id === book._id ? { ...b, totalPages } : b
                                                    )
                                                );
                                            }}
                                        >
                                            Set Pages Read
                                        </button>

                                        {/* Display Pages Read and Total Pages */}
                                        <div className="pages-info">
                                            <p>Pages Read: {book.pagesRead || 0}</p>
                                            
                                        </div>

                                        {/* Progress Bar */}
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
                                        <p>{calculateProgress(book.pagesRead, book.totalPages || 0)}% complete</p>
                                        </div>
                                    )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
        </div>
    );
}

export default ReadingList;




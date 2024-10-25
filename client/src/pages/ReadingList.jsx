import React, { useState } from 'react';
import '../Styles/ReadingList.css'; // Adjust the path as needed

function ReadingList() {
    // State to manage which list is currently active
    const [activeList, setActiveList] = useState('currentlyReading');
    const [searchQuery, setSearchQuery] = useState('');

    // Dummy data for display purposes
    const currentlyReading = [
        { title: 'The Hobbit', author: 'J.R.R. Tolkien', image: 'link_to_image' },
        { title: '1984', author: 'George Orwell', image: 'link_to_image' },
    ];
    const wantToRead = [
        { title: 'Brave New World', author: 'Aldous Huxley', image: 'link_to_image' },
    ];
    const pastReads = [
        { title: 'To Kill a Mockingbird', author: 'Harper Lee', image: 'link_to_image' },
    ];
    const favorites = [
        { title: 'Pride and Prejudice', author: 'Jane Austen', image: 'link_to_image' },
    ];

    // Function to filter books based on the search query
    const filterBooks = (books) => {
        return books.filter((book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    return (
        <div className="reading-list-container">
            {/* Navigation Buttons */}
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

            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by book name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Conditional Rendering of Lists */}
            {activeList === 'currentlyReading' && (
                <div className="list-section">
                    <h2>Currently Reading</h2>
                    {filterBooks(currentlyReading).length === 0 ? (
                        <p>No books found</p>
                    ) : (
                        filterBooks(currentlyReading).map((book, index) => (
                            <div key={index} className="book-item">
                                <img src={book.image} alt={book.title} />
                                <div>
                                    <h3>{book.title}</h3>
                                    <p>{book.author}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {activeList === 'wantToRead' && (
                <div className="list-section">
                    <h2>Want to Read</h2>
                    {filterBooks(wantToRead).length === 0 ? (
                        <p>No books found</p>
                    ) : (
                        filterBooks(wantToRead).map((book, index) => (
                            <div key={index} className="book-item">
                                <img src={book.image} alt={book.title} />
                                <div>
                                    <h3>{book.title}</h3>
                                    <p>{book.author}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {activeList === 'pastReads' && (
                <div className="list-section">
                    <h2>Past Reads</h2>
                    {filterBooks(pastReads).length === 0 ? (
                        <p>No books found</p>
                    ) : (
                        filterBooks(pastReads).map((book, index) => (
                            <div key={index} className="book-item">
                                <img src={book.image} alt={book.title} />
                                <div>
                                    <h3>{book.title}</h3>
                                    <p>{book.author}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {activeList === 'favorites' && (
                <div className="list-section">
                    <h2>Favorites</h2>
                    {filterBooks(favorites).length === 0 ? (
                        <p>No books found</p>
                    ) : (
                        filterBooks(favorites).map((book, index) => (
                            <div key={index} className="book-item">
                                <img src={book.image} alt={book.title} />
                                <div>
                                    <h3>{book.title}</h3>
                                    <p>{book.author}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default ReadingList;



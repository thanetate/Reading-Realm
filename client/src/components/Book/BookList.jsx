import React from 'react';
import BookCard from './BookCard';

// Returns a list of books from the user's search, calls BookCard.
const BookList = (props) => {
    return (
        <div className="list"> 
            {
                props.books.map((book, index) => {
                    
                    return <BookCard 
                                key={index}
                                id={book.id}
                                image={book.volumeInfo.imageLinks.thumbnail}
                                title={book.volumeInfo.title}
                                author={book.volumeInfo.authors}
                                publishDate={book.volumeInfo.publishedDate}
                                 />
                                
                })
            }
        </div>
    )
}

export default BookList

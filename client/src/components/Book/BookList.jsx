import React from 'react';
import BookCard from './BookCard';

// Returns a list of books from the user's search, calls BookCard.
const BookList = (props) => {
    return (
        <div className="list"> 
            {
                props.books.map((book, index) => {
                    //const coverImageUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'https://via.placeholder.com/150';
                    return <BookCard 
                                key={index}
                                image={book.volumeInfo.imageLinks.thumbnail}
                                title={book.volumeInfo.title}
                                author={book.volumeInfo.authors}
                                publishDate={book.volumeInfo.publishedDate} />
                                
/*                              For Open Library API
                                 key={index}
                                image={coverImageUrl}
                                title={book.title}
                                author={book.author_name}
                                publishDate={book.first_publish_year} /> */
                })
            }
        </div>
    )
}

export default BookList

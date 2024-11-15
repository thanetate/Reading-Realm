// import React from 'react';
import PopularCard from './PopularCard';

// Returns a list of books from the user's search, calls BookCard.
const PopularList = (props) => {
    return (
        <div className="list"> 
            {
                props.books.map((book, index) => {
                    
                    return <PopularCard 
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

export default PopularList

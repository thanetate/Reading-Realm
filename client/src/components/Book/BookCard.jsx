import React from 'react';

// BookCard component that displays a book's image, title, author, and publish date.
const BookCard = (props) => {
    return (
        <div className="card-container"> 
            <img src={props.image} alt={props.title}/>
            
            <div className="book-desc">
                <h2>{props.title}</h2>
                <h3>{props.author}</h3>
                <p>{props.publishDate}</p>
            </div>
        </div>
    )
}

export default BookCard
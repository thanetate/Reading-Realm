import React from 'react';

// BookCard component that displays a book's image, title, author, and publish date.
const BookCard = (props) => {
    return (
        <div>
            <div className="book-card-container"> 
            {/* Set book cover image  */}
            <div className="book-img">
                <img src={props.image} alt={props.title}/>
            </div>
            
            {/* Title and author names  */}
            <div className="book-desc">
                <h2>{props.title}</h2>
                <h3>by {props.author}</h3>

                {/* Added star icons for rating  
                    Look into the website Thane suggested for icons (for Kathryn)*/}
                <div className="star-rating">

                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span> 

                </div>
                {/* Drop down button for lists */}
                    <div className="dropdown">
                        <button class="dropdown-btn">Add to list</button>
                            <div className="list-dropdown-content">
                                <a href="#">Past Reads</a>
                                <a href="#">Current Reads</a>
                                <a href="#">Future Reads</a>
                            </div>
                    </div>
             </div>
            </div>
            {/* People Container */}
            <div className="d-card-right">
					<div className="right-title">People</div>
					<div className="user">
						<div className="right-pic"></div>
						<div className="right-users">Billy Bob</div>
						<div className="right-desc">Principal Designer at Spotify</div>
						<button className="right-btn">+</button>
						<div className="right-pic"></div>
						<div className="right-users">Joe Bob</div>
						<div className="right-desc">Principal Designer at Spotify</div>
						<button className="right-btn">+</button>
						<div className="right-pic"></div>
						<div className="right-users">Michael Bob</div>
						<div className="right-desc">Principal Designer at Spotify</div>
						<button className="right-btn">+</button>
						<div className="right-pic"></div>
						<div className="right-users">Bob Joe</div>
						<div className="right-desc">Principal Designer at Spotify</div>
						<button className="right-btn">+</button>
						<div className="right-pic"></div>
						<div className="right-users">Bob Smith</div>
						<div className="right-desc">Principal Designer at Spotify</div>
						<button className="right-btn">+</button>
						<div className="right-pic"></div>
						<div className="right-users">Bob Smith</div>
						<div className="right-desc">Principal Designer at Spotify</div>
						<button className="right-btn">+</button>
						<div className="showmore">
							<button class="showmore-btn">
								Show more
								<img src="/icons/downcarrot.svg" alt="down carrot" />
							</button>
						</div>
					</div>
            </div>
        </div>
    )
}

export default BookCard
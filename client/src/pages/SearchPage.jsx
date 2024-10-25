import React,{ useState }  from 'react';
import { useLocation } from 'react-router-dom';
import BookCard from '../components/Book/BookCard';
import Header from '../components/Header/Header';


// 10/17/24 update - got the load more button working and fixed the new 
// search results bug after using the load more button

// next steps are to clean up code and comments

const SearchPage = () => {
    const location = useLocation(); // Get location object from react-router-dom
    const searchResult = location.state?.searchField || "No search results found";  // Get search field from state
    // these ^ two v lines can probably be condesned into one line, leaving for now tho cause it works
    const { books: initialBooks, searchField } = location.state || { books: [], searchField: '' }; // Get books and search field from state
    const [books, setBooks] = useState(initialBooks); // State for books
    const [offset, setOffset] = useState(books.length); // Set Offset to books length
    const [limit, setLimit] = useState(20); // Limit for each fetch
    const value = 10; // Value to increment offset and limit
    
    // Function to load more books when button is clicked
    // NOT STRESS TESTED 
    const loadMoreBooks = () => {
        
        // Fetch data from Google Books API
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchResult)}&startIndex=${offset}&maxResults=${limit}`)

            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })

            .then(data => {
                const newBooks = data.items || []; // Default to empty array if no items
                setBooks(prevBooks => [...prevBooks, ...newBooks]); // Update books state
                setOffset(prevOffset => prevOffset + value); // Increment offset by 10
                setLimit(prevLimit => prevLimit + value); // Increment limit by 10'
                console.log(data); //Debug statement
            })
            .catch(error => console.error('Error: ', error)); // Catch any errors
        };
    

    // Return book search results
    // View More button to load more books
    return (
        <>
        <div>
            <Header />
            <div className="search-page">
            <h1>Displaying search results for "{searchResult}"...</h1>
            <div className="book-card-search-page">
            <ul>
                {books.map((book, index) => (
                    <li key={index}>
                        <BookCard 
                            image={book.volumeInfo?.imageLinks?.thumbnail || "./icons/NO_COVER.jpeg"}
                            title={book.volumeInfo?.title || "No title available"}
                            author={book.volumeInfo?.authors?.join(", ") || "No author available"}
                        />
                    </li>
                ))}
            </ul>
            </div>

            <button id="view-more" onClick={loadMoreBooks}>View More...</button>

            </div>
        </div>
        </>
    );
};


export default SearchPage;

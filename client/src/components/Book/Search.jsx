import React from 'react';
import PropTypes from 'prop-types';

// Search component
// This displays the search bar on the top of the page
// and handles submitting the form with user input
// to the searchBook function.
const Search = ({ searchBook, handleSearch, searchField }) => {
    return (
        <div className="search-area">
            <form onSubmit={searchBook}>
            <img src='/icons/search-line.svg' alt='search icon'/>
                <input 
                    onChange={handleSearch} 
                    type="text"
                    value={searchField}
                    placeholder="Search for books, authors, and users..."
                />
                {/* <button type="submit">Search</button> */}
            </form>
        </div>
    );
};

// Define prop types for the Search component
Search.propTypes = {
    searchField: PropTypes.string.isRequired,
    handleSearch: PropTypes.func.isRequired,
    searchBook: PropTypes.func.isRequired,
};

export default Search;

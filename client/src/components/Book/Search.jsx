/* import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
// Search component to search for books.
// Includes a form with a text input field and a submit button.
// The input field has an onChange event listener that calls the handleSearch function.
// The form has an onSubmit event listener that calls the searchBook function.
// The input field value is set to the searchField state.
// The form is submitted when the submit button is clicked and the data is returned.


//Notes - create a separte page upon submition of the form to display search results.

const Search = (props) => {

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
                {/* <button type="submit">Search</button> */
//             </form>
//         </div>
//     )
// } 
/* // Define prop types for the Search component
Search.propTypes = {
    searchField: PropTypes.string.isRequired,
    handleSearch: PropTypes.func.isRequired,
    searchBook: PropTypes.func.isRequired,
};

export default Search;
 */

import PropTypes from 'prop-types';

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

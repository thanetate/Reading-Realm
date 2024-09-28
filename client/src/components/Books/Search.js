import React from 'react';

// Search component to search for books.
// Includes a form with a text input field and a submit button.
// The input field has an onChange event listener that calls the handleSearch function.
// The form has an onSubmit event listener that calls the searchBook function.
// The input field value is set to the searchField state.
// The form is submitted when the submit button is clicked and the data is returned.

const Search = (props) => {
    return (
        <div className = "search-area">
            <form onSubmit={props.searchBook} action="">
            <img src='/icons/search-line.svg' alt='search icon'/>
                <input 
                    onChange={props.handleSearch} 
                    type="text"
                    value={props.searchField}
                    placeholder="Search for books, authors, and users"/>
            </form>
        </div>
    )
}

export default Search;
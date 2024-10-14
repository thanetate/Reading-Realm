/* import { Component } from 'react';
import React from 'react';
import Search from './Search';
import BookList from './BookList';


// Books component to get input from the user and 
// fetch data from OpenLibrary API.
class Books extends Component {

    // Constructor to initialize the state.
     constructor(props) {
        super(props);
        this.API_KEY = `AIzaSyBAZJmXsjyXWP7KB4qsMjYRoE6gclAXd1g`; //this shit is giving me GRIEF
        this.state = {
            books: [],
            searchField: '',
            redirect: false,
        };
        
    } 

     // Function to search for books
    searchBook = (e) => {
        
        // Prevent the default action of the form.
        e.preventDefault();

        //Fetch the data from OpenLibrary.
        const {searchField} = this.state;

        //fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchField)}&limit=10`)
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchField)}&key=${encodeURIComponent(this.API_KEY)}&limit=10`)

            .then(response => response.json())
            .then(data=> {
                //console.log(data); //debug statement
                //this.setState({books: [...data.docs]}); //open library
                this.setState({books: [...data.items]});
                
            })
            .catch(error => console.error('Error: ', error));
    };

    //Render the search component.
    render()  {

        return (
        <div>
            <Search 
                searchBook={searchBook} 
                handleSearch={handleSearch} 
                searchField={searchField} 
            />
        </div>
        );
    }
} 

export default Books;

 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Search from './Search'; // Import Search component

const Books = () => {
    const navigate = useNavigate(); // Hook for navigation
    const [books, setBooks] = useState([]); // State for books
    const [searchField, setSearchField] = useState(''); // State for search input
    const API_KEY = import.meta.env.VITE_API_KEY; // API key


    // Function to search for books
    const searchBook = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Fetch data from Google Books API
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchField)}&key=${encodeURIComponent(API_KEY)}&limit=10`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const books = data.items || []; // Default to empty array if no items
                setBooks(books); // Update books state
                navigate('/search-page', { state: { books } }); // Navigate to search page with state
            })
            .catch(error => console.error('Error: ', error));
    };

    // Function to handle the search field
    const handleSearch = (e) => {
        setSearchField(e.target.value);
    };

    return (
        <div>
            <Search 
                searchBook={searchBook} 
                handleSearch={handleSearch} 
                searchField={searchField} 
            />
        </div>
    );
};

export default Books;

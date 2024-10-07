import { Component } from 'react';
import Search from './Search';
import BookList from './BookList';



// Books component to get input from the user and 
// fetch data from OpenLibrary API.
class Books extends Component {

    // Constructor to initialize the state.
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            searchField: '',
        };
        
    }

     // Function to search for books
    searchBook = (e) => {
        
        // Prevent the default action of the form.
        e.preventDefault();

        //Fetch the data from OpenLibrary.
        const {searchField} = this.state;

        fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchField)}&limit=10`)

            .then(response => response.json())
            .then(data=> {
                //console.log(data); //debug statement
                this.setState({books: [...data.docs]});
            })
            .catch(error => console.error('Error: ', error));

        };

     //Function to handle the search field.
    handleSearch = (e) => {
        //console.log(e.target.value); //debug statement
        this.setState({searchField: e.target.value});
    };

    //Render the search component.
    render()  {
        
        return (
        <div>
            <Search searchBook={this.searchBook} handleSearch={this.handleSearch} />
            <BookList books={this.state.books}/>
        </div>
        );
    }
}

export default Books;


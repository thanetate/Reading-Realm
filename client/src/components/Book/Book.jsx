import { Component } from 'react';
import Search from './Search';

// Books component to get input from the user and 
// fetch data from the Google Books API.
class Books extends Component {

    // Constructor to initialize the state.
    constructor(props) {
        super(props);
        this.state = {
            //books: [],
            searchField: '',
        };
    }

    // Function to search for books
    searchBook = (e) => {

        // Prevent the default action of the form.
        e.preventDefault();

        //Fetch the data from the Google Books API.
        const {searchField} = this.state;
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchField)}`)

            //Check if the response is ok and return the data.
            .then(response => {
                if(!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json() ;
            })

            //Log the book data to the console.
            .then(data => {
                console.log(data);
                //this.setState({books: [...data.body.items]});
            })

            //Catch any errors and log them to the console.
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            }); 
    }

    //Function to handle the search field.
    handleSearch = (e) => {
        console.log(e.target.value); //debug statement
        this.setState({searchField: e.target.value});
    }

    //Render the search component.
    render() {
        return (
        <div>
            <Search searchBook={this.searchBook} handleSearch={this.handleSearch} />
        </div>
        );
    }
}

export default Books;
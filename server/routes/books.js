const express = require('express');
const router = express.Router();
const book = require('../models/book'); // Import the book model with lowercase

// Route to add a book to a specified list
router.post('/add-to-list', async (req, res) => {
    const { book: bookData, listName } = req.body;

    try {
        // Create a new book document
        const newBook = new book({
            title: bookData.title,
            author: bookData.author,
            image: bookData.image,
            publishDate: bookData.publishDate,
            listName: listName
        });

        // Save the book to the database
        await newBook.save();

        res.status(200).json({ message: 'Book added to list successfully', book: newBook });
    } catch (error) {
        console.error('Failed to add book to list:', error); // Log the error
        res.status(500).json({ message: 'Failed to add book to list', error });
    }
});

// Route to get books by listName
router.get('/list/:listName', async (req, res) => {
    const { listName } = req.params;

    try {
        // Fetch books from the database by listName
        const books = await book.find({ listName });
        res.status(200).json(books);
    } catch (error) {
        console.error('Failed to fetch books:', error);
        res.status(500).json({ message: 'Failed to fetch books', error });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the book by ID and delete it
        const deletedBook = await book.findByIdAndDelete(id);
        
        if (deletedBook) {
            res.status(200).json({ message: 'Book deleted successfully' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        console.error('Failed to delete book:', error);
        res.status(500).json({ message: 'Failed to delete book', error });
    }
});

router.put('/update-pages-read/:id', async (req, res) => {
    const { id } = req.params;
    const { pagesRead } = req.body;

    try {
        const updatedBook = await book.findByIdAndUpdate(
            id,
            { pagesRead },
            { new: true }
        );

        if (updatedBook) {
            res.status(200).json({ message: 'Pages read updated successfully', book: updatedBook });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        console.error('Failed to update pages read:', error);
        res.status(500).json({ message: 'Failed to update pages read', error });
    }
});

module.exports = router

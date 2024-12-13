const express = require('express');
const router = express.Router();
const book = require('../models/book');

// Route to add a book to a user's list
router.post('/add-to-list', async (req, res) => {
    const { userId, book: bookData, listName } = req.body; // Extract userId from the body

    try {
        const newBook = await book.create({
            ...bookData,
            listName,
            userId, // Assign the userId directly
        });

        res.status(200).json({ message: 'Book added to list successfully', book: newBook });
    } catch (error) {
        console.error('Failed to add book to list:', error);
        res.status(500).json({ message: 'Failed to add book to list', error });
    }
});

// Route to get books by listName for a specific user
router.get('/list/:userId/:listName', async (req, res) => {
    const { userId, listName } = req.params; // Extract userId and listName from the params

    try {
        const books = await book.find({ userId, listName }); // Filter by userId and listName
        res.status(200).json(books);
    } catch (error) {
        console.error('Failed to fetch books:', error);
        res.status(500).json({ message: 'Failed to fetch books', error });
    }
});

// Route to delete a book for a specific user
router.delete('/:userId/:id', async (req, res) => {
    const { userId, id } = req.params; // Extract userId and book ID from the params

    try {
        const deletedBook = await book.findOneAndDelete({ _id: id, userId }); // Match book by _id and userId
        if (deletedBook) {
            res.status(200).json({ message: 'Book deleted successfully' });
        } else {
            res.status(404).json({ message: 'Book not found or unauthorized' });
        }
    } catch (error) {
        console.error('Failed to delete book:', error);
        res.status(500).json({ message: 'Failed to delete book', error });
    }
});

// Route to update pages read for a book for a specific user
router.put('/update-pages-read/:userId/:id', async (req, res) => {
    const { userId, id } = req.params; // Extract userId and book ID from the params
    const { pagesRead } = req.body;

    try {
        const updatedBook = await book.findOneAndUpdate(
            { _id: id, userId }, // Match by _id and userId
            { pagesRead },
            { new: true } // Return the updated document
        );

        if (updatedBook) {
            res.status(200).json({ message: 'Pages read updated successfully', book: updatedBook });
        } else {
            res.status(404).json({ message: 'Book not found or unauthorized' });
        }
    } catch (error) {
        console.error('Failed to update pages read:', error);
        res.status(500).json({ message: 'Failed to update pages read', error });
    }
});

module.exports = router;


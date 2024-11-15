// models/book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String },
    publishDate: { type: String },
    listName: { type: String, required: true }, // e.g., "currentlyReading", "pastReads", "favorites, Want to Read"
    pagesRead: { type: Number, default: 0 }
});

module.exports = mongoose.model('book', bookSchema); // Export as lowercase 'book'
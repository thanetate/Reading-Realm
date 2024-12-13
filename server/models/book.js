const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({


    title: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String },
    publishDate: { type: String },
    listName: { type: String, required: true }, // "currentlyReading", "pastReads", etc.
    pagesRead: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Add userId field
});

module.exports = mongoose.model('book', bookSchema);

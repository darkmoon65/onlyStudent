// models/bookModel.js

const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  generes: {
    type: String,
    required: true,
  },

  // Otros campos relacionados con los libros aquí
});

//const Book = mongoose.model('Book', bookSchema);
const Book = mongoose.model("Book", bookSchema);

module.exports = { Book };

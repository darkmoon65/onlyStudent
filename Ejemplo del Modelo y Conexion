const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/bookModel'); // Importa el modelo de libros



const app = express();
const port = 3000;

// Configura la conexión a la base de datos (como se mostró anteriormente)
// Configuración de la conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/myDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

// Ruta GET para obtener todos los libros
app.get('/books', async (req, res) => {
  try {
    // Utiliza el modelo de libros para buscar todos los libros en la colección
    const books = await Book.find();
    return res.status(200).json(allDogs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los libros');
  }
});



// Inicia el servidor (como se mostró anteriormente)

app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});





// models/bookModel.js
const { Schema, model } = require('mongoose');
const mongoose = require("mongoose");


const bookSchema = new Schema({
  title: String,
  name: String, 
  pages: Number, 
  generes: String, 

  // Otros campos relacionados con los libros aquí
});

//const Book = mongoose.model('Book', bookSchema);
const Book = model('Book', bookSchema);

module.exports = {Book};

// models/bookModel.js
import mongoose from 'mongoose';

const esquemaUsuario = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  fecha_registro: {
    type: String,
    required: true,
  },
  fecha_nacimiento: {
    type: String,
    required: true,
  },
  contrasena: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
  },
});

const Usuario = mongoose.model("Usuario", esquemaUsuario);

export { Usuario };


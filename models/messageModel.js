import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  mensaje: {
    type: String,
    required: true,
  },
});

const chatSchema = new mongoose.Schema({
  usuario1: {
    type: String,
    required: true,
  },
  usuario2: {
    type: String,
    required: true,
  },
  fecha_inicio: {
    type: Date,
    required: true,
  },
  mensajes: [messageSchema],
});

const Chat = mongoose.model('chat', chatSchema);

export { Chat };

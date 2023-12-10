import dotenv from 'dotenv';
import express, { json } from "express";
import { connect } from "mongoose";
import cors from 'cors';
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import publicationRouter from "./routes/publication.js";
import groupRouter from "./routes/group.js";
import chatRouter from "./routes/chat.js";
import { Server } from "socket.io";
import http from "http";

dotenv.config()
const app = express();
app.use(json());
app.use(cors());


// Crear un canal de chats 
const server = http.createServer(app);
var io = new Server(
  {
    cors: {
      origin: "http://localhost:3000"
    }
  });

io.listen(4000);
io.on('connection', (socket) => {
  console.log('Se conectó un usuario');
  socket.on('chat', (msg) => {
    io.emit('chat', msg);
    console.log('mensaje: ' + msg);
  });
});


// server.listen(4000, () => {
//   console.log('listening on *:4000');
// });

// const chatNamespace = chat.of('/chat');
// chatNamespace.on('connection', (socket) => {
//   console.log('Usuario conectado');

//   socket.on('chat message', (msg) => {
//     console.log('Mensaje en el chat: ' + msg);
//     chatNamespace.emit('chat message', msg);
//   });

//   socket.on('disconnect', () => {
//     console.log('Usuario desconectado del chat');
//   });
// });


const start = async () => {
  try {
    await connect('mongodb://127.0.0.1:27017/myDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(3200, () => console.log("Server started on port 3200"));
  } catch (error) {
    console.log("err")
    console.error(error);
    process.exit(1);
  }
};

app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/publication', publicationRouter)
app.use('/group', groupRouter)
app.use('/chat', chatRouter)
app.use('/uploads', express.static('uploads'));

start();

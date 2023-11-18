import dotenv from 'dotenv';
import express, { json } from "express";
import { connect } from "mongoose";
import cors from 'cors';
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import publicationRouter from "./routes/publication.js";
import groupRouter from "./routes/group.js";


dotenv.config()
const app = express();
app.use(json());
app.use(cors());

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


start();

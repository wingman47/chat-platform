import express from "express";
import { chats } from "./data/data.js";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import session from "express-session";
import MongoDBStoreFactory from "connect-mongodb-session";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js"

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
dotenv.config();

/* ---------------------- EXPRESS SESSION WITH MONGODB ---------------------- */

const MongoDBStore = MongoDBStoreFactory(session);
const MONGODB_URI = process.env.MONGO_URL;
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: "secretkey!",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
    resave: true,
    saveUninitialized: false,
    store: store,
  })
);

mongoose.connect(MONGODB_URI).catch((err) => {
  console.log(err);
});

/* -------------------------------------------------------------------------- */

connectDB();

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)

const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`server started at ${PORT}`));

const gracefulShutdown = () => {
  console.log('Shutting down gracefully...');
  store.clear((err) => {
    if (err) {
      console.error('Error clearing sessions:', err);
    } else {
      console.log('All sessions cleared.');
    }
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  });
};

process.on('SIGINT', gracefulShutdown);
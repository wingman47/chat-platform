import express from "express";
import { chats } from "./data/data.js";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import session from "express-session";
import MongoDBStoreFactory from "connect-mongodb-session";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(cors());
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

app.get("/", (req, res) => {
  res.send("api is runnning");
});

app.use('/api/user', userRoutes)


const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`server started at ${PORT}`));

import express from "express";
import { chats } from "./data/data.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("api is runnning");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const { id } = req.params;
  const chat = chats.find((c) => c._id === id);
  res.send(chat);
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`server started at ${PORT}`));

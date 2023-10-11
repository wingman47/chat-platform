import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { chats } from "../data/data.js";
import Chat from "../models/chatModel.js";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;
export const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const user = new ObjectId(req.session.user._id);
  let isChat = await Chat.find({
    isGroupChat: false,
    users: { $all: [user, userId] },
  })

    .populate("users", "-password")
    .populate("latestMessage");
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [user, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(FullChat);
    } catch (error) {
      throw new Error(error.message);
    }
  }
});

import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Chat from "../models/chatModel.js";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;
export const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const userSession = new ObjectId(req.session.user._id);
  const user = userSession.toString();
  console.log(user.toString());
  console.log(userId);
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
      // we define reference users here.
      // The .populate() method in Mongoose retrieves data from the referenced
      // collection and fills it into the specified field within the source document.
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

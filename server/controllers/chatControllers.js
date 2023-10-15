import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Chat from "../models/chatModel.js";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

export const accessChat = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(userId);
    if (!userId) {
      console.log("UserId param not sent with request");
      return res.sendStatus(400);
    }
    const userSession = new ObjectId(req.session.user._id);
    const user = userSession.toString();
    console.log(user);
    const isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: user } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate({
        path: "users",
        select: "-password",
      })
      .populate({
        path: "latestMessage.sender",
        select: "name pic email",
      });
    if (isChat.length > 0) {
      const data = isChat;
      console.log("isChat: ", isChat);
      res.status(200).json(data);
    } else {
      let chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [user, userId],
      };
      const createdChat = await Chat.create(chatData);
      const data = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      console.log("createdChat: ", createdChat);
      res.status(200).json([data]);
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const fetchChats = asyncHandler(async (req, res) => {
  try {
    const userSession = new ObjectId(req.session.user._id);
    const user = userSession.toString();
    Chat.find({ users: { $elemMatch: { $eq: user } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        console.log(results);
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the fields" });
  }

  let users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }
  const userSession = new ObjectId(req.session.user._id);
  const user = userSession.toString();
  users.push(user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

export const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

export const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});

import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

export const allUsers = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            // i: case insensitive
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    // find users except the current user
    const userIdObject = new ObjectId(req.session.user._id);
    console.log(userIdObject);
    const filter = {
      _id: { $ne: userIdObject },
      ...keyword,
    };
    const users = await User.find(filter);
    res.send(users);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Enter all the fields");
    }

    // unique salt is generated for each user
    // the salt and password is encapsulated in a single string
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const newUser = new User({
      name,
      email,
      password: passwordHash,
      pic,
    });
    const userUUID = uuidv4();
    req.session.userid = userUUID;
    req.session.user = newUser;
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "USER NOT FOUND" });

    // using same salt to compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "INVALID CREDENTIALS" });
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    console.log(user);
    const userUUID = uuidv4();
    req.session.userid = userUUID; 
    req.session.user = user;
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.clearCookie("connect.sid");
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).send("Logged out");
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// using query
// /api/user?search=arpit
// in params we do /:id, params is different from query

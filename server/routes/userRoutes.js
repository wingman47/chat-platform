import express from "express";
import {
  allUsers,
  registerUser,
  authUser,
  logoutUser
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.get("/", allUsers);

export default router
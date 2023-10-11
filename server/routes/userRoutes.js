import express from "express";
import {
  allUsers,
  registerUser,
  authUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/", allUsers);

export default router
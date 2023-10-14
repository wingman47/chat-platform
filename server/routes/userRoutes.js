import express from "express";
import {
  allUsers,
  registerUser,
  authUser,
  logoutUser
} from "../controllers/userControllers.js";
import { verification } from "../middleware/verification.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);
router.post("/logout",verification,logoutUser);
router.get("/", verification, allUsers);

export default router
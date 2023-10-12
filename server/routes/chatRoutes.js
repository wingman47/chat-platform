import express from "express";
import { accessChat, addToGroup, createGroupChat, fetchChats, removeFromGroup, renameGroup } from "../controllers/chatControllers.js";

const router = express.Router();

router.post("/", accessChat);
router.get("/", fetchChats);
router.post("/group", createGroupChat);
router.put("/rename", renameGroup);
router.put("/groupadd", addToGroup);
router.put("/groupremove", removeFromGroup);

export default router;

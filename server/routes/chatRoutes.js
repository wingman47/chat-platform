import express from "express";
import { accessChat, addToGroup, createGroupChat, fetchChats, removeFromGroup, renameGroup } from "../controllers/chatControllers.js";
import { verification } from "../middleware/verification.js";

const router = express.Router();

router.post("/", verification, accessChat);
router.get("/", verification, fetchChats);
router.post("/group", verification, createGroupChat);
router.put("/rename", verification, renameGroup);
router.put("/groupadd", verification, addToGroup);
router.put("/groupremove", verification, removeFromGroup);

export default router;

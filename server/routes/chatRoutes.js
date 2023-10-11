import express from "express";
import { accessChat } from "../controllers/chatControllers.js";

const router = express.Router();

router.post("/", accessChat);
// router.get("/", fetchChats);
// router.post("/group", createGroupChat);
// router.put("/rename", renameGroup);
// router.put("/groupremove", removeFromGroup);
// router.put("/groupadd", addToGroup);

export default router;

import mongoose from "mongoose";

// chat model to display recent chats o lhs
const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroup: { type: Boolean, dfault: false },
    users: [
      {
        // each user in the array is an objectId values which references to
        // documents in other "User" collection
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat
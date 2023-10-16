import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChat: null,
  chats: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload.selectedChat;
    },
    setChats: (state, action) => {
      const newData = action.payload.chats;

      // Check if a chat with the same _id exists in the current state
      const duplicateChatIndex = state.chats.findIndex(
        (c) => c._id === newData._id
      ); 

      if (duplicateChatIndex !== -1) {
        // If a chat with the same _id exists, replace it with the new data
        state.chats[duplicateChatIndex] = newData;
      } else {
        // If the chat doesn't exist, add it to the array
        state.chats.push(newData);
      }
    },
  },
});

export const { setSelectedChat, setChats } = chatSlice.actions;
export default chatSlice.reducer;

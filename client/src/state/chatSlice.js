import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChat: null,
  chats: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload.selectedChat;
    },
    setChats: (state, action) => {
      state.chats = action.payload.chats;
    },
  },
});

export const { setSelectedChat, setChats } = chatSlice.actions;
export default chatSlice.reducer;

import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import SideDrawer from "../components/chat/SideDrawer";
import MyChats from "../components/chat/MyChats";
import ChatBox from "../components/chat/ChatBox";
import { useSelector } from "react-redux";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
    const selectedChat = useSelector((state) => state.chat.selectedChat);
  return (
    <div style={{ width: "100%" }}>
      <SideDrawer />
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        height="91.5vh"
        padding="10px"
      >
        <MyChats fetchAgain={fetchAgain} />
        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
    </div>
  );
};

export default ChatPage;

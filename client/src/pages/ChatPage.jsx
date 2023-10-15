import { Box } from '@chakra-ui/react';
import React from 'react'
import { useSelector } from "react-redux";
import SideDrawer from '../components/chat/SideDrawer';
import MyChats from '../components/chat/MyChats';
import ChatBox from '../components/chat/ChatBox';

const ChatPage = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div style={{ width: "100%" }}>
      <SideDrawer />
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        <MyChats />
        {/* <ChatBox /> */}
      </Box>
    </div>
  );
}

export default ChatPage
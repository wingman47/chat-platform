import React from "react";
import { useSelector } from "react-redux";
import { setSelectedChat } from "../../state/chatSlice";
import { useDispatch } from "react-redux";
import { Box, Text } from "@chakra-ui/react";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const user = useSelector((state) => state.auth.user);
  const selectedChat = useSelector((state) => state.chat.selectedChat);

  return (
    <div>
      {selectedChat ? (
        <></>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3}>
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </div>
  );
};

export default SingleChat;

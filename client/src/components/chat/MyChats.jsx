import React, { useEffect, useState } from "react";
import { setSelectedChat, setChats } from "../../state/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Flex,
  Spacer,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender } from "../configs/chatLogic";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const user = useSelector((state) => state.auth.user);
  const chats = useSelector((state) => state.chat.chats);
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const toast = useToast();
  const dispatch = useDispatch();
  const fetchChats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        dispatch(setChats({ chats: data[0] }));
      } else {
        toast({
          title: "Error Occured!",
          description: "Failed to Load the Chats",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(user);
    fetchChats();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Box
        d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir="column"
        alignItems="center"
        p={3}
        bg="white"
        w={{ base: "100%", md: "40%" }}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Flex
          pb={3}
          px={3}
          fontSize={"25px"}
          d="flex"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          My Chats
          {/* <GroupChatModal> */}
          <Button d="flex" fontSize={"17px"} rightIcon={<AddIcon />}>
            New Group Chat
          </Button>
          {/* </GroupChatModal> */}
        </Flex>
        <Box
          d="flex"
          flexDir="column"
          p={3}
          bg="#F8F8F8"
          w="100%"
          // h="100%"
          borderRadius="lg"
          overflowY="hidden"
        >
          {chats ? (
            <Stack overflowY="scroll">
              {chats.map((chat) => (
                <Box
                  onClick={() => dispatch(setSelectedChat(chat))}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  {chat.latestMessage && (
                    <Text fontSize="xs">
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </Box>
              ))}
            </Stack>
          ) : (
            <ChatLoading />
          )}
        </Box>
      </Box>
    </>
  );
};

export default MyChats;

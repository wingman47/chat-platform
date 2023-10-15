import React, { useState } from 'react'
import { setSelectedChat, setChats } from "../../state/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from '@chakra-ui/react';

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState()
  const user = useSelector((state) => state.auth.user);
  const chats = useSelector((state) => state.chat.chats);
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const toast = useToast();
  //  const fetchChats = async () => {
  //    try {
  //      const config = {
  //        headers: {
  //          Authorization: `Bearer ${user.token}`,
  //        },
  //      };

  //      const { data } = await axios.get("/api/chat", config);
  //      setChats(data);
  //    } catch (error) {
  //      toast({
  //        title: "Error Occured!",
  //        description: "Failed to Load the chats",
  //        status: "error",
  //        duration: 5000,
  //        isClosable: true,
  //        position: "bottom-left",
  //      });
  //    }
  //  };

  //  useEffect(() => {
  //    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
  //    fetchChats();
  //    // eslint-disable-next-line
  //  }, [fetchAgain]);

  return (
    <div>

    </div>
  )
}

export default MyChats
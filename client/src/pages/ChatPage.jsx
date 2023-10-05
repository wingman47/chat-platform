import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    async function fetchChats() {
      try {
        const res = await axios.get("http://localhost:5000/api/chat");
        console.log(res.data);
        setChats(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchChats();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id} className="font-sans">{chat.chatName}</div>
      ))}
    </div>
  );
};

export default ChatPage;

import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";


const ChatPage = () => {
  // const [chats, setChats] = useState([]);
  // useEffect(() => {
  //   async function fetchChats() {
  //     try {
  //       const res = await axios.get("http://localhost:5000/api/chat");
  //       console.log(res.data);
  //       setChats(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchChats();
  // }, []);

  return (
    <div>
      <InputGroup borderRadius={5} size="sm" borderBottomWidth={3} borderBottomColor={'green.400'}>
        <InputRightAddon
          pointerEvents="none"
          children={<Search2Icon color="gray.600" />}
          border={0}
        />
        <Input
          type="text"
          placeholder="Search"
          bg={"gray.600"}
          border={0}
          color={"gray.500"}
          _placeholder={{
            color: "gray.500",
          }}
        />
        {/* <InputRightAddon p={0}>
          <Button
            size="sm"
            borderLeftRadius={0}
            borderRightRadius={3.3}
            border="1px solid #949494"
          >
            Search
          </Button>
        </InputRightAddon> */}
      </InputGroup>
    </div>
  );
};

export default ChatPage;


/* 
<InputGroup>
          <InputLeftElement pointerEvents="none" width={5} ml={3}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z"
                fill="rgba(141,141,141,1)"
              ></path>
            </svg>
          </InputLeftElement>
          <Input
            placeholder="Email Id"
            type="email"
            bg={"gray.100"}
            border={0}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
            name="email"
            isRequired
          />
        </InputGroup>
*/

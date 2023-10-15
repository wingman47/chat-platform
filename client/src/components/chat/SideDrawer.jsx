import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import React, { useState } from "react";
import { FiBell, FiChevronDown } from "react-icons/fi";
import { useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";
import { useDispatch } from "react-redux";
import { setLogout } from "../../state/authSlice";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "./ChatLoading";
import UserListItem from "../user/UserListItem";
import { setSelectedChat, setChats } from "../../state/chatSlice";

// import NotificationBadge from "react-notification-badge";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const chats = useSelector((state) => state.chat.chats);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const logoutHandler = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.ok) {
        dispatch(setLogout());
        toast({
          title: "Logout Successful",
          description: "Logout Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } else {
        toast({
          title: "Failed to Logout",
          description: "Failed to Logout",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast({
        title: "Failed to Logout",
        description: "Failed to Logout",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter Something",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/user?search=${search}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setSearchResult(data);
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      console.log(error);
    }
  };

  const accessChat = async (userId) => {
    console.log("userid: ", userId);
    try {
      setLoadingChat(true);
      const res = await fetch(`http://localhost:5000/api/chat`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        console.log("chats before: ", chats);
        console.log("type: ", typeof chats);
        dispatch(setChats({ chats: data[0] }));
        console.log("chats: ", chats);
        dispatch(setSelectedChat(data));
        setLoadingChat(false);
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured!",
        description: "Failed to Fetch",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users" hasArrow placement="bottom-end">
          <Button variant={"ghost"} onClick={onOpen}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                d="M11 2C15.968 2 20 6.032 20 11C20 15.968 15.968 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2ZM11 18C14.8675 18 18 14.8675 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18ZM19.4853 18.0711L22.3137 20.8995L20.8995 22.3137L18.0711 19.4853L19.4853 18.0711Z"
                fill="rgba(66,66,66,1)"
              ></path>
            </svg>
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl">Tree House</Text>
        <div>
          <HStack spacing={{ base: "0", md: "6" }}>
            {/* Bell Icon */}
            <IconButton
              size="lg"
              variant="ghost"
              aria-label="open menu"
              icon={<FiBell />}
            />
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  py={2}
                  transition="all 0.3s"
                  _focus={{ boxShadow: "none" }}
                >
                  <HStack>
                    <Avatar
                      size={"sm"}
                      src={user.pic}
                      cursor={"pointer"}
                      name={user.name}
                    />
                    <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text fontSize="sm">{user.name.toUpperCase()}</Text>
                    </VStack>
                    <Box display={{ base: "none", md: "flex" }}>
                      <FiChevronDown />
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList
                  bg={useColorModeValue("white", "gray.900")}
                  borderColor={useColorModeValue("gray.200", "gray.700")}
                >
                  <ProfileModal user={user}>
                    <MenuItem>My Profile</MenuItem>{" "}
                  </ProfileModal>
                  <MenuItem onClick={logoutHandler}>Log out</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </HStack>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((eachUser) => (
                <UserListItem
                  key={eachUser._id}
                  user={eachUser}
                  handleFunction={() => accessChat(eachUser._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;

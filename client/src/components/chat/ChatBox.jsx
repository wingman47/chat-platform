import { Box } from "@chakra-ui/layout";
// import "./styles.css";
import { useSelector } from "react-redux";
import SingleChat from "./SingleChat";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  return (
    <>
      <Box
        display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
        alignItems="center"
        flexDirection="column"
        padding={5}
        mx={4}
        bg="white"
        width={{ base: "100%", md: "60%" }}
        borderRadius="lg"
        borderWidth="1px"
      >
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
    </>
  );
};

export default Chatbox;

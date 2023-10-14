import {
  Stack,
  Input,
  Button,
  Box,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../state/state";

const SignIn = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
        credentials: "include"
      });
      const data = await response.json();
      console.log("login data ", data);

      if (response.ok) {
        alert("Login Successful");
        dispatch(
          setLogin({
            user: data.user,
          })
        );
        navigate("/chats");
      } else {
        alert("INVALID CREDENTIALS");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box as={"form"} mt={10} onSubmit={handleSubmit}>
      <Stack spacing={4}>
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
        <InputGroup>
          <InputLeftElement pointerEvents="none" width={5} ml={3}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="22"
              height="22"
            >
              <path
                d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16ZM11 14V16H13V14H11ZM7 14V16H9V14H7ZM15 14V16H17V14H15Z"
                fill="rgba(123,123,123,1)"
              ></path>
            </svg>
          </InputLeftElement>
          <Input
            placeholder="Password"
            type={show ? "text" : "password"}
            bg={"gray.100"}
            border={0}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
            name="password"
            isRequired
          />
          <InputRightElement width={"4.5rem"}>
            <Button
              h="1.75rem"
              size="sm"
              color={"gray.800"}
              onClick={() => setShow(!show)}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </Stack>
      <Button
        fontFamily={"heading"}
        mt={8}
        w={"full"}
        bgGradient="linear(to-r, green.400,teal.400)"
        color={"white"}
        _hover={{
          bgGradient: "linear(to-r, red.400,pink.400)",
          boxShadow: "xl",
        }}
        type="submit"
      >
        L O G I N
      </Button>
    </Box>
  );
};

export default SignIn;

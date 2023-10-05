import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  Icon,
  chakra,
} from "@chakra-ui/react";
import { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./Login";
import Footer from "../scenes/Footer";


const avatars = [
  {
    name: "G",
    url: "https://bit.ly/ryan-florence",
  },
  {
    name: "R",
    url: "https://bit.ly/sage-adebayo",
  },
  {
    name: "O",
    url: "https://bit.ly/kent-c-dodds",
  },
  {
    name: "U",
    url: "https://bit.ly/prosper-baba",
  },
  {
    name: "P",
    url: "https://bit.ly/code-beast",
  },
];

export const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

const RegisterPage = () => {
  const [signUp, setSignUp] = useState(true);
  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Stay in Touch.{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              Anytime,
            </Text>{" "}
            Anywhere
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  size={useBreakpointValue({ base: "md", md: "lg" })}
                  position={"relative"}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "md",
                    transform: "scale(1.125)",
                    bgGradient: "linear(to-bl, green.400,green.400)",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={"heading"} fontSize={{ base: "4xl", md: "6xl" }}>
              +
            </Text>
            <Flex
              align={"center"}
              justify={"center"}
              fontFamily={"heading"}
              fontSize={{ base: "sm", md: "lg" }}
              bg={"gray.800"}
              color={"white"}
              rounded={"md"}
              minWidth={useBreakpointValue({ base: "44px", md: "60px" })}
              minHeight={useBreakpointValue({ base: "44px", md: "60px" })}
              position={"relative"}
              _before={{
                content: '""',
                width: "full",
                height: "full",
                rounded: "md",
                transform: "scale(1.125)",
                bgGradient: "linear(to-bl, red.400,pink.400)",
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              <Stack direction="row" spacing={6}>
                <Button
                  w="100%"
                  p={0}
                  colorScheme="none"
                  size="lg"
                  onClick={() => setSignUp(!signUp)}
                >
                  <chakra.span
                    fontWeight="bold"
                    color="teal"
                    fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                    bg={
                      !signUp
                        ? "linear-gradient(transparent 50%, #83e9e7 50%)"
                        : ""
                    }
                  >
                    Login
                  </chakra.span>
                </Button>
                <Button
                  w="100%"
                  p={0}
                  colorScheme="none"
                  size="lg"
                  onClick={() => setSignUp(!signUp)}
                >
                  <chakra.span
                    fontWeight="bold"
                    color="teal"
                    fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                    bg={
                      signUp
                        ? "linear-gradient(transparent 50%, #83e9e7 50%)"
                        : ""
                    }
                  >
                    Sign Up
                  </chakra.span>
                </Button>
              </Stack>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              Experience the future of messaging with our user-friendly and
              feature-rich app. Join us today and start your journey towards
              more meaningful conversations.
            </Text>
          </Stack>
          {signUp ? <SignUp /> : <SignIn />}
        </Stack>
      </Container>
      <Footer />
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />
    </Box>
  );
};

export default RegisterPage;

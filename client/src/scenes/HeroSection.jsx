import * as React from "react";
import { Container, chakra, Stack, Text, Button, Box } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <Container p={{ base: 8, sm: 14 }}>
      <Stack direction="column" spacing={6} alignItems="center">
        <Box
          py={2}
          px={3}
          bg="teal"
          w="max-content"
          color="white"
          rounded="md"
          fontSize="sm"
        >
          <Stack direction={{ base: "column", sm: "row" }}>
            <Text fontWeight="bold">Chat, Share, Connect! 🚀</Text>
            <Text>Join the Tree House!</Text>
          </Stack>
        </Box>
        <chakra.h1
          fontSize={{ base: "4xl", sm: "5xl" }}
          fontWeight="bold"
          textAlign="center"
          maxW="600px"
        >
          Join Tree House:{" "}
          <chakra.span
            color="teal"
            bg="linear-gradient(transparent 50%, #83e9e7 50%)"
          >
            Express with Chat
          </chakra.span>
        </chakra.h1>
        <Text maxW="550px" fontSize="xl" textAlign="center" color="gray.500">
          Seamless communication meets modern convenience. Stay connected with
          friends, and family effortlessly. Join us today and start your journey
          towards more meaningful conversations.
        </Text>
        <Stack
          direction={{ base: "column", sm: "row" }}
          w={{ base: "100%", sm: "auto" }}
          spacing={5}
        >
          <Button
            colorScheme="teal"
            variant="outline"
            rounded="md"
            size="lg"
            height="3.5rem"
            fontSize="1.2rem"
            onClick={() => navigate('/login')}
          >
            Get Started
          </Button>
          <Button
            leftIcon={<FaGithub />}
            colorScheme="gray"
            variant="outline"
            rounded="md"
            size="lg"
            height="3.5rem"
            fontSize="1.2rem"
          >
            Github
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default HeroSection;

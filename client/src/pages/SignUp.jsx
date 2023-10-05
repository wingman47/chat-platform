import {
  Stack,
  Input,
  Button,
  Box
} from "@chakra-ui/react";
import { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box as={"form"} mt={10}>
      <Stack spacing={4}>
        <Input
          placeholder="Full Name"
          bg={"gray.100"}
          border={0}
          color={"gray.500"}
          _placeholder={{
            color: "gray.500",
          }}
          required
        />
        <Input
          placeholder="Email Id"
          type="email"
          bg={"gray.100"}
          border={0}
          color={"gray.500"}
          _placeholder={{
            color: "gray.500",
          }}
          required
        />
        <Input
          placeholder="Password"
          type="password"
          bg={"gray.100"}
          border={0}
          color={"gray.500"}
          _placeholder={{
            color: "gray.500",
          }}
          required
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          bg={"gray.100"}
          border={0}
          color={"gray.500"}
          _placeholder={{
            color: "gray.500",
          }}
          required
        />
        <Button fontFamily={"heading"} bg={"gray.200"} color={"gray.800"}>
          Upload Profile
        </Button>
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
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;

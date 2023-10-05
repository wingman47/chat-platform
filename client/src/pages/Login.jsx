import { Stack, Input, Button, Box } from "@chakra-ui/react";

const SignIn = () => {
  return (
    <Box as={"form"} mt={10}>
      <Stack spacing={4}>
        <Input
          placeholder="Email Id"
          bg={"gray.100"}
          border={0}
          color={"gray.500"}
          _placeholder={{
            color: "gray.500",
          }}
          type="email"
          required
        />
        <Input
          placeholder="Password"
          bg={"gray.100"}
          border={0}
          color={"gray.500"}
          _placeholder={{
            color: "gray.500",
          }}
          type="password"
          required
        />
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
        Login
      </Button>
    </Box>
  );
};

export default SignIn;

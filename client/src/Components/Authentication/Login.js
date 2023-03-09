import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useDispatch, useSelector } from "react-redux";
import { loginaction, clearerr } from "../../Redux/Actions/userAction";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // For Redux
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const submitHandler = async () => {
    try {
      if (!email || !password) {
        toast({
          title: "Please Fill All Fields",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
      dispatch(loginaction(email, password));
    } catch (e) {}
  };
  useEffect(() => {
    if (error) {
      // toast({
      //   title: error,
      //   status: "error",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom",
      // });
      dispatch(clearerr());
    }

    if (isAuthenticated) {
      // toast({
      //   title: "Logged In Successfully",
      //   status: "success",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom",
      // });
      history.push("/chat");
    }
  }, [dispatch, error, history, isAuthenticated]);
  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Log In
      </Button>
    </VStack>
  );
};

export default Login;

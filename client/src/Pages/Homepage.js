import React, { Fragment } from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Login from "../Components/Authentication/Login";
import Signup from "../Components/Authentication/Signup";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/toast";
import Loader from "../Loader/Loader";
const Homepage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { error, loading, isAuthenticated, logoutsuccess } = useSelector(
    (state) => state.user
  );
  const toast = useToast();
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/chat");
    }
  }, [dispatch, error, logoutsuccess, isAuthenticated, history]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Container maxW="xl" centerContent>
            <Box
              d="flex"
              justifyContent="center"
              p={3}
              bg="white"
              w="100%"
              m="40px 0 15px 0"
              borderRadius="lg"
              borderWidth="1px"
            >
              <Text fontSize="4xl" fontFamily="Work sans" textAlign="center">
                Chat - App
              </Text>
            </Box>
            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
              <Tabs isFitted variant="soft-rounded">
                <TabList mb="1em">
                  <Tab>Login</Tab>
                  <Tab>Sign Up</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Login />
                  </TabPanel>
                  <TabPanel>
                    <Signup />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Homepage;

import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useDispatch, useSelector } from "react-redux";
import { loginaction, clearerr } from "../Redux/Actions/userAction";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import SideDrawer from "../Components/Chat/Sidedrawer";
import MyChats from "../Components/Chat/Mychat";
import Chatbox from "../Components/Chat/Chatbox";
import Loader from "../Loader/Loader.js";
import React, { Fragment } from "react";

const Chatpage = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const history = useHistory();

  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      dispatch(clearerr());
    }
    if (isAuthenticated === false) {
      history.push("/");
    }
  }, [dispatch, error, isAuthenticated, history]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div style={{ width: "100%" }}>
            <SideDrawer />
            <Box
              display="flex"
              justifyContent="space-between"
              w="100%"
              h="91.5vh"
              p="10px"
            >
              <MyChats />
              <Chatbox />
            </Box>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Chatpage;

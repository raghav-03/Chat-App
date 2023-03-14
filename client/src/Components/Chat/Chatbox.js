import { Box } from "@chakra-ui/layout";
import { useSelector } from "react-redux";
import "./styles.css";
import React, { Fragment, useEffect, useState } from "react";
import Loader from "../../Loader/Loader.js";
import SingleChat from "./SingleChat";

const Chatbox = () => {
  const { chat, getchatloading } = useSelector((state) => state.GetChatReducer);

  return (
    <Fragment>
      {Object.keys(chat).length === 0 && getchatloading ? (
        <Loader />
      ) : (
        <Fragment>
          <Box
            display={{
              base: Object.keys(chat).length ? "flex" : "none",
              md: "flex",
            }}
            alignItems="center"
            flexDir="column"
            p={3}
            bg="white"
            w={{ base: "100%", md: "68%" }}
            borderRadius="lg"
            borderWidth="1px"
          >
            <SingleChat />
          </Box>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Chatbox;

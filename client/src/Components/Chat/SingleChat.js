import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import "./styles.css";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../../config/chatlogic";
import React, { Fragment, useEffect, useState } from "react";
import Loader from "../../Loader/Loader.js";
import ProfileModal from "../../Pages/ProfileModal";
import UpdateGroupChatModel from "../../Pages/UpdateGroupChatModel";
import { useSelector, useDispatch } from "react-redux";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { GET_CHAT_RESET } from "../../Redux/Constants/chatConstants";
import {
  sendmessage,
  getmessage,
  clearerr,
} from "../../Redux/Actions/chatAction";
import ScrollableChat from "./ScrollableChat.js";
import Lottie from "react-lottie";
import animationData from "../../Animations/typing.json";

import { socket } from "../../Services/Socket.js";

const SingleChat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [selectedChatCompare, setselectedChatCompare] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();
  const { chat, getchatloading } = useSelector((state) => state.GetChatReducer);
  const { user } = useSelector((state) => state.user);
  const { message, getmessageloading, getmessageerror } = useSelector(
    (state) => state.GETMessageReducer
  );
  const {
    sendmessageloading,
    sendmessageerror,
    messageloading,
    newchat,
    sendmessagesuccess,
  } = useSelector((state) => state.SendMessageReducer);

  const dispatch = useDispatch();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    // socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    // eslint - disable - next - line;
  }, []);

  useEffect(() => {
    setselectedChatCompare(chat);
    dispatch(getmessage(chat._id));
    socket.emit("join chat", chat._id);
  }, [dispatch, chat, sendmessageloading]);

  // useEffect(() => {
  //   if (getchaterror) {
  //     dispatch(clearerr());
  //   }
  // }, [dispatch, getchaterror]);

  useEffect(() => {
    socket.on("message recieved", async (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        // Send Notification
        // if (!notification.includes(newMessageRecieved)) {
        //   setNotification([newMessageRecieved, ...notification]);
        //   setFetchAgain(!fetchAgain);
        // }
      } else {
        if (chat._id === undefined) return;
        if (chat._id === newMessageRecieved.chat._id) {
          dispatch(getmessage(chat._id));
        }
      }
    });
  });

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", chat._id);
      setNewMessage("");
      dispatch(sendmessage(chat._id, newMessage));
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", chat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", chat._id);
        setTyping(false);
      }
    }, timerLength);
  };
  useEffect(() => {
    if (sendmessagesuccess === true) {
      socket.emit("new message", newchat);
      dispatch({ type: "SEND_MESSAGE_RESET" });
    }
  }, [sendmessagesuccess]);
  return (
    <>
      {Object.keys(chat).length ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => dispatch({ type: GET_CHAT_RESET })}
            />

            {!chat.isGroupChat ? (
              <>
                {getSender(user, chat.users)}
                <ProfileModal user={getSenderFull(user, chat.users)} />
              </>
            ) : (
              <>
                {chat.chatName}
                <UpdateGroupChatModel />
              </>
            )}
          </Text>

          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {getchatloading || messageloading || message === undefined ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat />
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              idisplay="first-name"
              isRequired
              mt={3}
            >
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;

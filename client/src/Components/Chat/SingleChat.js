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
  fetchChat,
  clearerr,
  sendmessage,
  getmessage,
  getchatbyid,
  getchatbyidwloading,
  fetchChatwloading,
} from "../../Redux/Actions/chatAction";
import ScrollableChat from "./ScrollableChat.js";
import Lottie from "react-lottie";
import animationData from "../../Animations/typing.json";
import { socket } from "../../Services/Socket.js";
const SingleChat = () => {
  const toast = useToast();

  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [newnotification, Setnewnotification] = useState([]);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const { chat, getchatloading } = useSelector((state) => state.GetChatReducer);
  const { user } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.GETMessageReducer);
  const { notification } = useSelector((state) => state.NotificationReducer);
  const {
    removefromgroupchatloading,
    removefromgroupchaterror,
    removefromgroupsuccess,
  } = useSelector((state) => state.RemoveFromGroupReducer);
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
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", (room) => {
      setIsTyping(true);
    });
    socket.on("stop_typing", (room) => {
      setIsTyping(false);
    });
    socket.on("refreshPage", () => {
      dispatch(fetchChatwloading());
    });
    socket.on("refreshlPage", () => {
      chatreset();
      dispatch(fetchChatwloading());
    });
  }, []);
  useEffect(() => {
    socket.on("message_recieved", (newMessageRecieved) => {
      if (
        !chat ||
        chat._id !== newMessageRecieved.chat._id
        // if chat is not selected or doesn't match current chat
      ) {
        dispatch(fetchChatwloading());
        const tempnotification = notification.filter(
          (item) => item.chat._id !== newMessageRecieved.chat._id
        );
        Setnewnotification([newMessageRecieved, ...tempnotification]);
      } else {
        dispatch(fetchChatwloading());
        dispatch(getmessage(chat._id));
      }
    });
    return function cleanup() {
      socket.off("message_recieved");
    };
  });

  useEffect(() => {
    if (notification.length < newnotification.length) {
      dispatch({ type: "SET_NOTIFICATION", payload: newnotification });
    }
  }, [newnotification]);

  useEffect(() => {
    dispatch(getmessage(chat._id));
    if (chat._id !== undefined) socket.emit("join chat", chat._id);
  }, [chat]);
  useEffect(() => {
    if (sendmessageloading === false) {
      dispatch(getmessage(chat._id));
      dispatch(fetchChatwloading());
    }
  }, [sendmessageloading]);
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop_typing", chat._id);
      setNewMessage("");
      dispatch(sendmessage(chat._id, newMessage));
    }
  };
  const chatreset = () => {
    dispatch({ type: GET_CHAT_RESET });
    socket.emit("leave_chat", chat._id);
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
        socket.emit("stop_typing", chat._id);
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
  useEffect(() => {
    if (sendmessageerror) {
      toast({
        title: sendmessageerror,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      dispatch(clearerr());
    }
  }, [dispatch, sendmessageerror]);
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
              onClick={chatreset}
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
              <div className="messages">{<ScrollableChat />}</div>
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

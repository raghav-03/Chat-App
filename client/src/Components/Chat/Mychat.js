import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useEffect, useState } from "react";
import ChatLoading from "./ChatLoading";
import { Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChat,
  clearerr,
  getchatbyid,
} from "../../Redux/Actions/chatAction";
import GroupModal from "../../Pages/GroupModal";
import { getSender } from "../../config/chatlogic";
const MyChats = () => {
  const [selectedChatId, setSelectedChatId] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();
  const { allchatloading, allchaterror, chats } = useSelector(
    (state) => state.allChatReducer
  );
  const { chaterror, chatloading, chat } = useSelector(
    (state) => state.accesschat
  );
  const { groupchaterror, groupchatloading } = useSelector(
    (state) => state.groupchatReducer
  );
  const { renamegroupchatloading, renamegroupchaterror } = useSelector(
    (state) => state.RenameGroupReducer
  );
  const { addtogroupchatloading, addtogroupchaterror } = useSelector(
    (state) => state.AddToGroupReducer
  );
  const { removefromgroupchatloading, removefromgroupchaterror } = useSelector(
    (state) => state.RemoveFromGroupReducer
  );
  const { user } = useSelector((state) => state.user);
  const getchat = useSelector((state) => state.GetChatReducer);

  useEffect(() => {
    if (allchaterror) {
      toast({
        title: allchaterror,
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      dispatch(clearerr());
    }
    dispatch(fetchChat());
  }, [
    dispatch,
    chaterror,
    chatloading,
    groupchaterror,
    groupchatloading,
    renamegroupchatloading,
    renamegroupchaterror,
    removefromgroupchatloading,
    removefromgroupchaterror,
  ]);

  useEffect(() => {
    dispatch(getchatbyid(selectedChatId));
  }, [
    dispatch,
    selectedChatId,
    renamegroupchatloading,
    renamegroupchaterror,
    addtogroupchatloading,
    addtogroupchaterror,
    removefromgroupchatloading,
    removefromgroupchaterror,
  ]);
  useEffect(() => {
    if (getchat === undefined || getchat.chat === undefined) {
      return;
    }
    if (Object.keys(getchat.chat).length === 0) {
      setSelectedChatId("");
    }
  }, [dispatch, getchat.chat]);
  return (
    <Box
      display={{
        base: selectedChatId ? "none" : "flex",
        md: "flex",
      }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChatId(chat._id)}
                cursor="pointer"
                bg={selectedChatId === chat._id ? "#38B2AC" : "#E8E8E8"}
                color={selectedChatId === chat._id ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(user, chat.users)
                    : chat.chatName}
                </Text>
                {/* 
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )} */}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;

import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserBadgeItem from "../Components/User/UserBadgeItem";
import UserListItem from "../Components/User/UserListItem";
import {
  clearerr,
  searchaction,
  renamegroupchat,
  addtogroupchat,
  removefromgroupchat,
} from "../Redux/Actions/chatAction";

const UpdateGroupChatModal = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { chat, getchatloading } = useSelector((state) => state.GetChatReducer);
  const { user } = useSelector((state) => state.user);
  const { renamegroupchatloading, renamegroupchaterror } = useSelector(
    (state) => state.RenameGroupReducer
  );
  const { addtogroupchatloading, addtogroupchaterror } = useSelector(
    (state) => state.AddToGroupReducer
  );
  const { searcherror, searchloading, users } = useSelector(
    (state) => state.searchusers
  );
  const { removefromgroupchatloading, removefromgroupchaterror } = useSelector(
    (state) => state.RemoveFromGroupReducer
  );
  const handleRename = async () => {
    if (!groupChatName) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    dispatch(renamegroupchat(chat._id, groupChatName));
  };
  useEffect(() => {
    if (addtogroupchaterror) {
      toast({
        title: addtogroupchaterror,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      dispatch(clearerr());
    }
    if (renamegroupchaterror) {
      toast({
        title: renamegroupchaterror,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      dispatch(clearerr());
    }
  }, [
    dispatch,
    addtogroupchaterror,
    removefromgroupchaterror,
    renamegroupchaterror,
  ]);
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    dispatch(searchaction(search));
  };

  const handleAddUser = async (user1) => {
    if (chat.users.find((u) => u._id === user1._id)) {
      toast({
        title: "User Already in group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (chat.groupAdmin !== user._id) {
      toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    dispatch(addtogroupchat(chat._id, user1._id));
  };

  const handleRemove = async (user1) => {
    if (chat.groupAdmin !== user._id && user1._id !== user._id) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    dispatch(removefromgroupchat(chat._id, user1._id));
  };

  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {chat.chatName}
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {chat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={chat.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renamegroupchatloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {searchloading ? (
              <Spinner size="lg" />
            ) : (
              users.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleRemove(user)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;

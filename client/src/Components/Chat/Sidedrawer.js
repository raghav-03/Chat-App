import {
  Box,
  Button,
  Menu,
  MenuButton,
  Text,
  Tooltip,
  MenuDivider,
  MenuList,
  MenuItem,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
  DrawerBody,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { BellIcon, Search2Icon, ChevronDownIcon } from "@chakra-ui/icons";
import { Effect } from "react-notification-badge";
import NotificationBadge from "react-notification-badge";

import { Avatar } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import React, { Fragment, useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { logoutaction, clearerr } from "../../Redux/Actions/userAction";
import { searchaction } from "../../Redux/Actions/chatAction";
import { useToast } from "@chakra-ui/toast";
import { useHistory } from "react-router";
import ProfileModal from "../../Pages/ProfileModal";
import ChatLoading from "./ChatLoading";
import UserListItem from "../User/UserListItem";
import { accessChat } from "../../Redux/Actions/chatAction";
import { getSender } from "../../config/chatlogic";

import {
  fetchChat,
  sendmessage,
  getmessage,
  getchatbyid,
} from "../../Redux/Actions/chatAction";
const Sidedrawer = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const history = useHistory();
  const { searcherror, searchloading, users, resetusers } = useSelector(
    (state) => state.searchusers
  );
  const { error, loading, user } = useSelector((state) => state.user);
  const { chaterror, chatloading, chat } = useSelector(
    (state) => state.accesschat
  );
  const { notification } = useSelector((state) => state.NotificationReducer);

  const createchat = async (userId) => {
    dispatch(accessChat(userId));
    onClose();
  };

  const [search, setSearch] = useState("");
  const logoutHandler = async (e) => {
    e.preventDefault();
    dispatch(logoutaction());
  };

  const handleSearch = async (e) => {
    if (!search) {
      toast({
        title: "Please Enter Something to Search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    dispatch(searchaction(search));
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (searcherror) {
      toast({
        title: searcherror,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      dispatch(clearerr());
    }
    if (chaterror) {
      toast({
        title: chaterror,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      dispatch(clearerr());
    }
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
  }, [dispatch, error, searcherror, chaterror, toast]);
  useEffect(() => {
    if (resetusers === true) {
      setSearch([]);
    }
  }, [resetusers]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="white"
            w="100%"
            p="5px 10px 5px 10px"
            borderWidth="5px"
          >
            <Tooltip
              label="Search Users to chat"
              hasArrow
              placement="bottom-end"
            >
              <Button variant="ghost" onClick={onOpen}>
                <Search2Icon />
                <Text display={{ base: "none", md: "flex" }} px={4}>
                  Search User
                </Text>
              </Button>
            </Tooltip>
            <Text fontSize="2xl" fontFamily="Work sans">
              Talk-A-Tive
            </Text>
            <div>
              <Menu>
                <MenuButton p={1}>
                  <NotificationBadge
                    count={notification.length}
                    effect={Effect.SCALE}
                  />
                  <BellIcon fontSize="2xl" m={1} />
                </MenuButton>
                <MenuList pl={2}>
                  {!notification.length && "No New Messages"}
                  {notification.map((notif) => (
                    <MenuItem
                      key={notif._id}
                      onClick={() => {
                        // change chat to given chat
                        // setSelectedChat(notif.chat);
                        dispatch(getchatbyid(notif.chat._id));
                        const newnotification = notification.filter(
                          (n) => n !== notif
                        );
                        dispatch({
                          type: "SET_NOTIFICATION",
                          payload: newnotification,
                        });
                      }}
                    >
                      {notif.chat.isGroupChat
                        ? `New Message in ${notif.chat.chatName}`
                        : `New Message from ${getSender(
                            user,
                            notif.chat.users
                          )}`}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton
                  as={Button}
                  bg="white"
                  rightIcon={<ChevronDownIcon />}
                >
                  <Avatar
                    size="sm"
                    cursor="pointer"
                    name={user.name}
                    src={user.pic}
                  />
                </MenuButton>
                <MenuList>
                  <ProfileModal user={user}>
                    <MenuItem>My Profile</MenuItem>
                  </ProfileModal>
                  <MenuDivider />
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </div>
          </Box>
          <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
              <DrawerBody>
                <Box display="flex" pb={2}>
                  <Input
                    placeholder="Search by name or email"
                    mr={2}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button onClick={handleSearch}>Go</Button>
                </Box>
                {searchloading ? (
                  <ChatLoading />
                ) : (
                  users?.map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => createchat(user._id)}
                    />
                  ))
                )}
                {chatloading && <Spinner ml="auto" display="flex" />}
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Sidedrawer;

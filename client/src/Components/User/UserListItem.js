import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useDispatch, useSelector } from "react-redux";
import { accessChat } from "../../Redux/Actions/chatAction";

const UserListItem = ({ user }) => {
  const dispatch = useDispatch();
  const createchat = async (userId) => {
    dispatch(accessChat(userId));
  };

  return (
    <Box
      onClick={() => createchat(user._id)}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;

import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";
import { useSelector, useDispatch } from "react-redux";

const UserBadgeItem = ({ guser, handleFunction, admin }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor="pointer"
      onClick={handleFunction}
    >
      {guser.name}
      {admin === guser._id && <span> (Admin)</span>}
      {admin === user._id && <CloseIcon pl={1} />}
    </Badge>
  );
};

export default UserBadgeItem;

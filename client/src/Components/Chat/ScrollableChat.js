import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../config/chatlogic";
import { useSelector, useDispatch } from "react-redux";

const ScrollableChat = () => {
  const { chat, getchatloading } = useSelector((state) => state.GetChatReducer);
  const { user } = useSelector((state) => state.user);
  const { message, getmessageloading, getmessageerror } = useSelector(
    (state) => state.GETMessageReducer
  );
  const { sendmessageloading, sendmessageerror } = useSelector(
    (state) => state.SendMessageReducer
  );

  return (
    <ScrollableFeed>
      {message &&
        message.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(message, m, i, user._id) ||
              isLastMessage(message, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(message, m, i, user._id),
                marginTop: isSameUser(message, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.sender._id !== user._id && (
                <span style={{ color: "grey" }}>{m.sender.name} </span>
              )}

              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;

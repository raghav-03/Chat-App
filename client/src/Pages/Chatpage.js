import React, { useEffect, useState } from "react";
import axios from "axios";
const Chatpage = () => {
  const [chats, setchat] = useState([]);
  const fetchchat = async () => {
    const res = await axios.get("/api/chat");
    setchat(res.data);
  };
  useEffect(() => {
    fetchchat();
  }, []);
  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default Chatpage;

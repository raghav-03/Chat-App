const Message = require("../models/Messagemodel");
const User = require("../models/Usermodel");
const Chat = require("../models/Chatmodel");
exports.sendmsg = async (req, res) => {
  try {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
      return res.status(400).json({
        success: false,
        message: "Invalid Data Passed",
      });
    }
    var chat = await Chat.findById(chatId).populate("users", "-password");
    const check = await chat.users.filter(
      (item) => JSON.stringify(item._id) === JSON.stringify(req.User._id)
    );
    if (check.length === 0) {
      return res.status(400).json({
        success: false,
        message: "You are not authorized to send message in this chat",
      });
    }
    var newmsg = await Message.create({
      content: content,
      chat: chatId,
      sender: req.User._id,
    });
    newmsg = await newmsg.populate("sender", "name pic");
    newmsg = await newmsg.populate("chat");

    newmsg = await User.populate(newmsg, {
      path: "chat.users",
      select: "name pic email",
    });
    await Chat.findByIdAndUpdate(chatId, { latestMessage: newmsg });
    // connsole.log(newmsg);
    return res.status(200).json({
      success: true,
      data: newmsg,
    });
  } catch (e) {
    console.log(e);

    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

exports.allmsgs = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    return res.status(200).json({
      success: true,
      messages: messages,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

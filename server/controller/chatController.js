const Chat = require("../models/Chatmodel");
const User = require("../models/Usermodel");

exports.getchatbyid = async (req, res) => {
  try {
    const { chatId } = req.body;
    if (!chatId) {
      return res.status(400).json({
        success: false,
        message: "ChatId param not sent with request",
      });
    }
    var chat = await Chat.findById(chatId).populate("users", "-password");
    chat = await User.populate(chat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
    return res.status(200).json({
      success: true,
      chat: chat,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

exports.accesschat = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId param not sent with request",
      });
    }
    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.User._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (isChat.length > 0) {
      return res.status(200).json({
        success: true,
        chat: isChat[0],
      });
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.User._id, userId],
      };
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({
        _id: createdChat._id,
      }).populate("users", "-password");
      return res.status(200).json({
        success: true,
        chat: FullChat,
      });
    }
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

exports.fetchchat = async (req, res) => {
  try {
    var allchat = await Chat.find({
      users: { $elemMatch: { $eq: req.User._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    allchat = await User.populate(allchat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    return res.status(200).json({
      success: true,
      allchats: allchat,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

exports.creategroupchat = async (req, res) => {
  try {
    if (!req.body.name || !req.body.users) {
      return res.status(400).json({
        success: false,
        message: "Name and Users are required",
      });
    }
    var users = JSON.parse(req.body.users);
    users.push(req.User._id);
    if (users.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Minimum 3 users required to form a group",
      });
    }
    var chatData = {
      chatName: req.body.name,
      isGroupChat: true,
      users: users,
      groupAdmin: req.User._id,
    };
    const createdChat = await Chat.create(chatData);
    const FullChat = await Chat.findOne({
      _id: createdChat._id,
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    return res.status(200).json({
      success: true,
      chat: FullChat,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

exports.renamegroupchat = async (req, res) => {
  try {
    const groupchat = await Chat.findByIdAndUpdate(
      req.body.chatId,
      {
        chatName: req.body.name,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      chat: groupchat,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};
exports.addtogroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    return res.status(200).json({
      success: true,
      chat: added,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};
exports.removefromgroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(200).json({
      success: true,
      chat: removed,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

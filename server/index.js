const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { notFound } = require("./middlewares/errorhandler");
const cloudinary = require("cloudinary");
const cookieParser = require("cookie-parser");
const path = require("path");

app.use(express.json()); // to accept json data from frontend
app.use(cors());
dotenv.config();
app.use(cookieParser()); // need to parse the cookies
const mongodb = require("./config/db.js");
mongodb();

// app.get("/", (req, res) => res.send("hey"));
app.use("/api/user", require("./routes/userRoutes.js"));

app.use("/api/chat", require("./routes/chatRoutes.js"));
app.use("/api/message", require("./routes/messgaeRoute"));

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});
app.use(notFound); // to handle 404 error

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT || 3601, () =>
  console.log(`Sever Running on port ${process.env.PORT || 3601}`)
);
const io = require("socket.io")(server, {
  pingtimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", async (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", async (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", async (room) => {
    socket.in(room).emit("typing", room);
  });
  socket.on("stop_typing", async (room) => {
    socket.in(room).emit("stop_typing", room);
  });
  socket.on("new message", async (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message_recieved", newMessageRecieved);
    });
  });
  socket.on("refresh", async (chat) => {
    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      socket.in(user._id).emit("refreshPage");
    });
  });
  socket.on("leave_chat", async (room) => {
    socket.leave(room);
    console.log("User Leaved Room: " + room);
  });
  socket.off("setup", (userData) => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

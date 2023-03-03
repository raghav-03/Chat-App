const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { chats } = require("./data/data.js");
const { notFound } = require("./middlewares/errorhandler");
const cloudinary = require("cloudinary");

app.use(express.json()); // to accept json data from frontend
app.use(cors());
dotenv.config();

const mongodb = require("./config/db.js");
mongodb();

app.get("/", (req, res) => res.send("hey"));
app.use("/user", require("./routes/userRoutes.js"));

app.get("/api/chat", (req, res) => res.send(chats));

app.use(notFound); // to handle 404 error

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.Port || 3602, () =>
  console.log(`Sever Running on port ${process.env.Port || 3602}`)
);

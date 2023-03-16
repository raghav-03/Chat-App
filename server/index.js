const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { notFound } = require("./middlewares/errorhandler");
const cloudinary = require("cloudinary");
const cookieParser = require("cookie-parser");

app.use(express.json()); // to accept json data from frontend
app.use(cors());
dotenv.config();
app.use(cookieParser()); // need to parse the cookies
const mongodb = require("./config/db.js");
mongodb();

app.get("/", (req, res) => res.send("hey"));
app.use("/user", require("./routes/userRoutes.js"));

app.use("/chat", require("./routes/chatRoutes.js"));
app.use("/message", require("./routes/messgaeRoute"));

app.use(notFound); // to handle 404 error

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.Port || 3601, () =>
  console.log(`Sever Running on port ${process.env.Port || 3601}`)
);

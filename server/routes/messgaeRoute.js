const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/checkauth");
const messageController = require("../controller/messageController");

router.post("/", middleware.islogin, messageController.sendmsg);
router.get("/:chatId", middleware.islogin, messageController.allmsgs);

module.exports = router;

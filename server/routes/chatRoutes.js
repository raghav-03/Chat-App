const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/checkauth");
const charcontroller = require("../controller/chatController");

router.post("/", middleware.islogin, charcontroller.accesschat);
router.get("/", middleware.islogin, charcontroller.fetchchat);
router.post(
  "/create-group",
  middleware.islogin,
  charcontroller.creategroupchat
);

router.put("/rename-group", middleware.islogin, charcontroller.renamegroupchat);
router.put("/addtogroup", middleware.islogin, charcontroller.addtogroup);
router.put(
  "/removefromgroup",
  middleware.islogin,
  charcontroller.removefromgroup
);

module.exports = router;

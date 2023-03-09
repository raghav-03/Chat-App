const express = require("express");
const router = express.Router();
var middleware = require("../middlewares/checkauth");

var usercontroller = require("../controller/userController");

router.post("/signup", usercontroller.signup);
router.get("/logout", usercontroller.logout);
router.get("/userdetail", middleware.islogin, usercontroller.getuserdetail);
router.post("/login", usercontroller.login);
router.get("/", middleware.islogin, usercontroller.allusers);
module.exports = router;

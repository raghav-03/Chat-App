const express = require("express");
const router = express.Router();

var usercontroller = require("../controller/userController");

router.post("/signup", usercontroller.signup);
router.get("/logout", usercontroller.logout);
router.post("/login", usercontroller.login);

module.exports = router;

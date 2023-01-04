var express = require('express');
var router = express.Router();
//
var list = require("./trade_list");
var send = require("./trade_send");
var friend_list = require("./friend_list");
var user_register = require("./user_register");
var admin = require("./admin")
var gacha = require("./gacha")

router.use(express.static('public'));
router.use("/admin", admin)
router.use("/user_register", user_register);
router.use("/friend_list", friend_list);
router.use("/list", list);
router.use("/send", send);
router.use("/gacha", gacha);

module.exports = router;

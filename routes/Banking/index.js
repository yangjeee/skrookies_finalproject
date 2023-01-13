var express = require("express");
var router = express.Router();
//
var list = require("./trade_list");
var send = require("./trade_send");
var friend_list = require("./friend_list");
var user_register = require("./user_register");
var admin = require("./admin");
// var gacha = require("./gacha");
var authorization = require("./authorization");
// var invest = require("./invest");
// var bitcoin = require("./bitcoin");
var search = require("./search");
var searchc = require("./searchc");
var realdata;

router.use(express.static("public"));
router.use("/admin", admin);
router.use("/user_register", user_register);
router.use("/friend_list", friend_list);
router.use("/list", list);
router.use("/send", send);
// router.use("/gacha", gacha);
router.use("/authorization", authorization);
// router.use("/invest", invest);
// router.use("/bitcoin", bitcoin);
router.use("/search", search);
router.use("/searchc", searchc);

module.exports = router;

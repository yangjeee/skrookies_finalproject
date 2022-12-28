var express = require('express');
var router = express.Router();
//
var Job = require("./bankJob");
var friend_list = require("./friend_list");
var user_register =require("./user_register");
var admin = require("./admin")

router.use(express.static( 'public'));
router.use("/job", Job);
router.use("/admin", admin)
router.use("/user_register", user_register);
router.use("/friend_list", friend_list);

module.exports = router;

var express = require('express');
var router = express.Router();
//
var admin = require("./admin");
// var approve = require("./approve");
// var pending = require("./pending");
// var view = require("./view");
//
//
router.use("/admin", admin);
// router.use("/approve", approve);
// router.use("/pending", pending);
// router.use("/view", view); // Give options on FE to see pending list as well
//
module.exports = router;

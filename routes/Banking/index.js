var express = require('express');
var router = express.Router();
//
var Job = require("./bankJob");
var friend_list = require("./friend_list");

router.use(express.static( 'public'));
router.use("/job", Job);
router.use("/friend_list", friend_list);

module.exports = router;

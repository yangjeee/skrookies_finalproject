var express = require('express');
var router = express.Router();
//
var Job = require("./bankJob");
var list = require("./trade_list");
var send = require("./trade_send");

router.use(express.static( 'public'));
router.use("/job", Job);
router.use("/list", list);
router.use("/send", send);

module.exports = router;

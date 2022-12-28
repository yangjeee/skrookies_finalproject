var express = require('express');
var router = express.Router();
//
var Job = require("./bankJob");
var list = require("./trade_list");

router.use(express.static( 'public'));
router.use("/job", Job);
router.use("/list", list);

module.exports = router;

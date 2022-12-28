var express = require('express');
var router = express.Router();
//
var Job = require("./bankJob");

router.use(express.static( 'public'));
router.use("/job", Job);

module.exports = router;

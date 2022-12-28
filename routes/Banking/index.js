var express = require('express');
var router = express.Router();
//
var Job = require("./bankJob");
var admin = require("./admin")

router.use(express.static( 'public'));
router.use("/job", Job);
router.use("/admin", admin)

module.exports = router;

var express = require('express');
var router = express.Router();

var main = require("./main");
router.use("/", main)

module.exports = router;
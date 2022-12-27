var express = require('express');
var router = express.Router();

var deleteBoard = require("./deleteBoard")
var editBoard = require("./editBoard")
var getBoard = require("./getBoard")
// var searchBoards = require("./searchBoards")
var viewBoard = require("./viewBoard")
var writeBoard = require("./writeBoard")

router.use('/deleteBoard', deleteBoard);
router.use('/editBoard', editBoard);
router.use('/getBoard', getBoard);
// router.use('/searchBoards', searchBoards);
router.use('/viewBoard', viewBoard);
router.use('/writeBoard', writeBoard);

module.exports = router;

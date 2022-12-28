var express = require('express');
var router = express.Router();

var login = require("./login");
var signup = require("./signup");
var friend = require("./friend");
var changePass = require("./changePass")


router.use('/login', login);
router.use('/signup', signup);
router.use('/friend', friend);
router.use('/changePass', changePass);


module.exports = router;
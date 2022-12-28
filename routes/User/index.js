var express = require('express');
var router = express.Router();

var login = require("./login");
var signup = require("./signup");
var friend = require("./friend");
var logout = require("./logout");

router.use('/login', login);
router.use('/signup', signup);
router.use('/friend', friend);
router.use('/logout', logout);


module.exports = router;
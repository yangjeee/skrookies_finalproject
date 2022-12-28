var express = require('express');
var router = express.Router();

var login = require("./login");
var signup = require("./signup");
var friend = require("./friend");


router.use('/login', login);
router.use('/signup', signup);
router.use('/friend', friend);


module.exports = router;
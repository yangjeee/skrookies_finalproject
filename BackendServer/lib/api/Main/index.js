var express = require('express');
var router = express.Router();

var login = require("./login");
var register = require("./register");
var profile = require("./profile");
var changePassword = require("./changePassword");
var main = require("./main");

router.use('/login', login);
router.use('/register', register);
router.use('/profile', profile);
router.use("/change-password", changePassword);
router.use("/main", main);

module.exports = router;

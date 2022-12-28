var express = require('express');
var router = express.Router();
//
var Job = require("./bankJob");
var user_register =require("./user_register");
var admin = require("./admin")

router.use(express.static( 'public'));
router.use("/job", Job);
router.use("/admin", admin)
router.use("/user_register", user_register);


module.exports = router;

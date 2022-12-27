var express = require('express');
var router = express.Router();

const Response = require("../Response")
const {encryptResponse,decryptRequest} = require('../../middlewares/crypt')
const axios = require("axios");
const { SUCCESS } = require('../../middlewares/statusCodes');
// const myStorage = window.localStorage;


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render("login");
});


router.post('/', function(req, res, next) {
    const {username, password} = req.body;
    const baseData=`{"username": "${username}", "password": "${password}"}`
    const enData = encryptResponse(baseData);
    
    axios({
        method: "post",
        url: "http://15.152.81.150:3000/api/user/login",
        data:enData
    }).then((data)=>{
    
        console.log("data : ", decryptRequest(data.data))
        document.addEventListener("DOMContentLoaded",function () {
            console.log(localStorage)
        })
        // cookie.default.set("token", decryptRequest(data.data).data.accessToken)
    })

    res.render("login");
});

module.exports = router;

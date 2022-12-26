var express = require('express');
var router = express.Router();
const {encryptResponse,decryptRequest} = require('../../middlewares/crypt')
const axios = require("axios")
// const myStorage = window.localStorage;

/* GET users listing. */
router.get('/', function(req, res, next) {

    res.render("login");
});


router.post('/post', function(req, res, next) {
    console.log("login.js : ",req.body)
    const {username, password} = req.body;
    console.log(username, password)
    baseData=`{"username": "${username}", "password": "${password}"}`
    console.log("basedata : ",baseData)
    const enData = encryptResponse(baseData);
    
    axios({
        method: "post",
        url: "http://15.152.81.150:3000/api/user/login",
        data:enData
    }).then((data)=>{
        // console.log(decryptRequest(data))
    
        // myStorage.setItem("accessToken", data.data.accessToken);
        console.log("data : ", decryptRequest(data.data))

    })
    res.render("login");
});
module.exports = router;

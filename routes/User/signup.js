var express = require('express');
var router = express.Router();
const {encryptResponse,decryptRequest} = require('../../middlewares/crypt')
const axios = require("axios")

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("login.js : ",req.body)
    res.render("signup");
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
        url: "http://15.152.81.150:3000/api/user/register",
        data:enData
    }).then((data)=>{
        // console.log(decryptRequest(data))
        console.log("data : ", decryptRequest(data.data))
        
    })
    res.render("signup");
});


module.exports = router;

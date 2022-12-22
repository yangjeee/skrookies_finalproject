var express = require('express');
var router = express.Router();

var axios = require("axios");
var { encryptResponse, decryptRequest } = require("../../middlewares/crypt");
/* GET users listing. */
router.post('/', function(req, res, next) {
    const {username, password} = req.body;
    console.log(username, password)
    console.log(req.body)
    baseData=`{"username": "${username}", "password": "${password}"}`
    console.log("basedata : ",baseData)
    const enData = encryptResponse(baseData);

    console.log("endata : ",enData)

    axios({
        method: "post",
        url: "http://15.152.81.150:3000/api/user/register",
        data: enData
    }).then((data)=>{
        // console.log(decryptRequest(data))
        console.log("data : ", decryptRequest(data.data))
    })

    // return res.redirect("/user/signup")
});

module.exports = router;

var express = require('express');
var router = express.Router();

var axios = require("axios");
var { encryptResponse, decryptRequest } = require("../../middlewares/crypt");
/* GET users listing. */
router.post('/', function(req, res, next) {
    const {username, password, account_number} = req.body;
    console.log(username, password, account_number)
    baseData=`{"username": "${username}", "password": "${password}", "account_number": "${account_number}"}`
    console.log("basedata : ",baseData)
    const enData = encryptResponse(baseData);

    console.log("endata : ",enData)

    // axios({
    //     method: "post",
    //     url: "http://15.152.81.150:3000/api/user/register",
    //     data: enData
    // }).then((data)=>{
    //     console.log("data : ", decryptRequest(data.data))
    // })
    //로그인
    axios({
        method: "post",
        url: "http://15.152.81.150:3000/api/user/login",
        data: enData
    }).then((data)=>{
        // console.log(decryptRequest(data))
        //여기서 토큰이 바디에 나옴
        console.log("data : ", decryptRequest(data.data))
    })
    //balance view
    // axios({
    //     method: "post",
    //     url: "http://15.152.81.150:3000/api/balance/view",
    //     headers: {"authorization": "1 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEyMyIsImlzX2FkbWluIjpmYWxzZSwiaWF0IjoxNjcxNjg3MjU3fQ.dcCSrCfU6mDJcLGgtib-LxivIWH4Q1PU0Y22lXG9gcA"},
    //     data: enData
    // }).then((data)=>{
    //     // console.log(decryptRequest(data))
    //     console.log("data : ", decryptRequest(data.data))
    // })

    // return res.redirect("/user/signup")
});

module.exports = router;
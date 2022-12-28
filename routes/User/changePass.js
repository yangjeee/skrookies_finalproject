var express = require('express');
const axios = require("axios");
const {decryptRequest, decryptEnc, encryptResponse} = require("../../middlewares/crypt");
var router = express.Router();

router.get("/", (req, res) => {
    if (!req.cookies.Token) {
        res.redirect("/")
    } else {
        res.render("changePass")
    }
})

router.post("/", (req, res) => {
    const {password, new_password} = req.body
    const req_data = `{"password" : ${password},"new_password" : ${new_password}}`
    const cookie = decryptEnc(req.cookies.Token)
    let resStatus = ""
    let resMessage = ""

    axios({
        method: "post",
        url: "http://15.152.81.150:3000/api/user/change-password",
        headers: {"authorization": "1 " + cookie},
        data: encryptResponse(req_data)
    }).then((data)=>{
        resStatus = decryptRequest(data.data).status
        resMessage = decryptRequest(data.data).data.message
        console.log(resStatus, resMessage)
        if(resStatus.code === 200){
            res.redirect("/")
        }
        else{
            console.log(resMessage)
            res.render("changePass",{message:resMessage})
        }
    });
})

module.exports = router;
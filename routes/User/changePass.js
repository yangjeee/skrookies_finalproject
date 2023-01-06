var express = require('express');
const axios = require("axios");
const {decryptRequest, decryptEnc, encryptResponse} = require("../../middlewares/crypt");
const Response = require("../../middlewares/Response");
const sha256 = require("js-sha256")
var router = express.Router();
const checkCookie = require("../../middlewares/checkCookie")

router.get("/", (req, res) => {
    if (!req.cookies.Token) {
        res.redirect("/")
    } else {
        const cookie = decryptEnc(req.cookies.Token);
        axios({
            method: "post",
            url: api_url + "/api/User/profile",
            headers: {"authorization": "1 " + cookie}
        }).then((data) => {
            // console.log(data.data);
            const r = new Response();
            const resStatus = decryptRequest(data.data).status;
            const resData = decryptRequest(data.data).data;

            r.status = resStatus
            r.data = resData

            res.render("temp/changePass", {u_data: r.data.username});
        });
    }
})

router.post("/", checkCookie, (req, res) => {
    const {password, new_password} = req.body
    const sha256Pass = sha256(password)
    const sha256Newpass = sha256(new_password)
    const req_data = `{"password" : "${sha256Pass}","new_password" : "${sha256Newpass}"}`
    const cookie = req.cookies.Token;
    let resStatus = ""
    let resMessage = ""
    console.log(req.body)
    axios({
        method: "post",
        url: api_url + "/api/User/change-password",
        headers: {"authorization": "1 " + cookie},
        data: encryptResponse(req_data)
    }).then((data) => {
        console.log(data.data)
        resStatus = decryptRequest(data.data).status
        resMessage = decryptRequest(data.data).data.message
        console.log(resStatus, resMessage)
        if (resStatus.code === 200) {
            return res.send("<script>alert('비밀번호가 변경되었습니다.');location.href = \"/user/login\";</script>");
        } else {
            console.log(resMessage)
            res.render("temp/changePass", {message: resMessage})
        }
    });
})

module.exports = router;
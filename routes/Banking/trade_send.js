var express = require('express');
var router = express.Router();
const axios = require("axios");
const profile = require("../../middlewares/profile")
const {decryptRequest, encryptResponse, decryptEnc} = require("../../middlewares/crypt")
const checkCookie = require("../../middlewares/checkCookie")

router.get("/", checkCookie, async (req, res) => {
    const cookie = req.cookies.Token;
    profile(cookie).then(data => {

        res.render("Banking/trade_send", {pending: data, select: "send"});
    })
})

router.post('/', checkCookie, function (req, res, next) {
    const cookie = req.cookies.Token;

    let json_data = {};

    json_data['to_account'] = parseInt(req.body.to_account);   //데이터가 숫자로 들어가야 동작함
    json_data['amount'] = parseInt(req.body.amount);

    const en_data = encryptResponse(JSON.stringify(json_data));// 객체를 문자열로 반환 후 암호화
    console.log(en_data)
    // console.log("endata : ",enData)

    axios({
        method: "post",
        url: api_url + "/api/balance/transfer",
        headers: {"authorization": "1 " + cookie},
        data: en_data
    }).then((data) => {
        console.log(decryptRequest(data.data));
    });

    res.send("<script>location.href = \"/bank/list\";</script>");
});


module.exports = router;
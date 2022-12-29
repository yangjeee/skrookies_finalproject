var express = require('express');
var router = express.Router();
var axios = require("axios");
var {encryptResponse, decryptRequest, decryptEnc} = require("../../middlewares/crypt");
const checkCookie = require("../../middlewares/checkCookie")

router.get('/', checkCookie, function (req, res, next) {
    const cookie = req.cookies.Token;
    axios({
        method: "post",
        url: api_url + "/api/transactions/view", // URL 수정 해야 됨
        headers: {"authorization": "1 " + cookie}
        // data: enData
        // 데이터 안씀
    }).then((data) => {
        de_data = decryptRequest(data.data);
        console.log(de_data);
        // result = JSON.stringify(de_data); 
        row = de_data.data;
        var html_data = "<table><tr><th>송금자</th><th>수취인</th><th>금액</th></tr>";

        row.forEach(function (i) {
            html_data += "<tr><td>" + i.from_account + "</td><td>" + i.to_account + "</td><td>" + i.amount + "</td></tr>";
        })

        html_data += "</table>";
        return res.render("Transactions/view", {html: html_data});

    }).catch(function (error) {
        var html_data = "<h2>내용을 불러올 수 없습니다.</h2>";
        return res.render("Transactions/view", {html: html_data});
    });
});


module.exports = router;

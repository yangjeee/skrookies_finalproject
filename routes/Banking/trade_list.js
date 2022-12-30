var express = require('express');
var router = express.Router();
const axios = require("axios");
const profile = require("../../middlewares/profile")
const {decryptRequest, encryptResponse, decryptEnc} = require("../../middlewares/crypt")
const checkCookie = require("../../middlewares/checkCookie")

router.get("/", checkCookie, async (req, res) => {
    const cookie = req.cookies.Token;

    profile(cookie).then((data) => {
        axios({
            method: "post",
            url: api_url + "/api/transactions/view", // URL 수정 해야 됨
            headers: {"authorization": "1 " + cookie}
            // data: enData
            // 데이터 안씀
        }).then((data2) => {
            de_data = decryptRequest(data2.data);
            console.log(de_data);

            row = de_data.data;
            var html_data = "<thead><tr><th>송금자</th><th>수취인</th><th>금액</th></tr></thead>";

            row.forEach(function (i) {
                html_data += "<tr><td>" + i.from_account + "</td><td>" + i.to_account + "</td><td>" + i.amount + "</td></tr>";
            })

            return res.render("Banking/trade_list", {pending: data, html: html_data, select: "list"});

        }).catch(function (error) {
            var html_data = "<h2>내용을 불러올 수 없습니다.</h2>";
            return res.render("Banking/trade_list", {pending: data, html: html_data, select: "list"});
        });

        // res.render("Banking/trade_list",{pending:data})
    })
})

module.exports = router;
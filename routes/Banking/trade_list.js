var express = require('express');
var router = express.Router();
const axios = require("axios");
const profile = require("../../middlewares/profile")
const {decryptRequest} = require("../../middlewares/crypt")
const checkCookie = require("../../middlewares/checkCookie")
var {simpletime} = require('../../middlewares/seoultime');

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
            let de_data = decryptRequest(data2.data);
            let row = de_data.data;
            var html_data = ` <form id="send" class="get" action="/bank/search" method="POST">
            검색시작일&nbsp;&nbsp;<input type="date" id="start" name="tripstart"
            value="${simpletime}"
            min="2023-01-01" max="${simpletime}">&nbsp;&nbsp;
            검색종료일&nbsp;&nbsp;<input type="date" id="end" name="tripend"
            value="${simpletime}"
            min="2023-01-01" max="${simpletime}">&nbsp;&nbsp;
            <input type ="submit" value ="검색">
            </form>
            <tr><th>송금자</th><th>수취인</th><th>금액</th><th>시간</th></tr></thead>`;

            row.forEach(function (i) {
                var temp = i.sendtime;
                html_data += "<tr><td>" + i.from_account + "</td><td>" + i.to_account + "</td><td>" + i.amount + "</td><td>" + temp.substring(0, temp.length - 5);
                +"</td></tr>";
            })

            return res.render("Banking/trade_list", {pending: data, html: html_data, select: "list"});
        }).catch(function (error) {
            var html_data = "<h2>내용을 불러올 수 없습니다.</h2>";

            return res.render("Banking/trade_list", {pending: data, html: html_data, select: "list"});
        });
    })
});

module.exports = router;
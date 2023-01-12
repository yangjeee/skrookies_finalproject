var express = require('express');
var router = express.Router();
const axios = require("axios");
const profile = require("../../middlewares/profile")
const {decryptRequest, encryptResponse, decryptEnc} = require("../../middlewares/crypt")
const checkCookie = require("../../middlewares/checkCookie")
var {seoultime, simpletime} = require('../../middlewares/seoultime');

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
            var html_data = `검색시작일&nbsp;&nbsp;<input type="date" id="start" name="tripstart"
            value="${simpletime}"
            min="2023-01-01" max="${simpletime}">&nbsp;&nbsp;
            검색종료일&nbsp;&nbsp;<input type="date" id="end" name="tripend"
            value="${simpletime}"
            min="2023-01-01" max="${simpletime}">&nbsp;&nbsp;
            <input type ="submit" value ="검색">
            </form>
            <tr><th>송금자</th><th>수취인</th><th>금액</th><th>시간</th></tr></thead>`;

            row.forEach(function (i) {
                var temp = i.sendtime ;
                html_data += "<tr><td>" + i.from_account + "</td><td>" + i.to_account + "</td><td>" + i.amount + "</td><td>" + temp.substring(0, temp.length - 5); + "</td></tr>" ;
            })

            return res.render("Banking/trade_list", {pending: data, html: html_data, select: "list"});

        }).catch(function (error) {
            var html_data = "<h2>내용을 불러올 수 없습니다.</h2>";
            return res.render("Banking/trade_list", {pending: data, html: html_data, select: "list"});
        });

        // res.render("Banking/trade_list",{pending:data})
    })
});

router.get("/search", checkCookie, async (req, res) => {
    const cookie = req.cookies.Token;

    profile(cookie).then((data) => {
        axios({
            method: "post",
            url: api_url + "/api/transactions/view/search", // URL 수정 해야 됨
            headers: {"authorization": "1 " + cookie},
            data: { // 서버에서 req.body.{} 로 확인할 수 있다.
                tripstart: req.query.tripstart,
                tripend: req.query.tripend
              },
            // data: enData
            // 데이터 안씀
        }).then((data2) => {
            de_data = decryptRequest(data2.data);
            console.log(de_data);

            row = de_data.data;
            var html_data2 = `검색시작일&nbsp;&nbsp;<input type="date" id="start" name="trip-start"
            value="${simpletime}"
            min="2023-01-01" max="${simpletime}">&nbsp;&nbsp;
            검색종료일&nbsp;&nbsp;<input type="date" id="end" name="trip-end"
            value="${simpletime}"
            min="2023-01-01" max="${simpletime}">&nbsp;&nbsp;
            <input type ="submit" value ="검색">
            </form>
            <tr><th>송금자</th><th>수취인</th><th>금액</th><th>시간</th></tr></thead>`;

            row.forEach(function (i) {
                html_data2 += "<tr><td>" + i.from_account + "</td><td>" + i.to_account + "</td><td>" + i.amount + "</td><td>" + i.sendtime + "</td></tr>" ;
            })

            return res.render("Banking/trade_list", {pending: data, html: html_data2, select: "list"});

        }).catch(function (error) {
            var html_data2 = "<h2>내용을 불러올 수 없습니다.</h2>";
            return res.render("Banking/trade_list_search", {pending: data, html: html_data2, select: "list"});
        });

        // res.render("Banking/trade_list",{pending:data})
    })
});


module.exports = router;
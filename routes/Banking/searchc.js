var express = require('express');
var router = express.Router();
const profile = require("../../middlewares/profile")
const checkCookie = require("../../middlewares/checkCookie")
var {
    simpletime
} = require('../../middlewares/seoultime');

router.get("/", checkCookie, async (req, res) => {
    const cookie = req.cookies.Token;
    profile(cookie).then((data) => {
        var html_data2 = `  
            검색시작일&nbsp;&nbsp;<input type="date" id="start" name="tripstart"
            min="2023-01-01" max="${simpletime}">&nbsp;&nbsp;
            검색종료일&nbsp;&nbsp;<input type="date" id="end" name="tripend"
            min="2023-01-01" max="${simpletime}">&nbsp;&nbsp;
            <input type ="submit" value ="검색">
            </form>
            <tr><th>송금자</th><th>수취인</th><th>금액</th><th>시간</th></tr></thead>`;

        (global.realdata).forEach(function (i) {
            html_data2 += "<tr><td>" + i.from_account + "</td><td>" + i.to_account + "</td><td>" + i.amount + "</td><td>" + i.sendtime + "</td></tr>";
        })

        res.render("Banking/search", {
            pending: data,
            html: html_data2,
            select: "list"
        });

    });
});
module.exports = router;

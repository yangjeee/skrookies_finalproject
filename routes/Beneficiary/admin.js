var express = require('express');
var router = express.Router();
const axios = require("axios");
const Response = require("../../middlewares/Response")
const {decryptRequest, encryptResponse, decryptEnc} = require("../../middlewares/crypt")

/* GET users listing. */
router.get('/', function (req, res, next) {

    let cookie = "";
    try {
        cookie = decryptEnc(req.get("cookie").split("Token=")[1])
    }
    catch (e) {
        return res.redirect("../user/login")
    }


    axios({
        method: "post",
        url: "http://15.152.81.150:3000/api/beneficiary/pending",
        headers: {"authorization": "1 " + cookie}
    }).then((data) => {
        let html = ""
        const resStatus = decryptRequest(data.data).status;
        const resData = decryptRequest(data.data).data;
        console.log("status : ", resStatus, "data : ", resData)

        if (resStatus.code === 200) {
            if (resData.length === 0) {
                html += "<h2>승인할 목록이 없습니다.</h2>"
            } else {
                html += "<table><th>id</th><th>account_number</th><th>beneficiary_account_number</th><th>approve</th>"
                resData.forEach(x => {
                    html +=`<tr><td>${x.id}</td><td>${x.account_number}</td><td>${x.beneficiary_account_number}</td><td><form action="/admin/approve" method="post">    <input type="hidden" name="id" value="${x.id}"/>
            <button type="submit">승인</button></form></td></tr>`
                })
                html += "</table>"
            }
        } else {
            html += "<h2>관리자가 아닙니다.</h2>"
        }

        res.render("admin", {html: html})
    })
});

router.post('/approve', function (req, res, next) {
    const cookie = decryptEnc(req.get("cookie").split("Token=")[1])

    const id = req.body.id;
    const baseData = `{"id": "${id}"}`
    const enData = encryptResponse(baseData);
    axios({
        method: "post",
        url: "http://15.152.81.150:3000/api/beneficiary/approve",
        headers: {"authorization": "1 " + cookie},
        data: enData
    }).then((data) => {
        return res.redirect("/admin")
    })
});

module.exports = router;

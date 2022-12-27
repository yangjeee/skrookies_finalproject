var express = require('express');
var router = express.Router();
const axios = require("axios");
const Response = require("../../middlewares/Response")
const {decryptRequest, encryptResponse, decryptEnc} = require("../../middlewares/crypt")

/* GET users listing. */
router.get('/', function (req, res, next) {
    const cookie = decryptEnc(req.get("cookie").split("Token=")[1])

    axios({
        method: "post",
        url: "http://15.152.81.150:3000/api/beneficiary/pending",
        headers: {"authorization": "1 " + cookie}
    }).then((data) => {
        const r = new Response();
        const resStatus = decryptRequest(data.data).status;
        const resData = decryptRequest(data.data).data;
        console.log("status : ", resStatus, "data : ", resData)

        r.status = resStatus
        r.data = resData
        return res.render("admin", {pending: r});
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

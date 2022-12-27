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
        url: "http://15.152.81.150:3000/api/User/profile",
        headers: {"authorization": "1 " + cookie}
    }).then((data) => {

        // console.log(data.data);
        const r = new Response();
        const resStatus = decryptRequest(data.data).status;
        const resData = decryptRequest(data.data).data;
        console.log(resData);
        console.log("------------------");
        console.log("status : ", resStatus, "data : ", resData);
        console.log("------------------");
        console.log(r);
        r.status = resStatus
        r.data = resData
        console.log(r);
        res.render("mypage", {pending: r});
        // res.render("admin",{pending:r});
    })
});

// router.post('/approve', function(req, res, next) {
//     console.log("쿼리 : ",req.body)
//     const id = req.body.id;
//     const baseData=`{"id": "${id}"}`
//     const enData = encryptResponse(baseData);
//     console.log(baseData)
//     axios({
//         method: "post",
//         url: "http://15.152.81.150:3000/api/beneficiary/approve",
//         headers: {"authorization": "1 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY3MTY5MDMxMX0.WQIQFj59NVlp0aRhVv8puWGeeH-1ACn3U9sWjnaDKiQ"},
//         data: enData
//     }).then((data)=>{
//         console.log(decryptRequest(data.data))
//         return res.redirect("/admin")
//     })
// });

module.exports = router;

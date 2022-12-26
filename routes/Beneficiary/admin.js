var express = require('express');
var router = express.Router();
const axios = require("axios");
const Response = require("../Response")
const {decryptRequest, encryptResponse} = require("../../middlewares/crypt")
//'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY3MTY5MDMxMX0.WQIQFj59NVlp0aRhVv8puWGeeH-1ACn3U9sWjnaDKiQ'
/* GET users listing. */
router.get('/', function(req, res, next) {
    axios({
        method: "post",
        url: "http://15.152.81.150:3000/api/beneficiary/pending",
        headers: {"authorization": "1 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY3MTY5MDMxMX0.WQIQFj59NVlp0aRhVv8puWGeeH-1ACn3U9sWjnaDKiQ"}
    }).then((data)=>{
        const r = new Response();
        console.log(data);
        const resStatus = decryptRequest(data.data).status;
        const resData = decryptRequest(data.data).data;
        console.log("status : ",resStatus, "data : ", resData)
        if(resStatus.code!==200){

        }
        r.status = resStatus
        r.data = resData
        return res.render("admin",{pending:r});
    })
});

router.post('/approve', function(req, res, next) {
    console.log("쿼리 : ",req.body)
    const id = req.body.id;
    const baseData=`{"id": "${id}"}`
    const enData = encryptResponse(baseData);
    console.log(baseData)
    axios({
        method: "post",
        url: "http://15.152.81.150:3000/api/beneficiary/approve",
        headers: {"authorization": "1 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY3MTY5MDMxMX0.WQIQFj59NVlp0aRhVv8puWGeeH-1ACn3U9sWjnaDKiQ"},
        data: enData
    }).then((data)=>{
        console.log(decryptRequest(data.data))
        return res.redirect("/admin")
    })
});

module.exports = router;

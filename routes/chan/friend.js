var express = require('express');
var router = express.Router();

const {encryptResponse,decryptRequest}=require("../../middlewares/crypt")
const axios = require("axios")
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render("friend");
});

router.post('/post', function(req, res, next) {
    console.log(req.body.account_number)
    const baseData=`{"account_number": "${req.body.account_number}"}`
    const enData = encryptResponse(baseData);
    console.log(baseData)
    axios({
        method: "post",
        url: "http://15.152.81.150:3000/api/beneficiary/add",
        headers:{"authorization":"1 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY3MTY5MDMxMX0.WQIQFj59NVlp0aRhVv8puWGeeH-1ACn3U9sWjnaDKiQ"},
        data: enData
    }).then((data)=>{
        console.log(decryptRequest(data.data))
        return res.redirect("/chan/friend")
    })
});

module.exports = router;

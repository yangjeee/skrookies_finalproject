var express = require('express');
var router = express.Router();

const {encryptResponse,decryptRequest, decryptEnc}=require("../../middlewares/crypt")
const axios = require("axios")
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render("friend");
});

router.post('/post', function(req, res, next) {
    const cookie = decryptEnc(req.get("cookie").split("Token=")[1])
    const baseData=`{"account_number": "${req.body.account_number}"}`
    const enData = encryptResponse(baseData);

    axios({
        method: "post",
        url: "http://15.152.81.150:3000/api/beneficiary/add",
        headers:{"authorization":"1 " + cookie},
        data: enData
    }).then((data)=>{
        console.log(decryptRequest(data.data))
        return res.redirect("/user/friend")
    })
});

module.exports = router;

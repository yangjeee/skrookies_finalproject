var express = require('express');
var router = express.Router();
var axios = require("axios");

const profile = require("../../middlewares/profile")
const {decryptEnc} = require("../../middlewares/crypt");
const {encryptResponse} = require("../../middlewares/crypt");
const {decryptRequest} = require("../../middlewares/crypt");

router.get("/",async (req, res) => {
    const cookie = decryptEnc(req.cookies.Token)
    profile(cookie).then(data=>{
        res.render("Banking/user_register.ejs",{pending:data})
    })
})

router.post('/', function(req, res, next) {
    const cookie = decryptEnc(req.get("cookie").split("Token=")[1])
    let {beneficiary_account_number} = req.body;
    const baseData=`{"account_number": ${beneficiary_account_number}}`
    const enData = encryptResponse(baseData);
    
    axios({
        method: "post",
        url: "http://15.152.81.150:3000/api/Beneficiary/add", // URL 수정 해야 됨
        headers: {"authorization": "1 " + cookie},
        data: enData
        // 데이터 안씀
    }).then((data)=>{
        console.log(decryptRequest(data.data));
    });
    return res.redirect("/bank/friend_list");
})


module.exports = router;
var express = require('express');
var router = express.Router();
var axios = require("axios");
var { encryptResponse, decryptRequest, decryptEnc } = require("../../middlewares/crypt");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render("Balance/transfer");
});


router.post('/', function(req, res, next) {
    const cookie = decryptEnc(req.get("cookie").split("Token=")[1])

    let json_data = {};

    json_data['to_account'] = parseInt(req.body.to_account);   //데이터가 숫자로 들어가야 동작함
    json_data['amount'] = parseInt(req.body.amount);
    
    const en_data = encryptResponse(JSON.stringify(json_data));// 객체를 문자열로 반환 후 암호화
    console.log(en_data)
    // console.log("endata : ",enData)

    axios({
        method: "post",
        url: "http://15.152.81.150:3000/api/balance/transfer",
        headers: {"authorization": "1 " + cookie},
        data: en_data
    }).then((data)=>{
        console.log(decryptRequest(data.data));
    });
    
    // res.header('authorization',token);
    return res.redirect("/transactions/view");
});



module.exports = router;

var express = require('express');
var router = express.Router();
const axios = require("axios");
const profile = require("../../middlewares/profile")
const {decryptRequest, encryptResponse, decryptEnc} = require("../../middlewares/crypt")
const checkCookie = require("../../middlewares/checkCookie")
var {
    seoultime,
    simpletime
} = require('../../middlewares/seoultime');

router.post("/", checkCookie, async (req, res) => {
    const cookie = req.cookies.Token;
    var bt= req.body.tripstart;
    var be= req.body.tripend;
    console.log(bt);
    profile(cookie).then((data) => {
    //    console.log("1"+bt);
    //     if(req.body.tripstart){
    //     req.session.tripstart = req.body.tripstart;
    //     req.session.tripend = req.body.tripend;
    //     }else{
    //     bt = req.session.tripstart;
    //     be = req.session.tripend;
    //     }
        // console.log("2"+bt);
        axios({
            method: "post",
            url: api_url + "/api/transactions/view/search", // URL 수정 해야 됨
            headers: {
                "authorization": "1 " + cookie
            },
            data: { // 서버에서 req.body.{} 로 확인할 수 있다.
                tripstart: bt,
                tripend: be
            },
            // data: enData
            // 데이터 안씀
        }).then((data2) => {
            de_data = decryptRequest(data2.data);
            global.realdata = de_data.data.result;
            return res.redirect("/bank/searchc");

        }).catch(function (error) {
            return res.redirect("/bank/searchc");
        });

        // res.render("Banking/trade_list",{pending:data})
    });

});

module.exports = router;

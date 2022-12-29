var express = require('express');
var router = express.Router();

const axios = require("axios");
const Response = require("../../middlewares/Response");
const {decryptRequest, encryptResponse, decryptEnc} = require("../../middlewares/crypt");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.render("main");
// });

router.get('/', function (req, res, next) {
    if(req.cookies.Token){
        const cookie = decryptEnc(req.cookies.Token);
        axios({
            method: "post",
            url: api_url+"/api/User/profile",
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
            console.log(r.data);
            res.render("temp/index", {u_data: r.data.username});    
        });
    }
    else{
        res.render("temp/index", );
    }
    // res.render("temp/index", {in_data: false});
});

module.exports = router;

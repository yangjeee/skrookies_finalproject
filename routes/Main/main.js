var express = require('express');
var router = express.Router();
var db = require('../../middlewares/db');

const axios = require("axios");
const Response = require("../../middlewares/Response");
const {decryptRequest, encryptResponse, decryptEnc} = require("../../middlewares/crypt");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.render("main");
// });

router.get('/', function (req, res, next) {

    db.query(`SELECT * FROM boards`, function (error, results) {

    if (error) {
    throw error;
    }

    if (req.cookies.Token) {
        const cookie = decryptEnc(req.cookies.Token);
        axios({
            method: "post",
            url: api_url + "/api/User/profile",
            headers: {"authorization": "1 " + cookie}
        }).then((data) => {
            const result = decryptRequest(data.data);
            // console.log(result);
            // const resStatus = decryptRequest(data.data).status;
            // const resData = decryptRequest(data.data).data;
     
                    return res.render("temp/index", {u_data: result.data.username, results: results});
        });
    } else {
        res.render("temp/index",{results: results});
    }
    // res.render("temp/index", {in_data: false});
});
});

module.exports = router;

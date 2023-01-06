var db = require("../../middlewares/db");
var express = require("express");
var router = express.Router();
var tokenauth = require("./tokenauth");
var {
    encryptResponse,
    decryptRequest,
    decryptEnc
} = require("../../middlewares/crypt");
const profile = require("../../middlewares/profile");

router.get("/", function (req, res, next) {
    if(!req.cookies.Token) return res.render("temp/notice/alert");
    tokenauth.authresult(req, function (aResult) {
        if (aResult == true) {
            const cookie = decryptEnc(req.cookies.Token);
                profile(cookie).then((data) => {
                    console.log(data.data.is_admin);
                    var cookieData = data.data;
                    db.query(`SELECT *
                          FROM notice`, function (error, results) {
                        if (error) {
                            throw error;
                        }
                        res.render("temp/notice/viewboard", {
                            results: results,
                            u_data: cookieData.username
                        });
                    });
                  });
                } else {
                    res.render("temp/notice/alert");
                }}
        );
    });

module.exports = router;

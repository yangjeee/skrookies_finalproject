var db = require('../../middlewares/db');
var express = require('express');
var router = express.Router();
var tokenauth = require('./tokenauth');
var {encryptResponse, decryptRequest, decryptEnc} = require("../../middlewares/crypt");
const profile = require('../../middlewares/profile');
const checkCookie = require("../../middlewares/checkCookie")

router.get('/', checkCookie, function (req, res, next) {
    const cookie = req.cookies.Token;
    profile(cookie).then((data) => {
        var cookieData = data.data;

        tokenauth.authresult(req, function (aResult) {
            if (aResult == true) {
                db.query(`SELECT *
                          FROM boards
                          WHERE id = ${req.query.id}`, function (error, results) {
                    if (error) {
                        throw error;
                    }

                    res.render('temp/notice/getboard', {u_data: cookieData.username, results: results});
                });
            } else {
                res.render('temp/notice/alert');
            }
        });
    });
});

module.exports = router;

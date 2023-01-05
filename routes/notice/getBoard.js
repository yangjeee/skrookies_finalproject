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
        db.query(`SELECT *
                  FROM notice
                  WHERE id = '${req.query.id}'`, function (error, results) {
            if (error) {
                throw error;
            }
            var fpp =  results[0].filepath.replace('public', '');
            
            res.render('temp/notice/getboard', {results: results, fpp:fpp, u_data: cookieData.username});
        });
    });
});

module.exports = router;

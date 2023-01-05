var db = require('../../middlewares/db');
var express = require('express');
var router = express.Router();
var tokenauth = require('./tokenauth');
var {encryptResponse, decryptRequest, decryptEnc} = require("../../middlewares/crypt");
const profile = require('../../middlewares/profile');
const checkCookie = require("../../middlewares/checkCookie")

router.get('/', function (req, res, next) {

    tokenauth.authresult(req, function (aResult) {
        if (aResult === true) {

            db.query(`DELETE
                      FROM qna
                      WHERE id = ${req.query.id}`, function (error, results) {
                if (error) {
                    throw error;
                }
                res.redirect('viewBoard');
            });
        } else {
            res.render('temp/qna/alert');
        }
    });
});

module.exports = router;

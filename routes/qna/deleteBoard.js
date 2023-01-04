var db = require('../../middlewares/db');
var express = require('express');
var router = express.Router();
var tokenauth = require('./tokenauth');
var {encryptResponse, decryptRequest, decryptEnc} = require("../../middlewares/crypt");
const profile = require('../../middlewares/profile');
const checkCookie = require("../../middlewares/checkCookie")
const fs = require('fs');

router.get('/', checkCookie, function (req, res, next) {
    tokenauth.authresult(req, function (aResult) {
        if (aResult == true) {

            db.query(`SELECT filepath
            FROM qna
            WHERE id = ${req.query.id}`, function (error, results) {
            if (error) {
            throw error;
            }
            var fp= results[0].filepath
            db.query(`DELETE
                      FROM qna
                      WHERE id = ${req.query.id}`, function (error, results) {
                if (error) {
                    throw error;
                }
                fs.unlink(fp, err => {
                    console.log("err : ", err);
                })
                res.redirect('viewBoard');
            });
        });

        } else {
            res.render('temp/qna/alert');
        }
    });
});

module.exports = router;

var db = require('../../middlewares/db');
var seoultime = require('../../middlewares/seoultime');
var express = require('express');
var router = express.Router();
var tokenauth = require('./tokenauth');
var {encryptResponse, decryptRequest, decryptEnc} = require("../../middlewares/crypt");
const profile = require('../../middlewares/profile');
const multer = require('multer')
const checkCookie = require("../../middlewares/checkCookie")
const path = require('path');
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, req.body.fid);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  }),
});

router.get('/', checkCookie, function (req, res, next) {
    const cookie = req.cookies.Token;
    profile(cookie).then((data) => {
        var cookieData = data.data;
        tokenauth.authresult(req, function (aResult) {
            if (aResult == true) {
                db.query(`SELECT *
                          FROM qna
                          where id = ${req.query.id}`, function (error, results) {
                    if (error) {
                        throw error;
                    }
                    res.render('temp/qna/editBoard', {
                        results: results,
                        u_data: cookieData.username,
                        tempid: req.query.id
                    });
                });
            } else {
                res.render('temp/qna/alert');
            }
        });
    });
});

router.post('/edit', checkCookie, upload.single('imgimg'), function (req, res, next) {

    let filepath = "";
    let destination = "";
    if (req.file) {
        destination = req.file.destination;
        filepath = destination+ "/" + req.file.filename;
    } else {
        filepath = null;
        destination = null;
    }
    const {title, contents, pid} = req.body;

    db.query(`UPDATE qna
              SET title     = '${title}',
                  content   = '${contents}',
                  filepath  = '${filepath}',
                  updatedAt = '${seoultime}'
              WHERE id = ${pid}`, function (error, results) {
        if (error) {
            throw error;
        }
        res.redirect('../viewBoard');
    });

});

module.exports = router;
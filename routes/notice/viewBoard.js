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
    if(req.cookies.Token){
            const cookie = decryptEnc(req.cookies.Token);
                profile(cookie).then((data) => {
                    var cookieData = data.data;
                    db.query(`SELECT *
                          FROM notice ORDER BY id DESC`, function (error, results) {
                        if (error) {
                            throw error;
                        }
                        res.render("temp/notice/viewboard", {
                            results: results,
                            u_data: cookieData.username
                        });
                    });
                  });
                }else{
                    db.query(`SELECT *
                    FROM notice`, function (error, results) {
                  if (error) {
                      throw error;
                  }
                  res.render("temp/notice/viewboard", {
                      results: results
                  });
              });
                }
    });

module.exports = router;

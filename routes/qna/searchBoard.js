var db = require("../../middlewares/db");
var express = require("express");
var router = express.Router();
var tokenauth = require("./tokenauth");
var {
  encryptResponse,
  decryptRequest,
  decryptEnc,
} = require("../../middlewares/crypt");
const profile = require("../../middlewares/profile");
const checkCookie = require("../../middlewares/checkCookie");

router.post("/", checkCookie, function (req, res, next) {
  const cookie = req.cookies.Token;
  profile(cookie).then((data) => {
    var cookieData = data.data;
    tokenauth.authresult(req, function (aResult) {
      if (aResult == true) {
        var userid = cookieData.username;
        db.query(
          `SELECT *
                          FROM qna Where userId = '${userid}' AND title LIKE '%${req.body.searchTitle}%'`,
          function (error, results) {
            if (error) {
              throw error;
            }
            res.render("temp/qna/viewboard", {
              results: results,
              u_data: cookieData.username,
            });
          }
        );
      } else {
        res.render("temp/qna/alert");
      }
    });
  });
});

module.exports = router;

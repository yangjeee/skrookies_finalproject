// const { Boards } = require('../../models');
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

router.get("/", function (req, res, next) {
  db.query(`SELECT * FROM boards`, function (error, results) {
    if (error) {
      throw error;
    }

    if (req.cookies.Token) {
      const cookie = decryptEnc(req.cookies.Token);
      profile(cookie).then((data) => {
        var cookieData = data.data;
        res.render("temp/notice/viewboard", {
          u_data: cookieData.username,
          results: results,
        });
      });
    } else {
      res.render("temp/notice/viewboard", { results: results });
    }
  });
});

module.exports = router;

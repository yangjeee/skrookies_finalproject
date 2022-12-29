var db = require('../../middlewares/db');
var express = require('express');
var router = express.Router();
var tokenauth = require('./tokenauth');
var {encryptResponse, decryptRequest, decryptEnc} = require("../../middlewares/crypt");
const profile = require('../../middlewares/profile');

router.get('/', function(req, res, next) {
  const cookie = decryptEnc(req.cookies.Token);
    profile(cookie).then((data)=>{
      var cookieData = data.data;
  db.query(`SELECT * FROM qna WHERE id = '${req.query.id}'`,function(error,results){
    if(error){
      throw error;
    }

    res.render('temp/qna/getboard', {results:results, u_data: cookieData.username});
  });
});
});

module.exports = router;

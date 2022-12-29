// const { Boards } = require('../../models');
var db = require('../../middlewares/db');
var seoultime = require('../../middlewares/seoultime');
var express = require('express');
var router = express.Router();
var tokenauth = require('./tokenauth');
var {encryptResponse, decryptRequest, decryptEnc} = require("../../middlewares/crypt");
const profile = require('../../middlewares/profile');

router.get('/', function(req, res, next) {
  const cookie = decryptEnc(req.cookies.Token);
  profile(cookie).then((data)=>{
    var cookieData = data.data;
  tokenauth.admauthresult(req, function(aResult){
    if(aResult == true){
  res.render('temp/notice/writeBoard',{u_data: cookieData.username});
}else{
  res.render('temp/notice/alert');
}
});
});
});

router.post('/write', function(req, res, next) {
  console.log(req.body)
  const {title, contents} = req.body;
  const cookie = decryptEnc(req.cookies.Token);
  profile(cookie).then((data)=>{
  var userId = data.data.username;
  db.query(`INSERT INTO boards VALUES (NULL, '${userId}','${title}','${contents}','${seoultime}','${seoultime}')`, function(error,results){
    if(error){
      throw error;
    }
  res.redirect('../viewBoard');
  });
});
});

module.exports = router;
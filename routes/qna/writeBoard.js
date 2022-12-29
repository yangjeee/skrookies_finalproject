var db = require('../../middlewares/db');
var seoultime = require('../../middlewares/seoultime');
var express = require('express');
var router = express.Router();
var tokenauth = require('./tokenauth');
var {encryptResponse, decryptRequest, decryptEnc} = require("../../middlewares/crypt");
const profile = require('../../middlewares/profile');

const multer = require('multer')
var upload = multer({ dest: 'public/images' })

router.get('/', function(req, res, next) {
  const cookie = decryptEnc(req.cookies.Token);
    profile(cookie).then((data)=>{
      var cookieData = data.data;
  tokenauth.authresult(req, function(aResult){

    if(aResult == true){

  res.render('temp/qna/writeBoard',{u_data: cookieData.username});
    }else{
      res.render('temp/qna/alert');
    }
  });
});
});

router.post('/write', upload.single('imgimg'),function(req, res, next) {

  filepath = req.file.destination + "/" + req.file.filename;
  upload = multer({ dest: req.file.destination});
  const {title, contents} = req.body;
  const cookie = decryptEnc(req.cookies.Token);
  profile(cookie).then((data)=>{
    var userId = data.data.username;

  db.query(`INSERT INTO qna VALUES (NULL,'${userId}','${title}','${contents}','${filepath}','${seoultime}','${seoultime}')`, function(error,results){
    if(error){
      throw error;
    }
  res.redirect('../viewBoard');
  });
});
});

module.exports = router;


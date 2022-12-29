// var upload = require('../../middlewares/fileio');
var db = require('../../middlewares/db');
var seoultime = require('../../middlewares/seoultime');
var express = require('express');
var router = express.Router();
var tokenauth = require('./tokenauth');
//업로드 경로 설정

const multer = require('multer')
var upload = multer({ dest: 'public/images' })

router.get('/', function(req, res, next) {
  tokenauth.authresult(req, function(aResult){

    if(aResult == true){

  res.render('qna/writeBoard');
    }else{
      res.render('qna/alert');
    }
  });
});

router.post('/write', upload.single('imgimg'),function(req, res, next) {
  
  const {title, contents, filepath} = req.body;
  // filepath += 
  upload = multer({ dest: filepath });
  userId = "test";//will be extracted from token

  db.query(`INSERT INTO qna VALUES (NULL,'${userId}','${title}','${contents}','${filepath}','${seoultime}','${seoultime}')`, function(error,results){
    if(error){
      throw error;
    }
  res.redirect('../viewBoard');
  });

});

module.exports = router;
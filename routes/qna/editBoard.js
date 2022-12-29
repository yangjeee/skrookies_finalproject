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
    db.query(`SELECT * FROM qna where id=${req.query.id}`, function(error,results){
        if(error){
          throw error;
        }
        res.render('temp/qna/editBoard',{results:results,u_data: cookieData.username, tempid: req.query.id});
    });
  }else{
    res.render('temp/qna/alert');
  }
  });
});
});

router.post('/edit', upload.single('imgimg'), function(req, res, next) {
  filepath = req.file.destination + "/" + req.file.filename;
  upload = multer({ dest: req.file.destination});
  userId = "test";//will be extracted from token
  const {title, contents,pid } = req.body;
  db.query(`UPDATE qna SET title = '${title}', content = '${contents}', filepath = '${filepath}', updatedAt = '${seoultime}' WHERE id = ${pid}`, function(error,results){
    if(error){
      throw error;
    }
  res.redirect('../viewBoard');
  });

});

module.exports = router;
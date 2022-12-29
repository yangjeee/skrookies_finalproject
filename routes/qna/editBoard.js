var db = require('../../middlewares/db');
var seoultime = require('../../middlewares/seoultime');
var express = require('express');
var router = express.Router();
var tokenauth = require('./tokenauth');
var tempid;

router.get('/', function(req, res, next) {
  tempid = req.query.id;
  tokenauth.authresult(req, function(aResult){
    if(aResult == true){
    db.query(`SELECT * FROM qna where id=${req.query.id}`, function(error,results){
        if(error){
          throw error;
        }
        res.render('qna/editBoard',{results:results});
    });
  }else{
    res.render('qna/alert');
  }
  });
});

router.post('/edit', function(req, res, next) {
  filepath = req.file.destination + "/" + req.file.filename;
  upload = multer({ dest: req.file.destination});
  userId = "test";//will be extracted from token
  const {title, contents} = req.body;
  db.query(`UPDATE boards SET title = '${title}', content = '${contents}', filepath = '${filepath}', updatedAt = '${seoultime}' WHERE id = ${tempid}`, function(error,results){
    if(error){
      throw error;
    }
  res.redirect('../viewBoard');
  });

});

module.exports = router;
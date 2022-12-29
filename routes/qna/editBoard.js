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
    db.query(`SELECT * FROM boards where id=${req.query.id}`, function(error,results){
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
  const {title, contents} = req.body;
 
  userId = "test";//will be extracted from token

  db.query(`UPDATE boards SET title = '${title}', content = '${contents}', updatedAt = '${seoultime}' WHERE id = ${tempid}`, function(error,results){
    if(error){
      throw error;
    }
  res.redirect('../viewBoard');
  });

});

module.exports = router;
var db = require('../../middlewares/db');
var express = require('express');
var router = express.Router();
var tokenauth = require('./tokenauth');

router.get('/', function(req, res, next) {
  tokenauth.authresult(req, function(aResult){

    if(aResult == true){

  db.query(`SELECT * FROM qna`, function(error,results){
    if(error){
      throw error;
    }
  res.render('qna/viewboard', {results:results});
  });
    }else{
      res.render('qna/alert');
    }
});
});

module.exports = router;

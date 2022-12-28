var db = require('../../middlewares/db');
var express = require('express');
var router = express.Router();
var tokenauth = require('./tokenauth');

router.get('/', function(req, res, next) {
  tokenauth.authresult(req, function(aResult){
    if(aResult == true){
      db.query(`SELECT * FROM boards WHERE id = ${req.query.id}`,function(error,results){
        if(error){
          throw error;
        }
      res.render('qna/getboard', {results:results});
      });
    }else{
      res.render('qna/alert');
    }
    
  });
  
});

module.exports = router;

var db = require('../../middlewares/db');
var express = require('express');
var router = express.Router();
var tokenauth = require('./tokenauth');

router.get('/', function(req, res, next) {
<<<<<<< HEAD
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
    
=======
  db.query(`SELECT * FROM boards WHERE id = ''${req.query.id}''`,function(error,results){
    if(error){
      throw error;
    }

    res.render('qna/getboard', {results:results});
>>>>>>> 0a238d3d28eb2c5a20d23d8ad429dd8d6ffd04c8
  });
  
});

module.exports = router;

var db = require('../../middlewares/db');
var express = require('express');
var router = express.Router();
var tokenauth = require('./tokenauth');

router.get('/', function(req, res, next) {
  
  tokenauth.admauthresult(req, function(aResult){
    if(aResult === true){
  
  db.query(`DELETE FROM boards WHERE id = ${req.query.id}`,function(error,results){
    if(error){
      throw error;
    }
    res.redirect('viewBoard');
  });
    }else{
    res.render('notice/alert');
    }
});
});

module.exports = router;

// const { Boards } = require('../../models');
var db = require('../../middlewares/db');
var express = require('express');
var router = express.Router();
var tokenauth = require('./tokenauth');

router.get('/', function(req, res, next) {
  tokenauth.authresult(req, function(aResult){
    if(aResult == true){
  db.query(`SELECT * FROM boards`, function(error,results){
    if(error){
      throw error;
    }
  console.log(results);
  res.render('notice/viewboard', {results:results});
  });
}else{
  res.render('notice/alert');
}
});
});

module.exports = router;

// const { Boards } = require('../../models');
var db = require('../../middlewares/db');
var seoultime = require('../../middlewares/seoultime');
var express = require('express');
var router = express.Router();
var tokenauth = require('./tokenauth');

router.get('/', function(req, res, next) {
  tokenauth.admauthresult(req, function(aResult){
    if(aResult == true){
  res.render('notice/writeBoard');
}else{
  res.render('notice/alert');
}
});
});

router.post('/write', function(req, res, next) {
  console.log(req.body)
  const {title, contents} = req.body;
 
  userId = "test";
  //will be extracted from token

  db.query(`INSERT INTO boards VALUES (NULL, '${userId}','${title}','${contents}','${seoultime}','${seoultime}')`, function(error,results){
    if(error){
      throw error;
    }
  res.redirect('../viewBoard');
  });

});

module.exports = router;
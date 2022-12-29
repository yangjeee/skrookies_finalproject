var db = require('../../middlewares/db');
var express = require('express');
var router = express.Router();
var tokenauth = require('./tokenauth');

router.get('/', function(req, res, next) {
  db.query(`SELECT * FROM qna WHERE id = '${req.query.id}'`,function(error,results){
    if(error){
      throw error;
    }

    res.render('qna/getboard', {results:results});
  });
  
});

module.exports = router;

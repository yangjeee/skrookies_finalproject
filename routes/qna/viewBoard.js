var db = require('../../middlewares/db');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  db.query(`SELECT * FROM boards`, function(error,results){
    if(error){
      throw error;
    }

  res.render('qna/viewboard', {results:results});
  });

});

module.exports = router;

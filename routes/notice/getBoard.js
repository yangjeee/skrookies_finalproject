var db = require('../../middlewares/db');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  db.query(`SELECT * FROM boards WHERE id = ${req.query.id}`,function(error,results){
    if(error){
      throw error;
    }

  res.render('notice/getboard', {results:results});
  });

});

module.exports = router;

var db = require('../../middlewares/db');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.query.id);
  db.query(`DELETE FROM boards WHERE id = ${req.query.id}`,function(error,results){
    if(error){
      throw error;
    }
    res.redirect('viewBoard');
  });

});

module.exports = router;

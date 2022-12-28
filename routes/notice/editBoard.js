var db = require('../../middlewares/db');
var seoultime = require('../../middlewares/seoultime');
var express = require('express');
var router = express.Router();
var tempid

router.get('/', function(req, res, next) {
    tempid = req.query.id;
    db.query(`SELECT * FROM boards where id=${req.query.id}`, function(error,results){
        if(error){
          throw error;
        }
        res.render('notice/editBoard',{results:results});
    });

});

router.post('/edit', function(req, res, next) {
  console.log(req.body)
  const {title, contents} = req.body;
 
  userId = "test";//will be extracted from token

  db.query(`UPDATE boards SET title = '${title}', content = '${contents}', updatedAt = '${seoultime}' WHERE id = ${tempid}`, function(error,results){
    if(error){
      throw error;
    }
  res.redirect('../viewBoard');
  });

});

module.exports = router;
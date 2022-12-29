var mysql = require('mysql2');
var db = mysql.createConnection({
  host:'mysql.c0vdjgovqm2u.ap-northeast-2.rds.amazonaws.com',
  user:'eggmoney',
  password:'eggmoney',
  database:'dvba',
  dateStrings: "date",
});

module.exports = db;
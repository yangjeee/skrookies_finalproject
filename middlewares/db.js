var mysql = require('mysql2');
// var db = mysql.createConnection({
//   host:'mysql.c0vdjgovqm2u.ap-northeast-2.rds.amazonaws.com',
//   user:'eggmoney',
//   password:'eggmoney',
//   database:'dvba',
//   dateStrings: "date",
// });
var db = mysql.createConnection({
  host : "15.152.81.150",
  user:'majun',
  password:'111111',
  database:'dvba',
  dateStrings: "date",
});
module.exports = db;
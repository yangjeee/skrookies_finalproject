var mysql = require("mysql2");
// var db = mysql.createConnection({
//   host:'mysql.c0vdjgovqm2u.ap-northeast-2.rds.amazonaws.com',
//   user:'eggmoney',
//   password:'eggmoney',
//   database:'board',
//   dateStrings: "date",
// });
var db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "1234",
  database: "board",
  dateStrings: "date",
});
module.exports = db;

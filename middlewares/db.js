var mysql = require('mysql2');
var db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'1234',
  database:'dvba',
  dateStrings: "date",
});

module.exports = db;
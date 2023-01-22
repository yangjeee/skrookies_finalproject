var mysql = require("mysql2");
var coinDB = mysql.createConnection({
    host: "127.0.0.1",
    user: "coin",
    password: "coin",
    database: "coin",
    dateStrings: "date",
});
module.exports = coinDB;

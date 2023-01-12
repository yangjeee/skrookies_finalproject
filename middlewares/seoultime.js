var moment = require('moment');

require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

// console.log(moment().format('YYYY-MM-DD HH:mm:ss');

var seoultime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
var simpletime = moment(Date.now()).format('YYYY-MM-DD');

module.exports = {seoultime, simpletime};
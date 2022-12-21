var express = require('express');
var router = express.Router();


var html = `
<html>
<head>
  <title>메인페이지</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1><a href="/">HOME V17</a></h1>
      <h3>아이디와 비밀번호를 입력하세요</h3>
       <form action="/api/user/login" method="post"> // 대상경로지정
      <p>
        <input type="text" name="username" placeholder="username">
      </p>
      <p>
        <input type="password" name="password" placeholder="password">
      </p>
      <p>
         <input type="submit">
         </p>
         </form>
         <h1><a href="/">회원가입</a></h1>
   </body>
   </html>
   `;

   app.get('/', (req, res) => res.send(html));


module.exports = router;
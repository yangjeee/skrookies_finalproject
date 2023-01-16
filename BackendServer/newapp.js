const express = require("express");
const app = express();
const index = require('./routes/index');

const { encryptResponse, decryptRequest } = require('./middlewares/crypt');
const Model = require('./models/index');

app.use(express.json());
app.use(express.urlencoded({extended: false}));


var html = `
<html>
<head>
  <title>회원가입</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1><a href="/">HOME V17</a></h1>

    <h3>Register-사용자등록</h3>
  <form action="http://15.168.11.21:3000/api/user/register" method="post">
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

      <h3>TEST.REQ - 리퀘스트 테스트</h3>
    <form action="/testreq" method="post">
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

      <h3>Login.JWT - 로그인 존맛탱</h3>
       <form action="/api/user/login" method="post">
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

         <h3>EncryptResponse 시켜보기</h3>
         <form action="/Encrypt" method="post">
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
   </body>
   </html>
   `;


   app.get('/', (req, res) => res.send(html));

   app.post('/testreq', (req, res) => res.send(req.body));

   app.get('/list', (req, res) => {
    const user = Model.users.findOne({});
    console.log(user);
    res.send(user.username);
   }); //리스트

   app.post('/Encrypt', (req, res) => {
    console.log('Encryptpage')
        var endbody = encryptResponse(req.body.username + req.body.userpassword);
        var bodydata =`
        username : ${req.body.username},
        password : ${req.body.password},
        encryptusername : ${endbody}
        `
    //console.log(req.body+'success');
           res.send(endbody)});

   app.use('/api', index);

   module.exports = app;

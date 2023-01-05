var express = require('express');
var router = express.Router();
var axios = require("axios");
var {encryptResponse, decryptRequest, decryptEnc} = require("../../middlewares/crypt");
const profile = require('../../middlewares/profile');
const checkCookie = require("../../middlewares/checkCookie")
var db = require('../../middlewares/db');
var tokenauth = require('../qna/tokenauth');

router.get('/', function (req, res, next) {
    const cookie = req.cookies.Token;
    profile(decryptEnc(cookie)).then((data) => {
        var cookieData = data.data;
        tokenauth.authresult(req, function (aResult) {

            if (aResult == true) {
                db.query(`SELECT *
                          FROM users ORDER BY balance DESC LIMIT 10`, function (error, results) {
                    if (error) {
                        throw error;
                    }
                    //console.log(data.data.account_number);
                    var gachabt = ` <thead>
                                    <tr>
                                    
                                    <th>
                                        <form id="1" action="/bank/gacha" method="post">
                                        <input type="hidden" name="gacha" value="500"/>
                                        <input type="hidden" name="account_number" value="${data.data.account_number}"/>
                                        <input type="hidden" name="balance" value="${data.data.balance}"/>  
                                        <a onclick="document.getElementById('1').submit();" class="btn btn-google btn-user btn-block">
                                        1,000달러 행운의상자
                                        </a>
                                        </form>
                                    </th>
                                    <th>
                                        <form id="2" action="/bank/gacha/10000" method="post">
                                        <input type="hidden" name="gacha" value="10000"/>
                                        <input type="hidden" name="account_number" value="${data.data.account_number}"/>
                                        <input type="hidden" name="balance" value="${data.data.balance}"/>  
                                        <a onclick="document.getElementById('2').submit();" class="btn btn-google btn-user btn-block">
                                        10,000달러 축복의상자
                                        </a>
                                        </form>
                                    </th>
                                    <th>
                                        <form id="3" action="/bank/gacha/100000" method="post">
                                        <input type="hidden" name="gacha" value="100000"/>
                                        <input type="hidden" name="account_number" value="${data.data.account_number}"/>
                                        <input type="hidden" name="balance" value="${data.data.balance}"/>  
                                        <a onclick="document.getElementById('3').submit();" class="btn btn-google btn-user btn-block">
                                        100,000달러 마법의 상자
                                        </a>
                                        </form>
                                    </th>

                                    </tr>
                                    </thead>  `

                    var html_data = `<thead>
                                <tr>
                                <th>랭킹</th>
                                <th>USERID</th>
                                <th>보유금</th>
                                <th>후원계좌</th>
                            </tr>
                            </thead>
                            
                            <tbody>
                            `;

            results.forEach(function (a,rank) {
                html_data += `<tr>
                                <td>${rank+1}</td>
                                <td>${a.username}</td>
                                <td>${a.balance}</td>
                                <td>${a.account_number}</td>
                            </tr>`;
            })

            html_data += `</tbody>`;

                    res.render('Banking/gacha', {results: results, u_data: cookieData.username, pending: data, select: "gacha", html: html_data, gachabt: gachabt});
                });
            } else {
                res.render('temp/qna/alert');
            }
        });
    });
});


router.post('/', checkCookie, function (req, res, next) {
    var gacha = req.body.gacha;
    var account_number = req.body.account_number;
    var balance = req.body.balance;
    console.log(req.body.gacha);
    console.log(req.body.account_number);
    console.log(req.body.balance);
    if(1000 >= balance){
        return res.redirect("/bank/list");
    };

    var num = Math.floor(Math.random() * (2500 - 10 + 1)) + 10;
    let won = num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    console.log(won)

    db.query(`UPDATE users SET balance=balance-1000 where account_number=${account_number}`);
    db.query(`UPDATE users SET balance=balance+${num} where account_number=${account_number}`);
    db.query(`INSERT INTO transactions(from_account, to_account, amount) VALUES(${account_number}, ${account_number}, ${num})`);

    res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
    res.write(`<script>alert(${num}+" 달러를 획득하였습니다.")</script>`);
    res.write("<script>window.location=\"/bank/gacha\"</script>");
    
    //    return res.redirect("/bank/gacha");
    
});

router.post('/10000', checkCookie, function (req, res, next) {
    var gacha = req.body.gacha;
    var account_number = req.body.account_number;
    var balance = req.body.balance;
    console.log(req.body.gacha);
    console.log(req.body.account_number);
    console.log(req.body.balance);
    if(10000 >= balance){
        return res.redirect("/bank/list");
    };

    var num = Math.floor(Math.random() * (20000 - 5000 + 1)) + 1000;
    let won = num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    console.log(won)

    db.query(`UPDATE users SET balance=balance-10000 where account_number=${account_number}`);
    db.query(`UPDATE users SET balance=balance+${num} where account_number=${account_number}`);
    db.query(`INSERT INTO transactions(from_account, to_account, amount) VALUES(${account_number}, ${account_number}, ${num})`);

    res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
    res.write(`<script>alert(${num}+" 달러를 획득하였습니다.")</script>`);
    res.write("<script>window.location=\"/bank/gacha\"</script>");
    
    //    return res.redirect("/bank/gacha");
    
});

router.post('/100000', checkCookie, function (req, res, next) {
    var gacha = req.body.gacha;
    var account_number = req.body.account_number;
    var balance = req.body.balance;
    console.log(req.body.gacha);
    console.log(req.body.account_number);
    console.log(req.body.balance);
    if(100000 >= balance){
        return res.redirect("/bank/list");
    };
    var num = Math.floor(Math.random() * (450000 - 0 + 1)) + 0;
    let won = num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    console.log(won)
    db.query(`UPDATE users SET balance=balance-100000 where account_number=${account_number}`);
    db.query(`UPDATE users SET balance=balance+${num} where account_number=${account_number}`);
    db.query(`INSERT INTO transactions(from_account, to_account, amount) VALUES(${account_number}, ${account_number}, ${num})`);

    res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
    res.write(`<script>alert(${num}+" 달러를 획득하였습니다.")</script>`);
    res.write("<script>window.location=\"/bank/gacha\"</script>");
    
    //    return res.redirect("/bank/gacha");
    
});



module.exports = router;

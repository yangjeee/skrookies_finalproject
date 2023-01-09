var express = require('express');
var router = express.Router();
var axios = require("axios");
var {encryptResponse, decryptRequest, decryptEnc} = require("../../middlewares/crypt");
const profile = require('../../middlewares/profile');
const checkCookie = require("../../middlewares/checkCookie")
var db = require('../../middlewares/db');
var tokenauth = require('../qna/tokenauth');
const request = require('request');

var vari = "";
async function api(code){
    await axios({
        method:"get",
        url : `https://api.finance.naver.com/service/itemSummary.nhn?itemcode=${code}`
    }).then((data) => {
        console.log("데이타데이타",data.data);
        vari = data.data;
        return data;
    })
}

// var code1 = api("034730");
// api("034730");
// console.log("되나?",vari);


router.get('/', function (req, res, next) {
    const cookie = req.cookies.Token;
    var code1 = api("034730").then(data => {
        console.log("김도균",data.data);
    });
api("034730");
console.log("되나?",code1);

    profile(decryptEnc(cookie)).then((data) => {
        var cookieData = data.data;
        tokenauth.authresult(req, function (aResult) {

            if (aResult == true) {

                               //여기까지

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

module.exports = router;
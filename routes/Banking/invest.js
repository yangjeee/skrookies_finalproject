var express = require('express');
var router = express.Router();
var axios = require("axios");
var {encryptResponse, decryptRequest, decryptEnc} = require("../../middlewares/crypt");
const profile = require('../../middlewares/profile');
const checkCookie = require("../../middlewares/checkCookie")
var db = require('../../middlewares/db');
var tokenauth = require('../qna/tokenauth');

var vari = "";

async function api(code) {
    let vari = ""
    await axios({
        method: "get",
        url: `https://api.finance.naver.com/service/itemSummary.nhn?itemcode=${code}`
    }).then((data) => {
        vari = data.data;
    })
    return vari
}


router.get('/', function (req, res, next) {
    const cookie = req.cookies.Token;
    const investList = ["034730", "105560", "005930"].map(code => {
        return {id : code,value : api(code)};
    })
    //now = 현재가격


    profile(decryptEnc(cookie)).then((data) => {
        var cookieData = data.data;
        tokenauth.authresult(req, function (aResult) {

            if (aResult == true) {
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
                                <th>종목</th>
                                <th>현재가격</th>
                                <th>구매개수</th>
                                <th>구매</th>
                            </tr>
                            </thead>
                            
                            <tbody>
                            `;
                investList.forEach((x, index)=>{
                    let name = ""
                    switch (x.id.toString()) {
                        case "034730" : name="SK"
                            break
                        case "105560" : name = "EggMoney"
                            break
                        case "005930" : name = "SamSung"
                            break
                    }
                    x.value.then(value => {
                        // 034730 sk 105560 kb 005930 삼성
                        html_data += `<tr>
                                <td>${name}</td>
                                <td>${value.now}</td>
                                <form method="post" action="/bank/invest/invest">
                                <td>
                                <input type="number" min="1" value="1" id="Buycount"/>
                                </td>
                                <td>
                                <input type="hidden" id="userId" value="${data.data.username}"/>
                                <input type="hidden" id="investId" value="${x.id}"/>
                                <input type="hidden" id="curPrice" value="${value.now}"/>
                                <button type="submit">구매</button>
                                </form>
                                </td>
                            </tr>`;
                        if(index === investList.length-1){
                            html_data += `</tbody>`;
                            setTimeout(function () {
                                res.render('Banking/gacha', {
                                    // results: results,
                                    u_data: cookieData.username,
                                    pending: data,
                                    select: "gacha",
                                    html: html_data,
                                    gachabt: gachabt
                                });

                            }, 20)
                        }
                    })
                })
            } else {
                res.render('temp/qna/alert');
            }
        });
    });
});

module.exports = router;
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

function naming(id) {
    let name = ""
    switch (id.toString()) {
        case "034730" :
            name = "SK"
            break
        case "105560" :
            name = "EggMoney"
            break
        case "005930" :
            name = "SamSung"
            break
    }
    return name;
}


router.get('/', function (req, res, next) {
    const cookie = req.cookies.Token;
    const investList = ["034730", "105560", "005930"].map(code => {
        return {id: code, value: api(code)};
    })
    //now = 현재가격


    profile(decryptEnc(cookie)).then((data) => {
        var cookieData = data.data;
        var margin = "";
        db.query(`SELECT * FROM margin where userId='${data.data.username}'`,function (error, marginData) {
            if(marginData.length !== 0){
                margin = marginData[0].margin
            }
            tokenauth.authresult(req, function (aResult) {

                if (aResult == true) {
                    var gachabt = ` <thead>
                                    <tr>
                                        <td>수익 : ${margin} $</td>
                                    </tr>
                                    </thead>  `

                    var html_data = `<thead>
                                <tr>
                                <th>종목</th>
                                <th>현재가격</th>
                                <th>구매</th>
                            </tr>
                            </thead>
                            
                            <tbody>
                            `;
                    let priceList = {}
                    investList.forEach((x, index) => {
                        let name = ""
                        name = naming(x.id)
                        x.value.then(value => {
                            // 034730 sk 105560 kb 005930 삼성
                            priceList[x.id] = value.now

                            html_data += `<tr>
                                <td>${name}</td>
                                <td>${value.now}</td>
                                <td>
                                <form method="post" action="/bank/invest/invest">
                                <input type="number" min="1" value="1" name="Buycount"/>
                                <input type="hidden" name="userId" value="${data.data.username}"/>
                                <input type="hidden" name="investId" value="${x.id}"/>
                                <input type="hidden" name="curPrice" value="${value.now}"/>
                                <input type="hidden" name="account_number" value="${data.data.account_number}"/>
                                <button type="submit">구매</button>
                                </form>
                                </td>
                            </tr>`;
                            if (index === investList.length - 1) {
                                html_data += `</tbody>`;

                                var html_data2 = `<thead>
                                <tr>
                                <th>종목</th>
                                <th>산가격</th>
                                <th>보유개수</th>
                                <th>판매</th>
                            </tr>
                            </thead>
                            
                            <tbody>
                            `;

                                setTimeout(function () {
                                    db.query(`SELECT *
                                      FROM invest
                                      WHERE userId = '${data.data.username}'`, function (error, resultInvest) {
                                        resultInvest.forEach(list => {
                                            html_data2 += `<tr>
                                    <td>${naming(list.investId)}</td>
                                    <td>${list.curPrice}</td>
                                    <td>${list.buyCount}</td>
                                    <td>
                                    <form method="post" action="/bank/invest/sell">
                                    <input type="hidden" value="${list.buyCount}" name="Sellcount"/>
                                    <input type="hidden" name="userId" value="${data.data.username}"/>
                                    <input type="hidden" name="id" value="${list.id}"/>
                                    <input type="hidden" name="myCurPrice" value="${list.curPrice}"/>
                                    <input type="hidden" name="curPrice" value="${priceList[list.investId]}"/>
                                    <input type="hidden" name="account_number" value="${data.data.account_number}"/>
                                    <button type="submit">판매</button>
                                    </form>
                                    </td>
                                    </tr>`;
                                        })
                                        res.render('Banking/gacha', {
                                            // results: results,
                                            u_data: cookieData.username,
                                            pending: data,
                                            select: "gacha",
                                            html: html_data,
                                            html2: html_data2,
                                            gachabt: gachabt
                                        });
                                    })
                                }, 20)
                            }
                        })
                    })
                } else {
                    res.render('temp/qna/alert');
                }
            });
        })
    });
});

router.post('/invest', checkCookie, function (req, res, next) {
    var account_number = req.body.account_number;
    var userId = req.body.userId;
    var investId = req.body.investId;
    var Buycount = req.body.Buycount;

    api(investId).then(data=>{
        var curPrice = data.now
        var Calculation = curPrice * Buycount;
        db.query(`UPDATE users
              SET balance=balance - ${Calculation}
              where account_number = ${account_number}`);  //주식 가격만큼 돈에서 차감
        db.query(`INSERT INTO invest(userId, investId, curPrice, buyCount)
              VALUES ('${userId}', '${investId}', ${curPrice}, ${Buycount})`); //주식 테이블에 구매자료 입력
    })
    res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
    res.write("<script>alert('주식 구매 완료')</script>");
    res.write("<script>window.location='/bank/invest'</script>");
});

router.post('/sell', checkCookie, function (req, res, next) {
    var account_number = req.body.account_number;
    var myCurPrice = req.body.myCurPrice;
    var curPrice = req.body.curPrice;
    var Sellcount = req.body.Sellcount;
    var id = req.body.id;
    var userId = req.body.userId;
    var Calculation = curPrice*Sellcount;

    var magin = (curPrice-myCurPrice)*Sellcount;

    db.query(`DELETE FROM invest WHERE id=${id}`); //invest 테이블에서 제거
    db.query(`UPDATE users SET balance=balance+${Calculation} where account_number=${account_number}`);  //주식가격만큼 돈 상승
    db.query(`INSERT INTO margin (userId, margin) VALUES ('${userId}', ${magin}) ON DUPLICATE KEY UPDATE userId='${userId}', margin=margin+${magin};`);
    res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
    res.write("<script>alert('주식 판매 완료')</script>");
    res.write("<script>window.location='/bank/invest'</script>");
});


module.exports = router;
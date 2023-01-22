var express = require('express');
var router = express.Router();

const profile = require("../../middlewares/profile");
const checkCookie = require("../../middlewares/checkCookie")
const {GiveMeCoin, GiveMeCoinInfo, GiveMeTradeList} = require("../../middlewares/GiveMeCoin")
const coinDB = require("../../middlewares/coin")
const {seoultime} = require("../../middlewares/seoultime");
const axios = require("axios");
const {decryptRequest, encryptResponse} = require("../../middlewares/crypt");

router.get("/", [checkCookie], (req, res) => {
    const cookie = req.cookies.Token
    let coinInfo = ""
    let drop = ""
    let now = ""
    let trade_list = ""
    let marginList = ""

    profile(cookie).then(pending => {
        coinDB.query(`SELECT * FROM margin`, function (err, marginlist) {
            marginlist.sort((x1, x2) => {return x2.margin - x1.margin})
            marginlist.forEach((x,i)=>{
                marginList += `<tr>
                <td>${i + 1}</td>
                                <td>${x.username}</td>
                                <td>${x.margin}원</td>
                            </tr>`
            })
            coinDB.query(`SELECT * FROM trade WHERE username='${pending.data.username}' AND account_number='${pending.data.account_number}'`,function (err, list) {
                list.forEach((x, i)=> {
                    trade_list += `<tr>
                <td>${x.coin_kinds}</td>
                                <td>${x.buy_price}원</td>
                                <td>${x.count}개</td>
                                <td>
                                    <form id="${i}" action="/bank/coinShop/cell" method="post">
                                    <input type="hidden" name="buy_date" value="${x.buy_date}">
                                    <a onclick="document.getElementById('${i}').submit();" class="btn btn-google btn-user btn-block">
                                    판매
                                    </a>
                                    </form>
                                </td>
                            </tr>`;
                })

                GiveMeCoin().then(data => {
                    const krw = data.filter(x => x.market.includes("KRW"))
                    krw.forEach((x, i) => {
                        let index = i % 6
                        drop += `<li class="dropdown_item-${index}"><a href="/bank/coinShop?coin=${x.market}">${x.korean_name}</a></li>`
                    })
                    if (!req.query.coin) {
                        GiveMeCoinInfo(krw[0].market).then(data => {
                            coinInfo = data[0]
                            now = krw[0].korean_name
                            return res.render("Banking/coinShop", {
                                drop: drop,
                                coinInfo: coinInfo,
                                pending: pending,
                                select: "coinShop",
                                now: now,
                                list: trade_list,
                                marginList: marginList
                            })
                        })
                    } else {
                        GiveMeCoinInfo(req.query.coin).then(data => {
                            coinInfo = data[0]
                            now = krw.filter(x => x.market === req.query.coin)[0].korean_name
                            return res.render("Banking/coinShop", {
                                drop: drop,
                                coinInfo: coinInfo,
                                pending: pending,
                                select: "coinShop",
                                now: now,
                                list: trade_list,
                                marginList: marginList
                            })
                        })
                    }
                })
            })
        })
    })
})

router.post("/buy", [checkCookie], (req, res) => {
    const cookie = req.cookies.Token
    const count = req.body.bit_count

    if (count <= 0) {
        return res.send(
            "<script>alert('어림도 없지^^'); location.href = \"/bank/coinShop\";</script>")
    }

    profile(cookie).then(user => {
        const username = user.data.username;
        const account_number = user.data.account_number;
        const balance = user.data.balance;
        const coin_type = req.body.coin_type;

        GiveMeCoinInfo(coin_type).then(data => {
            const cur_price = data[0].trade_price
            const total_price = cur_price * count
            if(balance < total_price) {
                return res.send("<script>alert('돈 벌어와^^ 대출 문의 : 김도균'); location.href = \"/bank/coinShop\";</script>")
            }
            // 돈 차감
            let json_data = {};

            json_data['to_account'] = parseInt(333333);   //데이터가 숫자로 들어가야 동작함
            json_data['amount'] = parseInt(total_price);

            json_data['sendtime'] = seoultime;

            const en_data = encryptResponse(JSON.stringify(json_data));// 객체를 문자열로 반환 후 암호화

            axios({
                method: "post",
                url: api_url + "/api/balance/transfer",
                headers: {"authorization": "1 " + cookie},
                data: en_data
            }).then((data) => {
                const resultCode = decryptRequest(data.data).status.code;
                if(resultCode !== 200){
                    return res.send("<script>alert('몰라 하여튼 오류야'); location.href = \"/bank/coinShop\";</script>")
                }
                else{
                    coinDB.query(`INSERT INTO trade
                          VALUES ('${username}', '${account_number}', '${count}', '${coin_type}', '${cur_price}',
                                  '${seoultime}')`)

                    return res.redirect("/bank/coinShop")
                }
            });
        })

    })

})

router.post("/cell", [checkCookie], (req, res) => {
    const cookie = req.cookies.Token
    const date = req.body.buy_date

    profile(cookie).then(user=>{
        coinDB.query(`SELECT * FROM trade WHERE username='${user.data.username}' AND account_number=${user.data.account_number} AND buy_date='${date}'`, function (err, result) {
            GiveMeCoinInfo(result[0].coin_kinds).then(coin=>{
                const cur_price = coin[0].trade_price
                const total_price = cur_price * result[0].count
                const buy_total_price = result[0].buy_price * result[0].count
                let margin = total_price - buy_total_price

                let json_data = {};

                json_data['to_account'] = parseInt(user.data.account_number);   //데이터가 숫자로 들어가야 동작함
                json_data['amount'] = parseInt(total_price);

                json_data['sendtime'] = seoultime;

                const en_data = encryptResponse(JSON.stringify(json_data));// 객체를 문자열로 반환 후 암호화
                //Gk8SDggaEhJPWwFLDQgFCENAW15XTU8MHxodBgYIQ0BLPRICDgQJGkwaTU8FGx0PRVsWQxsKDQISHjUVAgsJQ1dDHxAkDwMqAhMmBy0oOBszWCAOKB4oFDtbBCIkVzMCHj83LitDRwseK1wCSD8XBQwrFSA6J1EoAC8MCDlSLzQ5NFk0PygELTkjHgRQVAkgLl8XAwQoTCADPQkPKTQFJw4WBAAtL14uCwIZNAMNVy8pIAImKiZSISIwBQsvIAQuECxcKRs0VDU9I1MsKQVDRzcgOw5TAy4ALgcONB4hWlY3CAssPF8xVjImIwo8XlkvMDM8KywzFVUUUVZFHBA=
                axios({
                    method: "post",
                    url: api_url + "/api/balance/transfer",
                    headers: {"authorization": "1 " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvaW5NYXN0ZXIiLCJpc19hZG1pbiI6ImZhbHNlIiwiaWF0IjoxNjc0NDAwNDA0LCJleHAiOjE2NzY5OTI0MDR9.6SL7PbUiMoNBkpZ0ddlanKuxjN_J-oQ451fuCUV9y9A"},
                    data: en_data
                }).then((data) => {
                    const resultCode = decryptRequest(data.data).status.code;
                    if(resultCode !== 200){
                        return res.send("<script>alert('몰라 하여튼 오류야'); location.href = \"/bank/coinShop\";</script>")
                    }else{
                        coinDB.query(`DELETE FROM trade WHERE buy_date='${date}'`)
                        coinDB.query(`SELECT * FROM margin WHERE username='${user.data.username}'`,function (err, result) {
                            if(result.length === 0){
                                coinDB.query(`INSERT INTO margin VALUES ('${user.data.username}', ${margin})`)
                            }else{
                                margin += result[0].margin
                                coinDB.query(`UPDATE margin SET margin=${margin} WHERE username='${user.data.username}'`)
                            }
                        })

                        return res.redirect("/bank/coinShop")
                    }
                });
            })
        })
    })
})
//195051
//256831
module.exports = router;
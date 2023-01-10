var express = require("express");
var router = express.Router();
var axios = require("axios");
var {
  encryptResponse,
  decryptRequest,
  decryptEnc,
} = require("../../middlewares/crypt");
const profile = require("../../middlewares/profile");
const checkCookie = require("../../middlewares/checkCookie");
var db = require("../../middlewares/db");
var tokenauth = require("../qna/tokenauth");

const { ExchangeService, QuoationService } = require("node-upbit");
const quoationService = new QuoationService();

async function api(code) {
  let vari = "";
  var bitresult = await quoationService.getTicker([`${code}`]);
  vari = bitresult;
  return vari;
}

function naming(id) {
  let name = "";
  switch (id.toString()) {
    case "KRW-BTC":
      name = "Bitcoin";
      break;
    case "KRW-DOGE":
      name = "DOGE";
      break;
    case "KRW-ETH":
      name = "Ethereum";
      break;
  }
  return name;
}

router.get("/", async function (req, res, next) {
  const cookie = req.cookies.Token;
  const investList = ["KRW-BTC", "KRW-DOGE", "KRW-ETH"].map((code) => {
    return { id: code, value: api(code) };
  });

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
                                    </thead>  `;

        var html_data = `<thead>
                                <tr>
                                <th>종목</th>
                                <th>현재가격</th>
                                <th>구매</th>
                            </tr>
                            </thead>

                            <tbody>
                            `;
        let priceList = {};
        investList.forEach((x, index) => {
          let name = "";
          name = naming(x.id);
          x.value.then((value) => {
            console.log(value[0].trade_price);
            // 034730 sk 105560 kb 005930 삼성
            priceList[x.id] = value[0].trade_price;

            html_data += `<tr>
                                <td>${name}</td>
                                <td>${value[0].trade_price}</td>
                                <td>
                                <form method="post" action="/bank/bitcoin/bitcoin">
                                <input type="number" min="1" value="1" name="Buycount"/>
                                <input type="hidden" name="userId" value="${data.data.username}"/>
                                <input type="hidden" name="investId" value="${x.id}"/>
                                <input type="hidden" name="curPrice" value="${value[0].trade_price}"/>
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
                db.query(
                  `SELECT *
                                      FROM invest
                                      WHERE userId = '${data.data.username}'`,
                  function (error, resultInvest) {
                    resultInvest.forEach((list) => {
                      html_data2 += `<tr>
                                    <td>${naming(list.investId)}</td>
                                    <td>${list.curPrice}</td>
                                    <td>${list.buyCount}</td>
                                    <td>
                                    <form method="post" action="/bank/invest/sell">
                                    <input type="hidden" value="${
                                      list.buyCount
                                    }" name="Sellcount"/>
                                    <input type="hidden" name="userId" value="${
                                      data.data.username
                                    }"/>
                                    <input type="hidden" name="id" value="${
                                      list.id
                                    }"/>
                                    <input type="hidden" name="curPrice" value="${
                                      priceList[list.investId]
                                    }"/>
                                    <input type="hidden" name="account_number" value="${
                                      data.data.account_number
                                    }"/>
                                    <button type="submit">판매</button>
                                    </form>
                                    </td>
                                    </tr>`;
                    });
                    res.render("Banking/gacha", {
                      // results: results,
                      u_data: cookieData.username,
                      pending: data,
                      select: "gacha",
                      html: html_data,
                      html2: html_data2,
                      gachabt: gachabt,
                    });
                  }
                );
              }, 20);
            }
          });
        });
      } else {
        res.render("temp/qna/alert");
      }
    });
  });
});

router.post("/bitcoin", checkCookie, function (req, res, next) {
  var account_number = req.body.account_number;
  var userId = req.body.userId;
  var investId = req.body.investId;
  var curPrice = req.body.curPrice;
  var Buycount = req.body.Buycount;
  var Calculation = curPrice * Buycount;

  db.query(`UPDATE users
              SET balance=balance - ${Calculation}
              where account_number = ${account_number}`); //주식 가격만큼 돈에서 차감
  db.query(`INSERT INTO invest(userId, investId, curPrice, buyCount)
              VALUES ('${userId}', '${investId}', ${curPrice}, ${Buycount})`); //주식 테이블에 구매자료 입력
  res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
  res.write("<script>alert('주식 구매 완료')</script>");
  res.write("<script>window.location='/bank/bitcoin'</script>");
});

router.post("/sell", checkCookie, function (req, res, next) {
  var account_number = req.body.account_number;
  var curPrice = req.body.curPrice;
  var Sellcount = req.body.Sellcount;
  var id = req.body.id;
  var Calculation = curPrice * Sellcount;

  db.query(`DELETE FROM invest WHERE id=${id}`); //invest 테이블에서 제거
  db.query(
    `UPDATE users SET balance=balance+${Calculation} where account_number=${account_number}`
  ); //주식가격만큼 돈 상승
  res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
  res.write("<script>alert('주식 판매 완료')</script>");
  res.write("<script>window.location='/bank/invest'</script>");
});

module.exports = router;

var express = require('express');
var router = express.Router();
var axios = require("axios");
var { encryptResponse, decryptRequest } = require("../../middlewares/crypt");



/* GET users listing. */
router.get('/', function(req, res, next) {
    let token = req.get('authorization'); // 입력값 헤더의 토큰만 받음
    let result = "{data:[]}";
    axios({
        method: "post",
        url: "http://localhost:3000/api/transactions/view", // URL 수정 해야 됨
        headers: {"authorization": token}
        // data: enData
        // 데이터 안씀
    }).then((data)=>{
        en_data = decryptRequest(data.data);
        console.log(en_data);
        // result = JSON.stringify(en_data); 
        row = en_data.data;
        var html_data = "<table><tr><th>송금자</th><th>수취인</th><th>금액</th></tr>";

        row.forEach(function(i){
            html_data += "<tr><td>"+i.from_account+"</td><td>"+i.to_account+"</td><td>"+i.amount+"</td></tr>";
        })

        html_data += "</table>";
        return res.render("Transactions/view", {html : html_data});

    }).catch(function(error){
        var html_data = "<h2>내용을 불러올 수 없습니다.</h2>";
        return res.render("Transactions/view", {html : html_data});
    });
});



// /* GET users listing. */
// router.post('/', function(req, res, next) {
//     const {username, password, account_number} = req.body;
//     console.log(username, password, account_number)
//     baseData=`{"username": "${username}", "password": "${password}", "account_number": "${account_number}"}`
//     console.log("basedata : ",baseData)
//     const enData = encryptResponse(baseData);

//     console.log("endata : ",enData)
//     //balance view
//     axios({
//         method: "post",
//         url: "http://15.152.81.150:3000/api/balance/view",
//         headers: {"authorization": "1 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEyMyIsImlzX2FkbWluIjpmYWxzZSwiaWF0IjoxNjcxNjg3MjU3fQ.dcCSrCfU6mDJcLGgtib-LxivIWH4Q1PU0Y22lXG9gcA"},
//         data: enData
//     }).then((data)=>{
//         // console.log(decryptRequest(data))
//         console.log("data : ", decryptRequest(data.data))
//     })

//     return res.redirect("/")
// });



module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
const mainRouter = require("./Main")
const transactionsRouter = require("../routes/Transactions")
// 안에 있는 js를 할당
const balanceRouter = require("../routes/Balance");
// const beneficiaryRouter = require("../routes/Beneficiary");
const userRouter = require("../routes/User");

const admin = require("../routes/Beneficiary");
const userpage = require("./userpage");


const chanRouter = require("../routes/chan");
// 1 : /balance 주소, 2: 할당
router.use("/balance", balanceRouter);
router.use("/main", mainRouter);

// 김태진 : 입출금 페이지
router.use("/transactions", transactionsRouter)
// router.use("/health", healthRouter);
// router.use("/beneficiary", beneficiaryRouter);
router.use("/user", chanRouter);

router.use("/admin", admin);
router.use("/mypage", userpage);

// 템플릿 작업용 GET 메소드
const axios = require("axios");
const Response = require("../middlewares/Response");
const {decryptRequest, encryptResponse, decryptEnc} = require("../middlewares/crypt");

router.get('/', function (req, res, next) {
    if(req.cookies.Token){
        const cookie = decryptEnc(req.cookies.Token);
        axios({
            method: "post",
            url: "http://localhost:3000/api/User/profile",
            headers: {"authorization": "1 " + cookie}
        }).then((data) => {
            // console.log(data.data);
            const r = new Response();
            const resStatus = decryptRequest(data.data).status;
            const resData = decryptRequest(data.data).data;
            console.log(resData);
            console.log("------------------");
            console.log("status : ", resStatus, "data : ", resData);
            console.log("------------------");
            console.log(r);
            r.status = resStatus
            r.data = resData
            console.log(r.data);
            res.render("temp/index", {u_data: r.data.username});    
        });
    }
    else{
        res.render("temp/index", );
    }
    // res.render("temp/index", {in_data: false});
});


router.use("/chan", userRouter);



module.exports = router;

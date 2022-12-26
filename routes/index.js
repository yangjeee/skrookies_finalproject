var express = require('express');
var router = express.Router();

/* GET home page. */
const mainRouter = require("./Main")
const transactionsRouter = require("../routes/Transactions")
// 안에 있는 js를 할당
const balanceRouter = require("../routes/Balance");
// const beneficiaryRouter = require("../routes/Beneficiary");
const userRouter = require("../routes/User");
const chanRouter = require("../routes/chan");
// 1 : /balance 주소, 2: 할당
router.use("/balance", balanceRouter);
router.use("/main", mainRouter);
// router.use("/transactions", transactionsRouter)
// router.use("/health", healthRouter);
// router.use("/beneficiary", beneficiaryRouter);
router.use("/user", userRouter);
router.use("/chan", chanRouter);


module.exports = router;

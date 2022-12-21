const express = require("express");
const router = express.Router();

const healthRouter = require("../lib/api/Health");
const transactionsRouter = require("../lib/api/Transactions")
const balanceRouter = require("../lib/api/Balance");
const beneficiaryRouter = require("../lib/api/Beneficiary");
const mainRouter = require("../lib/api/Main");

router.use("/balance", balanceRouter);
router.use("/transactions", transactionsRouter)
router.use("/health", healthRouter);
router.use("/beneficiary", beneficiaryRouter);
router.use("/user", userRouter);
router.use("/main", mainRouter); //메인페이지 라우팅추가

module.exports = router;
